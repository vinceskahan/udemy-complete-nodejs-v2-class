const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
const port = 3000;

// create new express app
// - configure it to server up the 'public' folder
// - call app.listen to listen on 3000 with console.log message
// - try localhost:3000 in browser and see index.html appear

var app = express();

app.use(express.static(publicPath));

//app.get('/index.html')

app.listen(port, () => {
  console.log(`started up at port ${port}`);
});
