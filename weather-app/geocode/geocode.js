const request = require('request');

var geocodeAddress = (address) => {

  var encodedURI = encodeURIComponent(address);

  // see https://www.npmjs.com/package/request
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('unable to connect to server');
    } else if (body.status === "ZERO_RESULTS") {
      console.log('no results found');
    } else if (body.status === "OK"){
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    } else {
      // example - if we exceed the api limit
      console.log(`unexpected error: ${body.status}`);
    }
  });

};

module.exports = {
  geocodeAddress,
};
