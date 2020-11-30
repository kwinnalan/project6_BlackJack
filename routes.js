var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
//console.log("On the start page!")
    res.render("index");
});
router.get("/play", function (req, res){
    res.render("play");
})
module.exports = router;