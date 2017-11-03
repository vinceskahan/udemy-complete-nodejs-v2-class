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
asyncAdd(1,2).then((result) => {
  console.log(`result = `, result);
}, (errorMessage) => {
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
