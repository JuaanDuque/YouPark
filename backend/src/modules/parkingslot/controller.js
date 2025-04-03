const TABLA = "parkingslot";

module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  function selectAllVehicle() {
    return db.selectAll(TABLA);
  }

  function selectAllVehicleType(data) {
    return db.selectObject(TABLA, data);
  }

  async function update(data) {
    return await db.update(TABLA, data);
  }

  async function add(data) {
    return await db.add(TABLA, data);
  }

  return {
    selectAllVehicle,
    selectAllVehicleType,
    update,
    add,
  };
};
