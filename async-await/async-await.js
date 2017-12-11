const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 101
}, {
  id: 2,
  name: 'Jen',
  schoolId: 999
}];

const grades = [];

const getUser = (id) => {
  return new Promise((resolve,reject) => {
    const user = users.find((user) => user.id === id);   // return user if id matches
    if (user) {
        resolve(user);
    } else {
      reject(`unable to find user with id of ${id}.`);
    }
  });
};

getUser(2).then((user) => {
  console.log(user);
}).catch((err) => {
  console.log(err);
});
