const User = require("../models/user");

module.exports.profile = function(req, res){
    return res.render("user",{
        title: "user Profile",
    })
}

module.exports.post = function(req, res){
    return res.render("user",{
        title: "user Post",
    })
}


module.exports.signUp = function(req, res){
    return res.render("sign-up",{
        title: "Sign Up",
    })
}

module.exports.signIn = function(req, res){
    return res.render("sign-in",{
        title: "Sign In",
    })
}

//collecting new users data/sign up data
module.exports.create = function(req, res){
    
        if(req.body.password != req.body.cnf_password)
        {
            console.log("Password and confirm password does not match");
            return res.redirect("back");
        }

        User.findOne({email: req.body.email}, function(err, user){
            // if(err){
            //     console.log("Error in finding the user in database");
            //     return;
            // }

            if(!user)
            {
                User.create(req.body, function(err, user){
                    if(err)
                    {
                        console.log("Error in creating the user : ",err);
                        return;
                    }
                    console.log("--------USER CREATED----------");
                    return res.redirect("/user/sign-in");
                })
            }
            else{
                console.log("User already exist");
                return res.redirect("back");
            }
        })
}

//sign in and create the session
module.exports.createSession = function(req, res)
{
    req.flash("success", "Logged In");
        return res.redirect("/");
}



//signing out
module.exports.destroySession = function(req, res)
{   
    req.logout(function(err){
        if(err){console.log("error in logging out")};
        req.flash("success", "Logged Out");
        return res.redirect("/");

    });
}