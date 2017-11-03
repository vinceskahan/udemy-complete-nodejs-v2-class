const express = require("express");

var app = express();

app.get('/', (request,response) => {
  //response.send('<h2>hello express</h2>');
  response.send({
    name: 'me',
    likes: [
      'item1',
      'item2',
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('about this site');
});

app.listen(3000);
