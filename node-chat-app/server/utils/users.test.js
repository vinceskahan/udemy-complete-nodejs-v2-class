const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  // seed data
  beforeEach(() => {
      users = new Users();
      users.users = [ {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      }, {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      }, {
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }]
  });

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

  // it('should remove a user', () => {
  //   var userList = users.removeUser('1');
  // });
  //
  // it('should find user', () => {
  //   var userList = users.getUser('1');
  // });

  // it('should not find user', () => {
  //   var userList = users.getUser('12345');
  // });
  //
  // it('should not remove a user', () => {
  //   var userList = users.removeUser('12345');
  // });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });



});
