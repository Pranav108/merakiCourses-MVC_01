const express = require("express");
const courseController = require("../controller/courseController");

const router = express.Router();
router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.addCourse);
router
  .route("/:id")
  .get(courseController.getCourses)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);
module.exports = router;
