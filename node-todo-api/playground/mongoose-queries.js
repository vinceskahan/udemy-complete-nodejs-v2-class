const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
// const {Todo} = require('./../server/models/todo');

// var id = "5a0383843411dec8993435f1";
// if (!ObjectID.isValid(id)) {
//   return console.log('ID not valid');
// };

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     return console.log("findOne: not found");
//   };
//   console.log('findOne', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("findById: not found");
//   };
//   console.log('findById', todo);
// }).catch((e) => console.log(e));

//challenge
const {User} = require('./../server/models/user');
var id = "5a033a0d2688a7ae9c28e6e5";
User.findById(id).then((user) => {
  if (!user) {
    return console.log("findById: not found");
  };
  console.log('findById', user);
}).catch((e) => console.log(e));
