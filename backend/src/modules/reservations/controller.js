const TABLA = "reservations";

module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  async function add(data) {
    const activeReservation = await selectActiveReservation(data);

    if (activeReservation) {
      throw new Error(
        "Ya tienes una reserva activa. No puedes hacer una nueva reserva."
      );
    }

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
    const data = `
          SELECT 
          r.qr_code,
          rs.name AS status,
          r.vehicle_id,
          DATE_FORMAT(r.reservation_date, '%Y-%m-%d %H:%i:%s') AS reservation_date
        FROM reservations r
        JOIN reservationstatus rs ON r.status_id = rs.id
        WHERE r.user_id = ?
        ORDER BY r.reservation_date DESC;
        `;
    return db.query(data, param);
  }

  function selectActiveReservation(reservation) {
    let vehicleId;
    if (reservation.vehicle_type_id === reservation.user.vehicle1Type) {
      vehicleId = reservation.user.vehicle1_id;
    }
    if (reservation.vehicle_type_id === reservation.user.vehicle2Type) {
      vehicleId = reservation.user.vehicle2_id;
    }

    const data = `
    SELECT id 
    FROM reservations
    WHERE user_id = ? AND status_id = 1 AND vehicle_id = ?
    LIMIT 1;
  `;
    return db
      .query(data, [reservation.user.id, vehicleId])
      .then((rows) => (rows.length > 0 ? rows[0] : null));
  }

  return {
    add,
    update,
    selectReservation,
  };
};
