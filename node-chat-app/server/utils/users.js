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
}

var me = new Person('me', 25);
console.log('this.name', me.name);
console.log('this.age', me.age);
