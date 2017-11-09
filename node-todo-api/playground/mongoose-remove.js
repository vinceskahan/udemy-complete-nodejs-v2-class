const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// // remove all
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//---these return the doc removed

// Todo.findByIdAndRemove('5a048be5ea592f12d43b66b0').then((todo) => {
//   console.log(todo);
// });

Todo.findOneAndRemove({_id: '5a048be5ea592f12d43b66b0'}).then((todo) => {
  console.log(todo);
});
