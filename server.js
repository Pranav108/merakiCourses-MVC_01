const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/course.routes");

// create our express app
const app = express();
// middleware

app.use(morgan("dev"));

// route
app.use("/api/v1/courses/", routes);

//start server
app.listen(3001, () => {
  console.log("listening at port:3001");
});
