// USD CAD 23
// 23 USD is worth 28 CAD, you can spend these in the following countries:

// http://api.fixer.io/latest?base=USD
// https://restcountries.eu/rest/v2/currency/cad

// requires axios installed

const axios = require('axios');

const getExchangeRate = (from, to) => {
  axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    console.log('in getExchangeRate: ',response.data.rates[to]);
    return response.data.rates[to];
  });
}

getExchangeRate('USD','CAD').then((rate) => {
  console.log(rate);
}).catch((e) => {
  console.log(`error ${e}`);
});
