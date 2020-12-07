const EXPRESS = require("express");

const ROUTER = EXPRESS.Router();


ROUTER.get("/", function(req, res) {
//console.log("On the start page!")
    res.render("index");
});

module.exports = ROUTER;