const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "contact";

const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: Sequelize.STRING,
    },
    contactNumber: {
        type: Sequelize.STRING,
    },
    relationS: {
        type: Sequelize.STRING,
    },
  },
  { tableName }
);

module.exports = Contact;