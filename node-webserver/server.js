const express = require("express");

var app = express();

app.get('/', (request,response) => {
  response.send('hello express');
});

app.listen(3000);
