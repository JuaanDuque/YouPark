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

  function selectReservation(param) {
    console.log(param, "para ");
    const data = `
          SELECT 
          r.qr_code,
          rs.name AS status,
          r.vehicle_id,
          DATE_FORMAT(r.reservation_date, '%Y-%m-%d %H:%i:%s') AS reservation_date
        FROM reservations r
        JOIN reservationstatus rs ON r.status_id = rs.id
        WHERE r.user_id = ?;
        `;
    return db.query(data, param);
  }

  return {
    add,
    update,
    selectReservation,
  };
};
