const Contact = require("../models/Contact");
const Student = require("../models/Student");
const Utils = require('../services/utils.service');
const ContactStudent = require("../models/ContactStudent");
const Classs = require("../models/Class");

const StudentController = () => {
    const getStudents = async (req, res) => {
        try{
            let students = [];
            if(req.query.available=='true'){
                students = await Student.findAll({
                    include:[
                        {
                            model : Contact,
                        },
                        {
                            model : Classs,
                            required: true,
                        },
                    ]
                });
            }else{
                students = await Student.findAll({
                    include:[
                        {
                            model : Contact,
                        },
                    ]
                });
            }

            res.status(200).send({success: true, data: students});
        }catch (err) {
          return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const initStudents = async (req,res) => {
        try{
            let students = [];
            for(let i=1; i<=100;i++){
                let student = await Student.create({
                    name: Utils().generateName(),
                    doj:  Utils().generateStudentDoj(),
                    standard: Math.floor(Math.random() * 13),
                    rollno: i,
                    ranking: 101-i,
                });
                if(student && student.dataValues.id){
                    students.push(student.dataValues);
                    let possibleRelations = ['mother', 'father', 'guardian', 'uncle', 'grandparent'];

                    let contact = await Contact.create({
                        name: Utils().generateName(),
                        contactNumber: Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000,
                        relationS: possibleRelations[Math.floor(Math.random() * 5)],
                    });
                    if(contact && contact.dataValues.id){
                        try{
                            let contactStudent = await ContactStudent.create({
                                ContactId: contact.id,
                                StudentId: student.id,
                            });
                        }catch(er){
                            console.log(er); //basically do nothing
                        }
                    }
                }
            }
            res.status(200).send({success: true, data: students});
        }catch (err) {
          return res.status(500).json({ msg: "Internal server error" });
        }
    };



    return {
        getStudents,
        initStudents
    };
};

module.exports = StudentController;
