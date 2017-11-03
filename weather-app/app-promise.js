
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

axios.get(geocodeURL).then((response) => {
  if (response.data.status == 'ZERO_RESULTS') {
    throw new Error('unable to find that address');
  }
  console.log(response.data);
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log('cannot connect to server');
  } else {
    console.log(e.message);
  }
  //console.log(e);
});

//darksky api key = eedd2d885bd3e0568450567138826387
