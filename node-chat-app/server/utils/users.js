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

class Person {
  constructor (name,age) {
    this.name = name;
    this.age = age;
  }
  getUserDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

var me = new Person('me', 25);
var description = me.getUserDescription();
console.log(description);
