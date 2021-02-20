const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "classroom_class";
const Classroom = require("./Classroom");
const Class = require("./Class");

const ClassroomClass = sequelize.define("ClassroomClass", {}, { tableName });
Classroom.belongsToMany(Class, { through: "ClassroomClass" });
Class.hasOne(Classroom, { through: "ClassroomClass" });
// eslint-disable-next-line
ClassroomClass.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = ClassroomClass;
