
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

//lat,lon,callback
weather.getWeather(47.3055312,-122.3744209, (errorMessage, weatherResults) => {
  if (errorMessage) {
      console.log(errorMessage);
  } else {
      console.log(JSON.stringify(weatherResults,undefined,2));
  }
});

//darksky api key = eedd2d885bd3e0568450567138826387
