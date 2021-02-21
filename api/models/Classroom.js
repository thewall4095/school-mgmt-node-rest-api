const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "classroom";
const Classs = require("./Class");

const Classroom = sequelize.define(
  "Classroom",
  {
    seatingCapacity: {
      type: Sequelize.STRING,
    },
    webSupport: {
        type: Sequelize.BOOLEAN,
    },
    shape: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['oval', 'rectangular', 'canopy', 'elevated']],
        }
    },
  },
  { tableName }
);

Classs.hasOne(Classroom);
Classroom.belongsTo(Classs);

// Classroom.hasOne(Classs);
// Classs.belongsTo(Classroom);



module.exports = Classroom;