
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options( {
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

//axios returns a promise so we can use 'then' to chain promises

axios.get(geocodeURL).then((response) => {
  //response to axios call
  if (response.data.status == 'ZERO_RESULTS') {
    throw new Error('unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.forecast.io/forecast/eedd2d885bd3e0568450567138826387/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);

  //return another promise where we get the weatherURL
  return axios.get(weatherURL);

//and deal with what 'that' returned
}).then((response) => {

  //response to axios call
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`temperature=${temperature}, feels like ${apparentTemperature}`);

// catching all errors
}).catch((e) => {

  // errors
  if (e.code === "ENOTFOUND") {
    console.log('cannot connect to server');
  } else {
    console.log('ruh roh');
    console.log(e.message);
  }

});

//darksky api key = eedd2d885bd3e0568450567138826387
