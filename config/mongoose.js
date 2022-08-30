const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Placement_User_login_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "-----error connecting to USER DB-----"));

db.once("open", function(){
    console.log("successfully connected to database");
})


module.exports = db;

