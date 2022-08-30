module.exports.profile = function(req, res){
    res.render("test", {
        title: "test profile",
    })
}

module.exports.post = function(req, res){
    res.render("test", {
        title: "test post",
    })
}