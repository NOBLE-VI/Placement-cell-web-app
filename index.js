const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const db= require("./config/mongoose.js");
//user for session cookie
const passport = require("passport");
const PassportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
//----------------------

//requiring connect flash
const flash = require("connect-flash");
const customMware = require("./config/midleware");



const sassMiddleware = require("node-sass-middleware");


const port = 3000;



const app = express();


app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    // debug: true,
    outputStyle: "extended",
    prefix: "/css"
}));

app.use(express.static("./assets")); //telling express where static files are.


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);

// extracting style, body and script from sub pages to layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


//setting view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(session({
    name: "place_id",

    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100),
    },
    store:MongoStore.create({
        mongoUrl: mongoose.connection._connectionString,
        autoRemove: "disabled"
    },
    function(err){
        console.log(err || "connect-mongo setup ok");
    }
    )

}));




app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use(flash());
app.use(customMware.setFlash);


app.use("/", require("./router/index"));

app.listen(port, function(err){
    if(err)
    {
        console.log("Error in starting the server : ", err);
        return;
    }
    console.log("Server is up and running on port:", port);
    return;
})