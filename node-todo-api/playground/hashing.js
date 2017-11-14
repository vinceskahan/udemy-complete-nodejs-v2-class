const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


// see https://jwt.io for tools to encode/decode interactively
var data = { id: 10 };
var token = jwt.sign(data,"123abc");
console.log(token);

// happy path to show decoded since secret matches
var decoded = jwt.verify(token,"123abc");
console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// // salt the data we're hashing
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // fake impersonation without salt
// // token.data.id=5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was changed - do not trust');
// }
