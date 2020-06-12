const mysql = require("mysql");
const {promisify} = require('util')
const { database } = require("./keys");

const conex = mysql.createPool(database);

conex.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("db ha sido cerrada");
    }  if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("la db tiene muchas conexiones");
    }  if (err.code === "ECONNREFUSED") {
      console.log("conexion rechada");
    }
  }
  if (connection) connection.release();
  console.log("db connected");
  return;
});
//soporta promesa las querys
conex.query = promisify(conex.query);

module.exports = conex;