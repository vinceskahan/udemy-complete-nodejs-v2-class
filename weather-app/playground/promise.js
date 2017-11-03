var somePromise = new Promise((resolve,reject) => {
  setTimeout(() => {
//    resolve('Hey it worked');
    reject(`ruh roh`);
  }, 2500);

});

somePromise.then((message) => {
  console.log('success', message);
}, (errorMessage) => {
  console.log('error: ', message);
});
