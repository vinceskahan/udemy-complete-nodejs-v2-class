const expect = require('expect');
const request =  require('request');

const {app} = require('./../server');
const {Todo} = require('./../modules/todo');

// wipe all records
beforeEach((done) => {
    Todo.remove({}).then(() => done ());
});

describe('POST /todos', () => {

  it('should create a new todo', (done) {
    var text = 'test string';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(req.body).toBe(text));
      })
      .end((err,res) => {
        return done(err);
      });

      Todo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      };

  });

});
