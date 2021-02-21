const Classs = require("../models/Class");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Classroom = require("../models/Classroom");
const Student = require("../models/Student");

// const TeacherClass = require("../models/TeacherClass");
// const SubjectClass = require("../models/SubjectClass");
// const ClassroomClass = require("../models/ClassroomClass");
const StudentClass = require("../models/StudentClass");


const ClassController = () => {

    const getClass = async (req, res) => {
        try{
            let classes = await Classs.findAll({
                include:[
                    {
                        model : Classroom,
                    },
                    {
                        model : Teacher,
                    },
                    {
                        model : Subject,
                    },
                    {
                        model : Student,
                    },
                ]
            });
            res.status(200).send({success: true, data: classes});
        }catch(err){
            console.log(err);
          return res.status(500).json({ msg: "Internal server error" });
        }
    }

    const createClass = async (req, res) => {
        try{
            console.log(req.body);
            if(req.body.startTime && req.body.endTime && req.body.classroom_id && req.body.teacher_id && req.body.subject_id && req.body.student_ids){
                let createdClass = await Classs.create({
                    startTime: req.body.startTime,
                    endTime: req.body.endTime
                });

                if(createdClass && createdClass.id){
                    let toBulkCreate = [];
                    let studentids = req.body.student_ids.split('_');
                    for(let i=0;i<studentids.length;i++){
                        if(studentids[i]){
                            toBulkCreate.push({
                                StudentId: studentids[i],
                                ClasssId: createdClass.id,
                            })
                        }
                    }
            
                    var result1 = await Classroom.findOne({
                        where: {
                            id: req.body.classroom_id,
                        }
                    });
                    await createdClass.setClassroom(result1);

                    var result2 = await Teacher.findOne({
                        where: {
                            id: req.body.teacher_id,
                        }
                    });
                    await createdClass.setTeacher(result2);

                    var result3 = await Subject.findOne({
                        where: {
                            id: req.body.subject_id,
                        }
                    });

                    await createdClass.setSubject(result3);

                    console.log(toBulkCreate);

                    var result4 = await StudentClass.bulkCreate(toBulkCreate);
        
                    // let values = await Promise.all([result1, result2, result3, result4])
                    // console.log(values, 'qwertyu');
                    let data = {
                        createdClass: createdClass,
                        ClassroomClass: result1,
                        TeacherClass: result2,
                        SubjectClass: result3,
                        StudentClass: result4
                    }

                    // createdClass['attributes'] = values;
                    // values.push(data);
                    // createdClass = Object.assign(createdClass, {
                    //     attributes: values
                    // });
                    // console.log(values);
                    res.status(200).send({success: true, data: data});
                }
            }else{  
                return res.status(200).json({success: false, msg: "Missing params"});
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }

    return {
        getClass,
        createClass
    };
};

module.exports = ClassController;