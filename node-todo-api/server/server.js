var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

//set up for heroku or localhost failsafe
const port = process.env.PORT || 3000;

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

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //findById
  Todo.findById(id).then((todo) => {
    if (!todo) {
        // if no todo send 404 with empty body
        return res.status(404).send();
    };
    // if todo send it back
    res.status(200).send({todo});
    }).catch((e) => {
      // if err send 400 with empty body
      res.status(400).send();
    });
});

// DELETE

app.delete('/todos/:id', (req,res) => {

    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
          return res.status(404).send();
      };
      res.status(200).send({todo});
      }).catch((e) => {
        // if err send 400 with empty body
        res.status(400).send();
      });
});

// start up the server
app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = {app};
