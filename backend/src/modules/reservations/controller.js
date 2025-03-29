const TABLA = "reservations";

module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  async function add(data) {
    let vehicle_id;
    if (data.vehicle_type_id === data.user.vehicle1Type) {
      vehicle_id = data.user.vehicle1_id;
    }
    if (data.vehicle_type_id === data.user.vehicle2Type) {
      vehicle_id = data.user.vehicle2_id;
    }
    const body = {
      id: 0,
      user_id: data.user.id,
      slot_id: data.id,
      vehicle_id: vehicle_id,
    };
    const result = await db.add(TABLA, body);
    return { reservationId: result.insertId };
  }

  async function update(data) {
    return await db.update(TABLA, data);
  }

  return {
    add,
    update,
  };
};
