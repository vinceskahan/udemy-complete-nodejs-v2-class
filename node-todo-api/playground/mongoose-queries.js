const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = "6a0383843411dec8993435f1";

Todo.find({
  _id: id
}).then((todos) => {
  console.log('todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  if (!todo) {
    return console.log("findOne: not found");
  };
  console.log('findOne', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log("findById: not found");
  };
  console.log('findById', todo);
});
