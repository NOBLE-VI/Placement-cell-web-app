const Students = require("../models/student");
const User = require("../models/user");



module.exports.createStudent = function(req, res){


            Students.create(req.body, function(err, student){
                if(err)
                {
                    console.log("Error in creating the user : ",err);
                    return;
                }
                req.flash("success", "Student Created");
                return res.redirect("back");
            })
    
        }

