const Students = require("../models/student");


module.exports.home = async function(req, res){


    Students.find({}, function(err, students){
        
            return res.render("home", {
                title: "Home",
                students: students
            })
        })
    


    // try{
    //     let students = await Students.find({})
    //     .populate("student");


        // return res.render("home", {
        //     title: "Home",
        //     students: students,
        // });

    // }
    // catch(err){
    //     console.log(err);
    //     return;
    // }

   
}