
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
var geocodeURL = `https://mapsgoogleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  console.log(response.data);
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log('cannot connect to server');
  }
  //console.log(e);
});

//darksky api key = eedd2d885bd3e0568450567138826387
