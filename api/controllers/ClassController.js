const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Classroom = require("../models/Classroom");
const Student = require("../models/Student");

const TeacherClass = require("../models/TeacherClass");
const SubjectClass = require("../models/SubjectClass");
const ClassroomClass = require("../models/ClassroomClass");
const StudentClass = require("../models/StudentClass");


const ClassController = () => {

    const getClass = async (req, res) => {
        try{
            let classes = await Class.findAll({
                include:[
                    {
                        model : Classroom,
                        through:{
                          attributes: []
                        }
                    },
                    {
                        model : Teacher,
                        through:{
                          attributes: []
                        }
                    },
                    {
                        model : Subject,
                        through:{
                          attributes: []
                        }
                    },
                    {
                        model : Student,
                        through:{
                          attributes: []
                        }
                    },
                ]
            });
            res.status(200).send({success: true, data: classes});
        }catch(err){
          return res.status(500).json({ msg: "Internal server error" });
        }
    }

    const createClass = async (req, res) => {
        try{
            if(req.body.startTime && req.body.endTime && req.body.classroom_id && req.body.teacher_id && req.body.subject_id && req.body.student_ids){
                let createdClass = await Class.create({

                })
            }else{  
                return res.status(200).json({success: false, msg: "Missing params"});
            }
        }catch(err){
            return res.status(500).json({ msg: "Internal server error" });
        }
    }

    return {
        getClass,
        createClass
    };
};

module.exports = ClassController;