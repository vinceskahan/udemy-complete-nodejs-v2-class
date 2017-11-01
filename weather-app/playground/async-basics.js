console.log('starting app');

// // register callback that fires in specified msec
setTimeout(() => {
  console.log('inside callback');
}, 2000);

setTimeout(() => {
  console.log('no delay callback');
}, 0);

console.log('finishing up');
