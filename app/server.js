var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var api_router = require("./routing/apiRoutes.js");
var html_router = require("./routing/htmlRoutes.js");

app.use(api_router);
app.use(html_router);

app.listen(PORT, function() {
  console.log("Server is up and running on  " + PORT);
});
