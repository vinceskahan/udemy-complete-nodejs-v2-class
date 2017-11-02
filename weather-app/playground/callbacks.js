var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'asfe'
  };
  callback(user);
};

getUser(31, (user) => {
  console.log(user);
});
