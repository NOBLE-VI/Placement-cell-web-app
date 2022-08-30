const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    college:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    DSA_Final_Score:{
        type: String,
        required: true,
    },
    WebD_FinalScore:{
        type: String,
        required: true,
    },
    React_Final_Score:{
        type: String,
        required: true,
    },
    interview_date:{
        type: String,
        
    },
    batch:{
        type: String,

    },
    interview_student_result:{
        type: String,

    }
},
{
    timestamps: true
})


const Students = mongoose.model("Student", studentSchema);

module.exports = Students;