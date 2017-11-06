const express = require('express');

var app = express();

// app.get('/', (req,res) => {
//   res.send('hello world');
// });

app.get('/', (req,res) => {
  //break it on purpose
     // res.status(404).send('hello world');
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

// GET /users and return array of users
//           each with a name+age property
app.get('/users', (req,res) => {
  res.status(200).send([
      { name: 'user 1', age: 21 },
      { name: 'user 2', age: 22 },
      { name: 'user 3', age: 23 },
    ]
  );
});
app.listen(3000);

module.exports.app = app;
