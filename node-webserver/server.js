const express = require("express");
const hbs = require("hbs");

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname + "/public"));

app.use((request,response,next) => {
  var now = new Date().toString();
  console.log(`${now}:`);
  next();
});

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

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
