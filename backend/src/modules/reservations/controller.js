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

  function cancelReservation(param) {
    const data = `
          UPDATE reservations r
            JOIN parkingslot p ON r.slot_id = p.id
            SET 
              r.status_id = 2,        
              p.status = 1            
            WHERE r.id = ?;
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
    WHERE user_id = ? 
      AND vehicle_id = ? 
      AND (status_id = 1 OR status_id = 5)
    LIMIT 1;
  `;
    return db
      .query(data, [reservation.user.id, vehicleId])
      .then((rows) => (rows.length > 0 ? rows[0] : null));
  }

  async function updateReservationQR({ id, type }) {
    if (Number(type) === 1) {
      // Actualización para entrada: se registra check_in solo si status_id es 1.
      const query = `
        UPDATE reservations
        SET check_in = NOW(),status_id = 5
        WHERE id = ? AND status_id = 1;
      `;
      const result = await db.query(query, [id]);
      return {
        message: "Check-in actualizado",
        affectedRows: result.affectedRows,
      };
    } else if (Number(type) === 0) {
      const query = `
        UPDATE reservations r
        JOIN parkingslot p ON r.slot_id = p.id
        SET r.check_out = NOW(),
            r.status_id = 4,
            p.status = 1
        WHERE r.id = ?;
      `;
      const result = await db.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("Reserva no encontrada o no se pudo actualizar.");
      }
      return {
        message: "Check-out y slot actualizados",
        affectedRows: result.affectedRows,
      };
    } else {
      throw new Error("Tipo inválido. Debe ser 1 (entrada) o 0 (salida).");
    }
  }

  return {
    add,
    update,
    selectReservation,
    cancelReservation,
    updateReservationQR,
  };
};
