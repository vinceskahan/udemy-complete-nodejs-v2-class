
// const yargs = require('yargs');
//
// const geocode = require('./geocode/geocode.js');
//
// const argv = yargs
//   .options( {
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'address to fetch weather for',
//       string: true,
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

//darksky api key = eedd2d885bd3e0568450567138826387

const request = require('request');
request({
  url: address="https://api.forecast.io/forecast/eedd2d885bd3e0568450567138826387/47.3055312,-122.3744209",
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body.currently.temperature);
  } else {
    console.log('unable to fetch weather');
  }
});
