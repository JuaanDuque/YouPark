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

function selectOneEmail(table, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE email="${email}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

async function query(table, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} INNER JOIN users ON users.id = ${table}.id WHERE users.email = "${email.email}"`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

module.exports = {
  selectAll,
  selectOne,
  add,
  remove,
  selectOneEmail,
  query,
};
