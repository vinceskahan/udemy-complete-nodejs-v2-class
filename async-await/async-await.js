const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 101
}, {
  id: 2,
  name: 'Jen',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
},{
  id: 2,
  schoolId: 999,
  grade: 100
},{
  id: 3,
  schoolId: 101,
  grade: 80
}];

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

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

// const getUser = (id) => {
//   return new Promise((resolve,reject) => {
//     const user = users.find((user) => user.id === id);   // return user if id matches
//     if (user) {
//         resolve(user);
//     } else {
//       reject(`unable to find user with id of ${id}.`);
//     }
//   });
// };
//
// getUser(2).then((user) => {
//   console.log(user);
// }).catch((err) => {
//   console.log(err);
// });
getGrades(101).then((grades) => {
  console.log(grades);
}).catch((err) => {
  console.log(err);
});
