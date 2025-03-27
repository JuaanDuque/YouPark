const TABLA = "users";
const auth = require("../auth/index");
const vehicle = require("../vehicles/index");
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

  function getUsers(params = []) {
    const data = `
          SELECT 
            u.id, 
            u.full_name, 
            u.identification_number, 
            u.email, 
            u.phone, 
            u.apartment_number, 
            u.tower, 
            u.active, 
            u.vehicle1_id, 
            u.vehicle2_id, 
            u.role_id, 
            v1.vehicle_type_id AS vehicle1Type, 
            v2.vehicle_type_id AS vehicle2Type
          FROM 
            users u
          LEFT JOIN 
            vehicles v1 ON u.vehicle1_id = v1.plate
          LEFT JOIN 
            vehicles v2 ON u.vehicle2_id = v2.plate
          WHERE 
            u.role_id = ?;
        `;
    return db.query(data, params);
  }

  async function add(body) {
    if (body.vehicle1_id) {
      const vehicles = {
        plate: body.vehicle1_id,
        vehicle_type_id: body.vehicle1Type,
      };
      await vehicle.add(vehicles);
    }
    if (body.vehicle2_id) {
      const vehicles = {
        plate: body.vehicle2_id,
        vehicle_type_id: body.vehicle2Type,
      };
      await vehicle.add(vehicles);
    }
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
    if (body.full_name || body.identification_number) {
      response2 = await auth.add({
        id: insertId,
        user: body.full_name,
        password: body.identification_number,
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
    getUsers,
    add,
    remove,
  };
};
