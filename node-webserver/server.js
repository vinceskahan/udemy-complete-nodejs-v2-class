const express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));

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

// send back json with errorMessage property and content of error

var errorMessage = {
  message: "this is an error message"
}
app.get('/bad', (req, res) => {
  // just the message payload
  //    res.send(errorMessage.message);
  // json variant
  res.send(errorMessage);
});

app.listen(3000);
