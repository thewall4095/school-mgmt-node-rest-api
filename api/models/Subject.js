const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "subject";
const Classs = require("./Class");

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

Classs.hasOne(Subject);
Subject.belongsTo(Classs);

// Subject.hasOne(Classs);
// Classs.belongsTo(Subject);

module.exports = Subject;