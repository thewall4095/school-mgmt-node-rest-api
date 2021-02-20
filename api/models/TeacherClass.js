const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "teacher_class";
const Teacher = require("./Teacher");
const Class = require("./Class");

const TeacherClass = sequelize.define("TeacherClass", {}, { tableName });
Teacher.belongsToMany(Class, { through: "TeacherClass" });
Class.hasOne(Teacher, { through: "TeacherClass" });
// eslint-disable-next-line
TeacherClass.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = TeacherClass;
