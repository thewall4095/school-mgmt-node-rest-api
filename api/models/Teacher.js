const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "teacher";
const Classs = require("./Class");

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

Classs.hasOne(Teacher);
Teacher.belongsTo(Classs);


// Teacher.hasOne(Classs);
// Classs.belongsTo(Teacher);

module.exports = Teacher;