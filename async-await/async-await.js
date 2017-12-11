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

// Andrew has a 83% average
const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;  // need the user info from the found userId from getUser
    return getGrades(user.schoolId);
  }).then((grades) => {
    //--- success callback
    let average = 0;
    if (grades.length > 0) {
      // reduce here adds up the values in the grades array
      // then get the average by dividing by the number of items of course
      average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class`;
  });
};

getStatus(1).then((status) => {
  console.log(status);
}).catch((err) => {
  console.log(err);
});
