const Classroom = require("../models/Classroom");
const Class = require("../models/Class");

const ClassroomController = () => {

    const getClassroom = async (req, res) => {
        try{
            let classrooms = [];
            if(req.query.available=='true'){
                classrooms = await Classroom.findAll({
                    include:[
                        {
                            model : Class,
                            required: true,
                            // where:{
                            //     startTime : 'done',
                            // },
                        },
                    ]
                });
            }else{
                classrooms = await Classroom.findAll();
            }

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
