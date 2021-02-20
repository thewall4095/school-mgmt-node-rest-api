const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "student_class";
const Student = require("./Student");
const Class = require("./Class");

const StudentClass = sequelize.define("StudentClass", {}, { tableName });
Student.belongsToMany(Class, { through: "StudentClass" });
Class.hasOne(Student, { through: "StudentClass" });
// eslint-disable-next-line
StudentClass.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = StudentClass;
