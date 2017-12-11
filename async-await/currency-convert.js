// USD CAD 23
// 23 USD is worth 28 CAD, you can spend these in the following countries:

// http://api.fixer.io/latest?base=USD
// https://restcountries.eu/rest/v2/currency/cad

// requires axios installed

const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    return response.data.rates[to];
  });
}

// getExchangeRate('USD','CAD').then((rate) => {
//   console.log(rate);
// }).catch((e) => {
//   console.log(`error ${e}`);
// });


const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    // return array with countries accepting this code as array of strings
    return response.data.map((country) => country.name);
  });
}

// getCountries('EUR').then((countries) => {
//   console.log(countries);
// }).catch((e) => {
//   console.log(`error ${e}`);
// });

const convertCurrency = (from,to,amount) => {
  return getCountries(to).then(countries => {
    return getExchangeRate(from,to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} in ${from} is worth ${exchangedAmount} ${to}.`;
  });
};

convertCurrency('CAD','USD', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(`error ${e}`);
});
