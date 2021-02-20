const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "subject_teacher";
const Subject = require("./Subject");
const Teacher = require("./Teacher");

const SubjectTeacher = sequelize.define("SubjectTeacher", {}, { tableName });
Subject.belongsToMany(Teacher, { through: "SubjectTeacher" });
Teacher.belongsToMany(Subject, { through: "SubjectTeacher" });
// eslint-disable-next-line
SubjectTeacher.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = SubjectTeacher;
