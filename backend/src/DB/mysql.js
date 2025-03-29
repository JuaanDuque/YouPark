const mysql = require("mysql");
const config = require("../config");
const e = require("express");
const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
};

let connection;

function conMysql() {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if (err) {
      console.log("[db error]", err);
      setTimeout(conMysql, 200);
    } else {
      console.log("base de datos conectada");
    }
  });

  connection.on("error", (err) => {
    console.log("[db error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      setTimeout(conMysql, 200);
    } else {
      throw err;
    }
  });
}

conMysql();

function selectAll(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function selectOne(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id=${id}`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function selectObject(tabla, condiciones) {
  return new Promise((resolve, reject) => {
    const whereClause = Object.keys(condiciones)
      .map((key) => `${key} = ?`)
      .join(" AND ");

    const consulta = `SELECT * FROM ?? WHERE ${whereClause}`;
    const valores = Object.values(condiciones);

    connection.query(consulta, [tabla, ...valores], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function add(table, data) {
  return new Promise((resolve, reject) => {
    const updateData = Object.keys(data)
      .map((key) => `${key} = VALUES(${key})`)
      .join(", ");
    const sql = `INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ${updateData}`;
    const values = [table, data];

    connection.query(sql, values, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    // Se extrae el id y se remueve del objeto para no actualizar la clave primaria
    const id = data.id;
    if (!id) {
      return reject(
        new Error("Se requiere el campo 'id' para la actualización.")
      );
    }
    const fields = { ...data };
    delete fields.id;

    const sql = "UPDATE ?? SET ? WHERE id = ?";
    const values = [table, fields, id];

    connection.query(sql, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

function remove(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE id = ?`,
      data.id,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function login(table, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} INNER JOIN users ON users.id = ${table}.id WHERE users.email = "${email.email}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function query(query, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

module.exports = {
  selectAll,
  selectOne,
  add,
  selectObject,
  remove,
  login,
  query,
  update,
};
