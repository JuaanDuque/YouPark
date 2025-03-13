const TABLA = "users";
const auth = require("../auth/index");
module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  function selectAll() {
    return db.selectAll(TABLA);
  }

  function selectOne(id) {
    return db.selectOne(TABLA, id);
  }

  function selectOneEmail(email) {
    return db.selectOneEmail(TABLA, email);
  }

  async function add(body) {
    const user = {
      id: body.id,
      full_name: body.full_name,
      identification_number: body.identification_number,
      email: body.email,
      phone: body.phone,
      apartment_number: body.apartment_number,
      tower: body.tower,
      active: body.active,
      vehicle1_id: body.vehicle1_id,
      vehicle2_id: body.vehicle2_id,
      role_id: body.role_id,
    };

    const response = await db.add(TABLA, user);
    let insertId = 0;
    if (body.id == 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }
    let response2 = "";
    if (body.full_name || body.password) {
      response2 = await auth.add({
        id: insertId,
        user: body.full_name,
        password: body.password,
      });
    }

    return response2;
  }

  function remove(body) {
    return db.remove(TABLA, body);
  }

  return {
    selectAll,
    selectOne,
    selectOneEmail,
    add,
    remove,
  };
};
