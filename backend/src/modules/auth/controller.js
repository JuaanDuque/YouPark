const TABLA = "auth";
const bcrypt = require("bcrypt");
const authentication = require("../../authentication");
const error = require("../../middleware/errors");
module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  async function login(data) {
    const response = await db.login(TABLA, data);
    return bcrypt
      .compare(data.password, response[0].password)
      .then((result) => {
        if (result === true) {
          //generar token
          return authentication.assignToken({ ...data });
        } else {
          throw error("Información invalida.", 400);
        }
      });
  }

  async function add(data) {
    const authData = {
      id: data.id,
    };

    if (data.user) {
      authData.user = data.user;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 5);
    }

    return db.add(TABLA, authData);
  }

  return {
    add,
    login,
  };
};
