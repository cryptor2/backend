const { Sequelize } = require("sequelize");
const createDB = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./config/db.sqllite",
});
module.exports = createDB;
