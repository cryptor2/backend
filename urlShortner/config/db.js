const { Sequelize } = require("sequelize");
const createDb = new Sequelize("test", "user", "pass", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

module.exports = createDb;
