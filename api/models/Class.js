const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "class";

const Class = sequelize.define(
  "Class",
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

module.exports = Class;