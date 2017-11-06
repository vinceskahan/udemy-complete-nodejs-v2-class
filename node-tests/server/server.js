const express = require('express');

var app = express();

app.get('/', (res,req) => {
  res.send('hello world');
});

app.listen(3000);
