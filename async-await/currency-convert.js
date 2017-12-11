// USD CAD 23
// 23 USD is worth 28 CAD, you can spend these in the following countries:

// http://api.fixer.io/latest?base=USD
// https://restcountries.eu/rest/v2/currency/cad

// requires axios installed

const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if (rate) {
      return rate;
    } else {
      // trigger error just below here
      throw new Error();
    }
  } catch (e) {
    // 'from' code invalid, 'to' code valid
    throw new Error(`Unable to get exchange rate for ${from} to ${to}`);
  }
}

//----------------------------

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    // 'to' countryCode invalid
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }

}

//----------------------------

const convertCurrency = (from,to,amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from,to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;
    return `${amount} in ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};

//----- async/await variant
const convertCurrencyAlt = async (from,to,amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from,to);
  const exchangedAmount = amount * rate;
  return `${amount} in ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD','CAD', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});
