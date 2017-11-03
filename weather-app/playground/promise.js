var asyncAdd = (a,b) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('arguments must be numbers');
      }
    }, 1500);
  });
};

// geez this is needlessly slick and unreadable

//promise chain - use catch to catch first failure
asyncAdd(1,6).then((result) => {
  console.log(`result = `, result);
  return asyncAdd(result, '33');
}).then((result) => {
  console.log('should be 36: ', result);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve,reject) => {
//   setTimeout(() => {
//     resolve('Hey it worked');
//     // reject(`ruh roh`);
//   }, 500);
//
// });
//
// somePromise.then((message) => {
//   console.log('success', message);
// }, (errorMessage) => {
//   console.log('error: ', errorMessage);
// });
