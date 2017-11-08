const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = "5a0383843411dec8993435f1";

Todo.find({
  _id: id
}).then((todos) => {
  console.log('todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('todo', todo);
});

Todo.findById(id).then((todo) => {
  console.log('by id', todo);
});
