const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//authenticate using passport
passport.use(new LocalStrategy({
    usernameField: "email"
}, function(Email, Password, done){
    //find a user and establish the identity
    User.findOne({email: Email}, function(err, user){
        if(err)
        {
            console.log("Error in finding the user --> Passport");
            return done(err);
        }

        if(!user || user.password != Password)
        {
            console.log("Invalid username or password");
            return done(null, false);
        }

        return done(null, user);    
    });
}
));



//serializing the user
passport.serializeUser(function(user, done){
    done(null, user.id);
})


//deserialzing the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user while deserializing --> passport");
        }
        return done(null, user);
    })
})


//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function("controller's action")
    if(req.isAuthenticated())
    {
        return next();
    }

    //if user is not signed in
    return res.redirect("/user/sign-in");
}


passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user coming from "deserializeUser" and we are sending this to locals for views.
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;