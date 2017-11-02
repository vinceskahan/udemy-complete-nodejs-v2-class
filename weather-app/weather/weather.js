
const request = require('request');

var getWeather = (lat,lng,callback) => {

request({
  url: address=`https://api.forecast.io/forecast/eedd2d885bd3e0568450567138826387/${lat},${lng}`,
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
  } else {
    callback('unable to fetch weather');
  }
});

};

module.exports.getWeather = getWeather;
