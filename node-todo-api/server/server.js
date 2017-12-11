require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  // actually save to the db
  todo.save().then((doc) => {
    // if it saved send the doc back
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  // find all the todos created by the authenticated user
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    // and send them back
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  // make sure the id is valid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // find todo(s) in the db where their creator
  // property matches the authenticated user
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    // and send it back
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  // make sure the id is valid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // find by id and remove it from the db, returning the text removed
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {

    // if no matching record found
    if (!todo) {
      return res.status(404).send();
    }

    // found it, return the todo
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // just work with what we need
  var body = _.pick(req.body, ['text', 'completed']);

  // make sure the id exists
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // clean up completedAt depending on true/false of completed
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // actually save it to the db
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
    }, {
      $set: body
    }, {
      new: true
    }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/users', (req, res) => {
  // just work with what we need
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    // generate and return their auth token
    return user.generateAuthToken();
  }).then((token) => {
    // and stick it in the header
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    // on failure return 400 with the error
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  // just work with what we need
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email,body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      // set header to newly generated token, send back response body
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    // promise was rejected by findByCredentials
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
