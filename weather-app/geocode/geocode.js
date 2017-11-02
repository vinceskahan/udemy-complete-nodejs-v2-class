const request = require('request');

var geocodeAddress = (address, callback) => {

  var encodedURI = encodeURIComponent(address);

  // see https://www.npmjs.com/package/request
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to server');
    } else if (body.status === "ZERO_RESULTS") {
      callback('no results found');
    } else if (body.status === "OK"){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    } else {
      // example - if we exceed the api limit
      console.log(`unexpected error: ${body.status}`);
    }
  });

};

module.exports = {
  geocodeAddress,
};
