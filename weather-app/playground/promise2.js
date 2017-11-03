const request = require('request');

var geocodeAddress = (address) => {

  return new Promise((resolve,reject) => {

    var encodedURI = encodeURIComponent(address);

    // see https://www.npmjs.com/package/request
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('unable to connect to server');
      } else if (body.status === "ZERO_RESULTS") {
        reject('no results found');
      } else if (body.status === "OK"){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      } else {
        // example - if we exceed the api limit
        reject(`unexpected error: ${body.status}`);
      };
    });

  }

)};

geocodeAddress('19146').then( (location) => {
  //success
  console.log('cool');
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  //failure
  console.log("ruh roh");
  console.log(errorMessage);
});
