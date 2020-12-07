const EXPRESS = require("express");
const PATH = require("path");


const ROUTES = require("./routes");

const APP = EXPRESS();


APP.set("port", process.env.PORT || 3000);
APP.set("views", PATH.join(__dirname, "public/views"));
APP.use('/public', EXPRESS.static(PATH.join(__dirname, 'public')));
APP.set("view engine", "ejs");

APP.use(ROUTES);

APP.listen(APP.get("port"), function(){
    console.log("Server Started on port " + APP.get("port"));
});