console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

var filteredArray = _.uniq(['me']);
console.log(filteredArray);

// console.log(_.isString(true));
// console.log(_.isString('me'));

// var user = os.userInfo();

// var res = notes.add(9,-2);
// console.log(res);

//fs.appendFile('greetings.txt','Hello world', function(err) {
//    if (err) { console.log('unable to write to file');}
//});

//fs.appendFile('greetings.txt','Hello ' + user.username + '\n', function(err) {
    //if (err) { console.log('unable to write to file');}
//});

// fs.appendFile('greetings.txt',`Hello ${user.username} you are ${notes.age}` + '\n', function(err) {
//     if (err) { console.log('unable to write to file');}
// });
