const expect = require('expect');
const request =  require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  { text: "test item 1" },
  { text: "test item 2" }
];

// remove them all then insert two test records
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then (() => done());
});

//------ POST tests --------

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'test string';
    request(app)
      .post('/todos')
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
      }); //end of .end
  }); // end of it

  it('should not create an empty todo', (done) => {
    var text = '';
    request(app)
      .post('/todos')
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
      }); //end of .end
  }); // end of it
});   // end of describe POST


//------ GET tests --------

describe('GET /todos', () => {

  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  }); //end of .it

}); // end of describe GET
