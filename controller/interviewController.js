const Interview = require("../models/interview");
const Students = require("../models/student");

const {Parser} = require("json2csv");


module.exports.home = async function(req, res){

        let student = await Students.find({})
    
        let interviews = await Interview.find({})
        .populate("student");

       
        return res.render("interview", {
            title: "Interview page",
            students: student,
            interviews: interviews,
         })
        
        

}



module.exports.createInterview = async function(req, res){


    console.log(`company_name: ${req.body.company_name},
            student: ${req.body.student} = ${typeof(req.body.student)},
            status: ${req.body.status},
            Date: ${req.body.Date}`);


    try{
      
         let cmnt = await Interview.create({
            company_name: req.body.company_name,
            student: req.body.student,
            status: req.body.status,
            Date: req.body.Date
        });
        // console.log("Interview created");
        req.flash("success", "Interview Created");
        return res.redirect("back");
        
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }

}


module.exports.download = async function(req,res){

    let interview = await Interview.find({});
       
        
        const allInterview=[];
        for(let i of interview){
            let temp={};
            
            temp["Company Name"]=i.company_name; 
            temp["Status"]=i.status;
            temp["Date"]=i.Date;

            //find the student
            var st = await Students.findOne({_id : i.student._id});
            temp["College Name"]= st.college;
            temp["Student Name"]= st.name;
            temp["Dsa Score"] = st.DSA_Final_Score;
            temp["Web Score"] = st.WebD_FinalScore;
            temp["React Score"]= st.React_Final_Score;
            temp["Student Id"]= st.id;
            temp["Batch"]=st.batch;

            allInterview.push(temp);
            // console.log(i.student);
            // console.log(st.name);
        }

        const csvheader = ["Student Id","Company Name","Student Name","Status","Date","College Name","Dsa Score","Web Score","React Score","Batch"];
        const parser = new Parser({csvheader});
        const csv = parser.parse(allInterview);

        res.attachment("placementCellData.csv");
        res.status(200).send(csv);

    
}
