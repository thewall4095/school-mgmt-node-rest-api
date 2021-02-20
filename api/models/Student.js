const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "student";

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: Sequelize.STRING,
    },
    doj: {
        type: Sequelize.DATE,
    },
    standard: {
        type: Sequelize.INTEGER,
    },    
    rollno: {
        type: Sequelize.BIGINT,
    },   
    ranking: {
        type: Sequelize.BIGINT,
        unique : true,
    },    
  },
  { tableName }
);

module.exports = Student;