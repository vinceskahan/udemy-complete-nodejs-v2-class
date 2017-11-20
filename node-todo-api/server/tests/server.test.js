const expect = require('expect');
const request =  require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos, populateTodos,  users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

//-------------------------------------------------------------------

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'test string';
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create an empty todo', (done) => {
    var text = '';
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(400)
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

//-------------------------------------------------------------------

describe('GET /todos', () => {

  it('should get all todos for the authenticated user', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });

});


//-------------------------------------------------------------------

describe('GET /todos/:id', () => {

  it('should get a valid todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should not return a different user\'s todos', (done) => {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  // we set x-auth to a seeded user, but test here for a bogus user
  it('should return 404 if not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // id=123 is an invalid mongo id
    request(app)
      .get('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
    });

});

//-------------------------------------------------------------------

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err,res) => {
          if (err) {
            return done(err);
          }
          Todo.findById(hexID).then((todo) => {
            // expect v21 = https://facebook.github.io/jest/docs/en/expect.html
            // old was expect(todo).toExist();
            expect(todo).toBeFalsy();
            done();
          }).catch((e) => done(e));
        });
  });

  it('should not remove a different user\'s todo', (done) => {
    //delete the second user's id as the first user
    var hexID = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err,res) => {
          if (err) {
            return done(err);
          }
          Todo.findById(hexID).then((todo) => {
            // it's still there because we don't delete somebody else's todo(s)
            expect(todo).toBeTruthy();
            done();
          }).catch((e) => done(e));
        });
  });

  it('should return 404 if todo not found', (done) => {
      // bogus id, we'll look it up using users[1] auth token (will not find any)
      var hexId = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done)
  });

  it('should return 404 for non-object ids', (done) => {
    // id=123 is not a valid mongo id
    // set to users[1] token os we have something as auth is required
    request(app)
      .delete('/todos/123')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
    });


});

//-------------------------------------------------------------------

describe('PATCH /todos/:id', () => {

  it('should update a todo', (done) => {
    var hexID = todos[0]._id.toHexString();
    const newtext = "patched text";
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: true,
        text: newtext
      })
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newtext);
        expect(res.body.todo.completed).toBe(true);
        // expect v21
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);

  });

  // note we set x-auth to a different user's token value
  it('should not update a different user\'s todo', (done) => {
    var hexID = todos[0]._id.toHexString();
    const newtext = "patched text";
    request(app)
      .patch(`/todos/${hexID}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: true,
        text: newtext
      })
      .expect(404)
      .end(done);
  });

  // users[1] used here
  it('should clear completedAt when todo is not completed', (done) => {
    var hexID = todos[1]._id.toHexString();
    const newtext = "patched text2";
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: false,
        text: newtext
      })
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newtext);
        expect(res.body.todo.completed).toBe(false);
        // expect v21
        // was toNotExist in earlier expect
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });

});

//-------------------------------------------------------------------

describe('GET /users/me', () => {

  it('should return a user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
        // expect v21
        //expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

});

//-------------------------------------------------------------------

describe('POST /users', () => {

  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = 'mypass';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
            return done(err);
        }
        // validate the contents of the created user
        // - get the user with that isEmail
        // - expect them to be found
        // - expect their email to not match the cleartext
        //    (ie, to have been hashed)
        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    var email = 'e';    // too short
    var password = 'm'; // too short
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    var email = users[0].email;  // in the db
    var password = 'mypasshere'; // used above
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .end(done);
    });

});

//-------------------------------------------------------------------

describe('POST /users/login', () => {

  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password,
      })
      .expect(200)
      .expect((res) => {
        // find an x-auth header in the response
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.toObject().tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  // make the password invalid by adding '1' to the value
  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        // expect no x-auth header returned
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          // expect there to be no tokens for the user
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });

});

//-------------------------------------------------------------------

describe('DELETE /users/me/token', () => {

  it('should remove auth token on logout', (done) => {
    var token = users[0].tokens[0].token;
    request(app)
      .delete('/users/me/token')
      .set('x-auth', token)
      .send()
      .expect(200)
      .end((err,res) => {
        if (err) {
            return done(err);
        }
        User.findById(users[0]._id).then((user) => {
           expect(user.tokens.length).toBe(0);
           done();
      }).catch((e) => done(e));
    });
  });

});
