const expect = require('expect');
const request =  require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos, populateTodos,  users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);



// //--------------- todos ----------------
//
// describe('POST /todos', () => {
//
//   it('should create a new todo', (done) => {
//     var text = 'test string';
//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err,res) => {
//         if (err) {
//           return done(err);
//         }
//         Todo.find({text}).then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should not create an empty todo', (done) => {
//     var text = '';
//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(400)
//       .end((err,res) => {
//         if (err) {
//           return done(err);
//         }
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
// }); // end of describe
//
// describe('GET /todos', () => {
//
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
//
// }); // end of describe
//
// describe('GET /todos/:id', () => {
//
//   it('should get a valid todo', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });
//
//   it('should return 404 if not found', (done) => {
//     var hexId = new ObjectID().toHexString();
//     request(app)
//       .get(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 for non-object ids', (done) => {
//     // id=123 is an invalid mongo id
//     request(app)
//       .get('/todos/123')
//       .expect(404)
//       .end(done);
//     });
//
// }); // end of describe GET
//
// //---------------  DELETE tests --------------------
//
// describe('DELETE /todos/:id', () => {
//
//   it('should remove a todo', (done) => {
//     var hexID = todos[1]._id.toHexString();
//     request(app)
//       .delete(`/todos/${hexID}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexID);
//       })
//       .end((err,res) => {
//           if (err) {
//             return done(err);
//           }
//           Todo.findById(hexID).then((todo) => {
//             // expect v21 = https://facebook.github.io/jest/docs/en/expect.html
//             // old was expect(todo).toExist();
//             expect(todo).toBeFalsy();
//             done();
//           }).catch((e) => done(e));
//         });
//   });
//
//   it('should return 404 if todo not found', (done) => {
//       var hexId = new ObjectID().toHexString();
//       request(app)
//         .delete(`/todos/${hexId}`)
//         .expect(404)
//         .end(done)
//   });
//
//   it('should return 404 for non-object ids', (done) => {
//     // id=123 is not a valid mongo id
//     request(app)
//       .delete('/todos/123')
//       .expect(404)
//       .end(done);
//     });
//
//
// }); //end of describe
//
//
// describe('PATCH /todos/:id', () => {
//
//   // change text, set completed=true
//
//   it('should update a todo', (done) => {
//     var hexID = todos[0]._id.toHexString();
//     const newtext = "patched text";
//     request(app)
//       .patch(`/todos/${hexID}`)
//       .send({
//         completed: true,
//         text: newtext
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(newtext);
//         expect(res.body.todo.completed).toBe(true);
//         // expect v21
//         expect(typeof res.body.todo.completedAt).toBe('number');
//       })
//       .end(done);
//
//   });
//
//   it('should clear completedAt when todo is not completed', (done) => {
//     var hexID = todos[1]._id.toHexString();
//     const newtext = "patched text2";
//     request(app)
//       .patch(`/todos/${hexID}`)
//       .send({
//         completed: false,
//         text: newtext
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(newtext);
//         expect(res.body.todo.completed).toBe(false);
//         // expect v21
//         // was toNotExist
//         expect(res.body.todo.completedAt).toBeFalsy();
//       })
//       .end(done);
//   });
//
// }); //end of describe
//
// // ------- users ---------------------------
// //
// describe('GET /users/me', () => {
//
//   it('should return a user if authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[0]._id.toHexString());
//         expect(res.body.email).toBe(users[0].email);
//         // expect v21
//         //expect(res.body.todo.completedAt).toBeFalsy();
//       })
//       .end(done);
//   });
//
//   it('should return 401 if not authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
//
// }); //end of describe
//
// describe('POST /users', () => {
//
//   it('should create a user', (done) => {
//     var email = 'example@example.com';
//     var password = 'mypass';
//     request(app)
//       .post('/users')
//       .send({email,password})
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toBeTruthy();
//         expect(res.body._id).toBeTruthy();
//         expect(res.body.email).toBe(email);
//       })
//       .end((err) => {
//         if (err) {
//             return done(err);
//         }
//         // validate the contents of the created user
//         // - get the user with that isEmail
//         // - expect them to be found
//         // - expect their email to not match the cleartext
//         //    (ie, to have been hashed)
//         User.findOne({email}).then((user) => {
//           expect(user).toBeTruthy();
//           expect(user.password).not.toBe(password);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should return validation errors if request invalid', (done) => {
//     var email = 'e';    // too short
//     var password = 'm'; // too short
//     request(app)
//       .post('/users')
//       .send({email,password})
//       .expect(400)
//       .end(done);
//   });
//
//   it('should not create user if email in use', (done) => {
//     var email = users[0].email;  // in the db
//     var password = 'mypasshere'; // used above
//     request(app)
//       .post('/users')
//       .send({email,password})
//       .expect(400)
//       .end(done);
//     });
//
// });
//
// describe('POST /users/login', () => {
//
//   it('should login user and return auth token', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password
//       })
//       .expect(200)
//       .expect((res) => {
//         // find an x-auth header in the response
//         expect(res.headers['x-auth']).toBeTruthy();
//       })
//       .end((err,res) => {
//         if (err) {
//           return done(err);
//         }
//         User.findById(users[1]._id).then((user) => {
//           expect(user.toObject().tokens[0]).toMatchObject({
//             access: 'auth',
//             token: res.headers['x-auth']
//           });
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   // make the password invalid by adding '1' to the value
//   it('should reject invalid login', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password + '1'
//       })
//       .expect(400)
//       .expect((res) => {
//         // expect no x-auth header returned
//         expect(res.headers['x-auth']).toBeFalsy();
//       })
//       .end((err,res) => {
//         if (err) {
//           return done(err);
//         }
//         User.findById(users[1]._id).then((user) => {
//           // expect there to be no tokens for the user
//           expect(user.tokens.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
// });

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
