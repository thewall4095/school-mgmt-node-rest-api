const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "contact_student";
const Contact = require("./Contact");
const Student = require("./Student");

const ContactStudent = sequelize.define("ContactStudent", {}, { tableName });
Contact.belongsToMany(Student, { through: "ContactStudent" });
Student.belongsToMany(Contact, { through: "ContactStudent" });
// eslint-disable-next-line
ContactStudent.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = ContactStudent;
