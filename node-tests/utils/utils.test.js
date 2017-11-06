const expect = require('expect')
const utils = require('./utils');

it('should add two numbers', () => {
  var results = utils.add(33,11);
  expect(results).toBe(44).toBeA('number');

  // if (results !== 44) {
  //   throw new Error(`expected 44 got ${results}`);
  // };
});

// bug - mocha thinks this passes always because async
// returns immediately
it('should async add two numbers', () => {
  var results = utils.asyncAdd(4,3, (sum) => {
    expect(sum).toBe(7).toBeA('number');
  });
});

// better...
// add call to done() so mocha waits to be indeed done
it('should async add two numbers', (done) => {
  var results = utils.asyncAdd(4,3, (sum) => {
    expect(sum).toBe(7).toBeA('number');
    done();
  });
});

it('should square a number', () => {
  var results = utils.square(3);
  expect(results).toBe(9).toBeA('number');
});

it('should async square two numbers', (done) => {
  var results = utils.asyncSquare(4, (square) => {
    expect(square).toBe(16).toBeA('number');
    done();
  });
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
