const express = require('express');

var app = express();

// app.get('/', (req,res) => {
//   res.send('hello world');
// });

app.get('/', (req,res) => {
  //break it on purpose
     // res.status(404).send('hello world');
  res.status(404).send({
    error: 'Page not found.'
  });
});

app.listen(3000);

module.exports.app = app;
