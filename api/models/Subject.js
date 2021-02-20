const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "subject";

const Subject = sequelize.define(
  "Subject",
  {
    name: {
        type: Sequelize.STRING,
        unique : true,
    },
    chapters: {
      type: Sequelize.INTEGER,
    },
    totalDurations: { // in mins
        type: Sequelize.INTEGER,
    },
    perclassDurations: {
        type: Sequelize.BIGINT,
        validate: {
            max: 120,                  
            min: 30,
        }
    },
  },
  { tableName }
);

module.exports = Subject;