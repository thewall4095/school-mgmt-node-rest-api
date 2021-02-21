const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "student_class";
const Student = require("./Student");
const Classs = require("./Class");

const StudentClass = sequelize.define("StudentClass", {}, { tableName });
Student.belongsToMany(Classs, { through: "StudentClass" });
Classs.belongsToMany(Student, { through: "StudentClass" });
// eslint-disable-next-line
StudentClass.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = StudentClass;
