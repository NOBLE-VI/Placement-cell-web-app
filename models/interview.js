const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema({
    company_name:{
        type: String,
        required: true,
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: "Student",
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

const Interview = mongoose.model("interview", interviewSchema);

module.exports = Interview;