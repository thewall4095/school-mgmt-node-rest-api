const Subject = require("../models/Subject");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const SubjectTeacher = require("../models/SubjectTeacher");
const Classs = require("../models/Class");

const TeacherController = () => {
    const getTeachers = async (req, res) => {
        try{
            let teachers = await Teacher.findAll({
                include:[
                    {
                        model : Subject,
                    },
                    {
                        model : Classs,
                    },
                ]
            });
            res.status(200).send({success: true, data: teachers});
        }catch (err) {
            console.log(err);
          return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getStudentsOfTeacher = async (req, res) => {
        try{
            if(req.query.teacher_id){
            let students = [];
            let teacher = await Teacher.findOne({
                where: {
                    id: req.query.teacher_id
                },
                include:[
                    {
                        model : Classs,
                        include: [
                            {
                                model : Student,
                            },
                        ]
                    },
                ]
            });
            if(teacher && teacher.id){
                res.status(200).send({success: true, data: teacher.Classs.Students});
            }
        }else{
            res.status(200).send({success: false, data: "Missing params!"});

        }
        }catch (err) {
            console.log(err);
          return res.status(500).json({ msg: "Internal server error" });
        }
    }

    const initTeachers = async (req,res) => {
        try{

            let teachers = [
                {
                    name: 'Turing',
                    doj: new Date("2017-08-22"),
                    subjects: ['Math', 'English'],
                    salary: 1800000,
                    weblectures: true
                },
                {
                    name: 'Dinho',
                    doj: new Date("2016-01-01"),
                    subjects: ['Sports', 'Health Science'],
                    salary: 2500000,
                    weblectures: false
                },
                {
                    name: 'Adele',
                    doj: new Date("2015-03-01"),
                    subjects: ['English'],
                    salary: 1000000,
                    weblectures: false
                },
                {
                    name: 'Freddie',
                    doj: new Date("2017-08-01"),
                    subjects: ['Music', 'English'],
                    salary: 2000000,
                    weblectures: true
                },
                {
                    name: 'Dalton',
                    doj: new Date("2017-03-01"),
                    subjects: ['Botany', 'Zoology'],
                    salary: 900000,
                    weblectures: true
                },
                {
                    name: 'Harish',
                    doj: new Date("2017-02-01"),
                    subjects: ['Math', 'Science'],
                    salary: 1800000,
                    weblectures: true
                },
                {
                    name: 'Trump',
                    doj: new Date("2017-08-01"),
                    subjects: ['Political Science', 'Business Administration', 'Foreign Affairs', ],
                    salary: 800000,
                    weblectures: false
                },
                {
                    name: 'Swaraj',
                    doj: new Date("2019-09-01"),
                    subjects: ['Foreign Affairs', 'Negotiations'],
                    salary: 2800000,
                    weblectures: true
                },
                {
                    name: 'Socrates',
                    doj: new Date("2017-06-01"),
                    subjects: ['Philosophy', 'Moral Science'],
                    salary: 1150000,
                    weblectures: true
                },
            ];

            for(let i=0; i<teachers.length;i++){
                let teacher = await Teacher.create({
                    name: teachers[i].name,
                    doj: teachers[i].doj,
                    salary: teachers[i].salary,
                    webLectures: teachers[i].weblectures
                });
                if(teacher && teacher.dataValues.id){
                    for(let j=0; j < teachers[i].subjects.length; j++){
                        try{
                            let numChapters = Math.floor(Math.random() * 21);
                            let possibleDurations = [30, 60, 90, 120];
                            let perClassDuration = possibleDurations[Math.floor(Math.random() * 4)];
                            let subject = await Subject.create({
                                name: teachers[i].subjects[j],
                                chapters: numChapters,
                                totalDurations: perClassDuration * numChapters,
                                perclassDurations: perClassDuration
                            });
                            if(subject && subject.dataValues.id){
                                try{
                                    let subjectTeacher = await SubjectTeacher.create({
                                        SubjectId: subject.id,
                                        TeacherId: teacher.id,
                                    });
                                }catch(er){
                                    // console.log(er); //basically do nothing
                                }
                            }else{
                                let subject = await Subject.findOne({
                                    where: {
                                        name: teachers[i].subjects[j],
                                    }
                                });
                                if(subject && subject.dataValues.id){
                                    try{
                                        let subjectTeacher = await SubjectTeacher.create({
                                            SubjectId: subject.id,
                                            TeacherId: teacher.id,
                                        });
                                    }catch(er){
                                        // console.log(er); //basically do nothing
                                    }
                                }
                            }
                        }catch(error){
                            let subject = await Subject.findOne({
                                where: {
                                    name: teachers[i].subjects[j],
                                }
                            });
                            if(subject && subject.dataValues.id){
                                try{
                                    let subjectTeacher = await SubjectTeacher.create({
                                        SubjectId: subject.id,
                                        TeacherId: teacher.id,
                                    });
                                }catch(er){
                                    // console.log(er); //basically do nothing
                                }
                            }
                            // console.log(error); 
                            continue;
                        }
                    }
                }

            }

            res.status(200).send({success: true, data: teachers});
        }catch (err) {
          return res.status(500).json({ msg: "Internal server error" });
        }
    };

    return {
        getTeachers,
        getStudentsOfTeacher,
        initTeachers
    };
};

module.exports = TeacherController;
