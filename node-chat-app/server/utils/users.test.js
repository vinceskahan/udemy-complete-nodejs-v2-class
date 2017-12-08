const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '2134',
      name: 'me',
      room: 'the office fans'
    }

    var resUser = users.addUser(user.id,user.name,user.room);

    // expect our user has one user matching the one we added
    expect(users.users).toEqual([user]);


  });
});
