const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/course.routes");

// create our express app
const app = express();
// middleware
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(morgan("dev"));

// route
app.use("/api/v1/courses/", routes);

//start server
app.listen(3001, () => {
  console.log("listening at port:3001");
});
