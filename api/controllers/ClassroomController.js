const Classroom = require("../models/Classroom");
const Classs = require("../models/Class");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const ClassroomController = () => {

    const getClassroom = async (req, res) => {
        try{
            let classrooms = [];
            // if(req.query.startTime && req.query.endTime){
            //     classrooms = await Classroom.findAll({
            //         include:[
            //             {
            //                 model : Classs,
            //                 required: true,
            //                 where:{
            //                     [Op.gte]: moment(req.query.startTime).toDate(),
            //                     [Op.lte]: moment(req.query.endTime).toDate(),
            //                 },
            //             },
            //         ]
            //     });
            // }else{
                classrooms = await Classroom.findAll({
                    include:[
                        {
                            model : Classs,
                        },
                    ]
                });
            // }

            res.status(200).send({success: true, data: classrooms});
        }catch (err) {
            console.log(err);
          return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const initClassroom = async (req,res) => {
        try{
            let classrooms = [];
            for(let i=1; i<=10;i++){
                let possibleShapes = ['oval', 'rectangular', 'canopy', 'elevated'];

                let classroom = await Classroom.create({
                    seatingCapacity: Math.floor(Math.random() * (100 - 15 + 1)) + 15,
                    webSupport:  Math.floor(Math.random() * 2) == 0 ? true : false,
                    shape: possibleShapes[Math.floor(Math.random() * 4)],
                });
                if(classroom && classroom.dataValues.id){
                    classrooms.push(classroom.dataValues);
                }
            }
            res.status(200).send({success: true, data: classrooms});
        }catch (err) {
          return res.status(500).json({ msg: "Internal server error" });
        }
    };

    return {
        getClassroom,
        initClassroom
    };
};

module.exports = ClassroomController;
