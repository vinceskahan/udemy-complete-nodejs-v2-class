console.log('Starting app');

const fs = require('fs');
const os = require('os');

var user = os.userInfo();

//fs.appendFile('greetings.txt','Hello world', function(err) {
//    if (err) { console.log('unable to write to file');}
//});

//fs.appendFile('greetings.txt','Hello ' + user.username + '\n', function(err) {
    //if (err) { console.log('unable to write to file');}
//});

fs.appendFile('greetings.txt',`Hello ${user.username}` + '\n', function(err) {
    if (err) { console.log('unable to write to file');}
});

