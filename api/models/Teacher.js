const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "teacher";

const Teacher = sequelize.define(
  "Teacher",
  {
    name: {
      type: Sequelize.STRING,
    },
    doj: {
        type: Sequelize.DATE,
    },
    salary: {
        type: Sequelize.BIGINT,
    },
    webLectures: {
        type: Sequelize.BOOLEAN,
    }
  },
  { tableName }
);

module.exports = Teacher;