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

  // user list now has one user matching the one we added
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '2134',
      name: 'me',
      room: 'the office fans'
    }
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  // user exists, returned (removed) id should match
  // and length of seeded array of users should decrement
  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  // user exists, the returned object id should match the one we're looking for
  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  // no such user in our seed data
  //  so try to get it, getUser returns the user it found (or undefined)
  it('should not find user', () => {
    var userId = '12345';
    var user = users.getUser(userId);
    expect(user).toBe(undefined);
  });

  // no such user in our seed data
  //  returned user should be undefined
  //  seeded data should still have 3 users in it
  it('should not remove a user', () => {
    var userId = '12345';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();;
    expect(users.users.length).toBe(3);
  });

  // we know the seeded data's expected contents
  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  // we know the seeded data's expected contents
  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });



});
