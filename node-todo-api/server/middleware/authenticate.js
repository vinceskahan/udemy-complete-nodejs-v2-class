var {User} = require('./../models/user');

var authenticate = (req,res,next) => {
  // grab the token from the header
  var token = req.header('x-auth');

  //find the token, returning the matching user
  User.findByToken(token).then((user) => {

    // nobody found
    if (!user) {
      return Promise.reject();
    }
    // found one - modify req object to match
    req.user = user;
    req.token = token;
    next();   // so the req.send in GET users/me executes
  }).catch((e) => {
    res.status(401).send();    // 401 = auth required
  });
};

module.exports = {authenticate};
