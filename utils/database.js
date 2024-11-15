//mongodb

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://ssridhar571999:admin@cluster0.urfqs.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected to Db");
      _db = client.db(); // storing the connection here
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//return access to the database - for simultaneous interactions with db
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

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

// const Sequelize = require("sequelize");

// //initalize the sequelize with mysql
// const sequelize = new Sequelize("node-complete", "root", "nodeComplete", {
//   host: "localhost",
//   dialect: "mysql",
// });

// module.exports = sequelize;
