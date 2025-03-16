const jwt = require("jsonwebtoken");
config = require("../config");
const error = require("../middleware/errors");

const secret = config.jwt.secret;

function assignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkToken = {
  confirmToken: function (req, id) {
    const decode = decodeHeader(req);
    if (decode.id !== id) {
      throw error("No tienes permisos para esto", 401);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw error("No viene Token", 401);
  }

  return auth;
}

function decodeHeader(req) {
  const auth = req.body.data.token || "";
  const token = getToken(auth);
  const decoded = verifyToken(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  assignToken,
  checkToken,
};
