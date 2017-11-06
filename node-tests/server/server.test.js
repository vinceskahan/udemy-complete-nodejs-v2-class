const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

// it('should return hello world response', (done) => {
//   request(app)
//     .get('/')
//     .expect(404)
//     .expect((res) => {
//       expect(res.body).toInclude( {
//         error: 'Page not found.'
//       });
//     })
//     .end(done);
// });

// users tests
// assert 200
// assert user 1 exists in array

it('should return users ok', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((res) => {
      // note this requires all the parameters of user 1 to match
      expect(res.body).toInclude( {
        name: 'user 1',
        age: 21,
      });
    })
    .end(done);
});
