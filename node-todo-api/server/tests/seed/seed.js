
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
  _id: userOneID,
  email: "me@example.com",
  password: "userOnePass",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
  }]
},{
  _id: userTwoID,
  email: "me2@example.com",
  password: "userTwoPass"
}];

const todos = [
  { _id: new ObjectID(), text: "test item 1" },
  { _id: new ObjectID(), text: "test item 2",
      completed: true, completedAt: 12345 }
];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then (() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    // wait for both promises
    return Promise.all([userOne,userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
