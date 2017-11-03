var somePromise = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('Hey it worked');
  }, 2500);

});

somePromise.then((message) => {
  console.log('success', message);
});
