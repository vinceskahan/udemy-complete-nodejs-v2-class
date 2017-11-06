module.exports.add = (a,b) => a+b;

// mocha won't wait more than 2 secs
module.exports.asyncAdd = (a,b,callback) => {
  setTimeout(() => {
    callback(a+b);
  }, 1000);
};


module.exports.square = (x) => x*x;

module.exports.setName = (user,fullname) => {
  var names = fullname.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};
