var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var logger = require("morgan");

mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1:27017/newsscrapper", {
  useMongoClient: true
});

var app = express();
var PORT = process.env.PORT || 3000;


app.use(logger("dev"));
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("public"));
require("./controllers/htmlRoutes.js")(app);
require("./controllers/articleRoutes.js")(app);
require("./controllers/commentRoutes.js")(app);

app.listen(PORT, function(){

    console.log("App running on port " + PORT + "!");

})