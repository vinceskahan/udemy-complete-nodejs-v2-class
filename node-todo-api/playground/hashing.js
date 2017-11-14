const {SHA256} = require('crypto-js');

var message = 'this is a string';
var hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log(`hash: ${hash}`);
