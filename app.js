var express = require("express");
var path = require("path");


var routes = require("./routes");

var app = express();


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "public/views"));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Server Started on port " + app.get("port"));
});


