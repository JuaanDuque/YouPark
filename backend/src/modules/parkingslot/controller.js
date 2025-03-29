const TABLA = "parkingslot";

module.exports = function (dbinyectada) {
  let db = dbinyectada;

  if (!db) {
    db = require("../../DB/mysql");
  }

  function selectAllVehicle(data) {
    return db.selectObject(TABLA, data);
  }

  async function update(data) {
    return await db.update(TABLA, data);
  }

  return {
    selectAllVehicle,
    update,
  };
};
