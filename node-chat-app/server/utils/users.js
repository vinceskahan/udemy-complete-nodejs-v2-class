//---- old style in earlier lessons ----
//
// [{
//   id: '/somereally long string',
//   name: 'Andrew',
//   room: 'The Office Fans'
// }]
//
// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)
//
// modules.export = {
//   addUser,
//   removeUser,
//   getUser,
//   getUserList
// }

// or using es6 classes........
//
// class Person {
//   constructor (name,age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
// var me = new Person('me', 25);
// var description = me.getUserDescription();
// console.log(description);

class Users {
  constructor() {
    this.users = [];               // create empty array of users
  }
  addUser(id,name,room) {
    var user = {id,name,room};     // create user object with these properties
    this.users.push(user);         // push it onto the array of users
    return user;
  }

  // removeUser() {}
  // getUser() {}
  // getUserList() {}

}

module.exports = {Users}; // export class and its methods
