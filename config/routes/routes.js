const routes = {
  'GET /getTeachers': 'TeacherController.getTeachers',
  'POST /initTeachers': 'TeacherController.initTeachers',

  'GET /getStudents': 'StudentController.getStudents',
  'POST /initStudents': 'StudentController.initStudents',

  'GET /getClassroom': 'ClassroomController.getClassroom',
  'POST /initClassroom': 'ClassroomController.initClassroom',

  'GET /getClass': 'ClassController.getClass',
  'POST /createClass': 'ClassController.createClass',
};

module.exports = routes;
