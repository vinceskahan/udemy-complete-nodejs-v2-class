const request = require('request');

// see https://www.npmjs.com/package/request
request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20Lombard%20Street%20Philadelphia',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});
