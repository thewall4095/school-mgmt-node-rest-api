const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "classs";

const Classs = sequelize.define(
  "Classs",
  {
    startTime: {
        type: Sequelize.DATE,
    },
    endTime: {
        type: Sequelize.DATE,
    },
  },
  { tableName }
);

module.exports = Classs;