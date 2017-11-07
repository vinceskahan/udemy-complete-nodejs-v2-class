var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// var newTodo = new Todo({
//   text: 'cook dinner'
// });
//
// newTodo.save().then( (doc) => {
//   console.log('saved todo: ', doc);
// }, (e) => {
//   console.log('unable to save todo');
// });

var newTodo2 = new Todo({
  text: 'eat dinner',
  completed: true,
  completedAt: 1510085817
});

newTodo2.save().then( (doc) => {
  console.log('saved todo: ', doc);
}, (e) => {
  console.log('unable to save todo');
});
