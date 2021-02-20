const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "subject_class";
const Subject = require("./Subject");
const Class = require("./Class");

const SubjectClass = sequelize.define("SubjectClass", {}, { tableName });
Subject.belongsToMany(Class, { through: "SubjectClass" });
Class.hasOne(Subject, { through: "SubjectClass" });
// eslint-disable-next-line
SubjectClass.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = SubjectClass;
