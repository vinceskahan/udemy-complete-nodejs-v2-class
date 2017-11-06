module.exports.add = (a,b) => a+b;
module.exports.square = (x) => x*x;

module.exports.setName = (user,fullname) => {
  var names = fullname.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};
