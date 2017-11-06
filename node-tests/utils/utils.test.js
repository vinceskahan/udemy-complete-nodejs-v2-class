const expect = require('expect')
const utils = require('./utils');

it('should add two numbers', () => {
  var results = utils.add(33,11);
  expect(results).toBe(44).toBeA('number');

  // if (results !== 44) {
  //   throw new Error(`expected 44 got ${results}`);
  // };
});

it('should square a number', () => {
  var results = utils.square(3);
  expect(results).toBe(9).toBeA('number');
  // if (results !== 9) {
  //   throw new Error(`expected 9 got ${results}`);
  // };
});

//should verify first and last names are set
//assert it includes first+lastname with proper values
//and type is an object
it('should do good', () => {
  var user = { age: 25, location: 'philly' };
  var results = utils.setName(user,'joe user');

  // expect(results.firstName === "joe");
  // expect(results.lastName === "user");
  // expect(results.age === 25);

  //alternately
  expect(results).toInclude({
    firstName: 'joe',
    lastName: 'user',
  });
});

// it('should expect something', () => {
//   // expect(12).toNotBe(11);
//
//   // this fails because they are not the same object
//   //expect({name: 'Andrew'}).toBe({name: 'Andrew'});
//
//   // this fails because they are the same object
//   //expect({name: 'Andrew'}).toEqual({name: 'Andrew'});
//
//   //fails
//   //expect([2,3,4]).toInclude(5);
//   //works
//   //expect([2,3,4]).toInclude(2);
//
//   // expect({
//   //   name: "Andrew",
//   //   location: 'Philly'
//   // }).toInclude({
//   //   location: 'Philly'
//   // });
//   // similarly toExclude
//
// });
