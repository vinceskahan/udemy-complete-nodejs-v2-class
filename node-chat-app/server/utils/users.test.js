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
    //   expect(userList).not.toContain(users.users[0]);
    // });

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '12345';
    var user = users.getUser(userId);
    expect(user).toBe(undefined);
  });

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
