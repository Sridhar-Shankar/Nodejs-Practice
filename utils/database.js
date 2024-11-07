//raw sql

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "nodeComplete",
// });

// module.exports = pool.promise();

//sequelize

const Sequelize = require("sequelize");

//initalize the sequelize with mysql
const sequelize = new Sequelize("node-complete", "root", "nodeComplete", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
