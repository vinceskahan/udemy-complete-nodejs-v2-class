var {User} = require('./../models/user');

var authenticate = (req,res,next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      // run the error case here to be DRYer
      return Promise.reject();
    }
    //modify req object
    req.user = user;
    req.token = token;
    next();   // so the req.send in get users/me executes
  }).catch((e) => {
    res.status(401).send();    // auth required status code
  });
};

module.exports = {authenticate};
