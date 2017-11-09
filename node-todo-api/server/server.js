var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

// POST
app.post('/todos', (req,res) => {
  var todo = new Todo( {
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET
app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/12341234
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  //validate id is valid
  //   if not 404 and send empty body
  //findById
  //   if todo send it back
  //   if no todo send 404 with empty body
  //   if err send 400 with empty body
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send("");
    };
    res.status(200).send(JSON.stringify(todo,undefined,2));
    }).catch((e) => {
      res.status(400).send("");
    });
});

// start up the server
app.listen(3000, () => {
  console.log('started on port 3000');
});

module.exports = {app};
