const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

// use heroku port or default value for localhost
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log('error: unabble to append to server.log');
    }
  });
  console.log(log);
  next();
});

//this is above others, so it runs first
//note there's no next() so it doesn't proceed
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request,response) => {
  response.render("home.hbs", {
    pageTitle: 'home page',
    welcomeMessage: "your homepage rocks",
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'about page',
    });
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

// static port on localhost
//
// app.listen(3000, () => {
//   console.log('server is up on port 3000');
// });

// environment variables
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
