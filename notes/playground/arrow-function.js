// var square = (x) => {
//   return x*x;
// };
// console.log(square(2));

// alternate:
//    var square = (x) => x * x;
//    var square = x => x * x;

var user = {
  name: 'dude',

  // arrow function
  sayHi: () => {
    console.log(arguments);
    console.log(`hi`);    // 'this' keyboard does not bind in arrow functions
  },

  // regular function
  sayHiAlt () {
    console.log(arguments);
    console.log(`hi alt. I'm ${this.name}`);
  }
};

user.sayHi(1,2,3);         // returns global arguments
user.sayHiAlt(1,2,3);      // returns 0,1,2,3 for node 8.6 (not 1,2,3 as in the class lesson)
