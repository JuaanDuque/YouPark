const auth = require("../../authentication");

module.exports = function checkAuth() {
  function middleware(req, res, next) {
    if (req.body.data.newUser) {
      return next();
    }
    const id = req.body.data.id;
    auth.checkToken.confirmToken(req, id);
    next();
  }

  return middleware;
};
