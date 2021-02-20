const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "classroom";

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

module.exports = Classroom;