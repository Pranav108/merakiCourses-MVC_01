const fs = require("fs");

const getCoursesData = () => {
  const jsonDataArray = fs.readFileSync("courses.json", "utf-8");
  return JSON.parse(jsonDataArray); // return array
};

exports.getAllCourses = async (req, res) => {
  const jsonDataArray = getCoursesData();
  res.send({
    success: true,
    length: jsonDataArray.length,
    msg: "data fetched successfully",
    data: jsonDataArray,
  });
};

exports.addCourse = async (req, res) => {
  const jsonDataArray = getCoursesData();
  const newCourse = req.body;
  newCourse.id = (jsonDataArray.length + 1).toString();
  jsonDataArray.push(newCourse);
  fs.writeFileSync("courses.json", JSON.stringify(jsonDataArray));
  res.send({ success: true, msg: "course added successfully" });
};

exports.getCourses = async (req, res) => {
  const jsonDataArray = getCoursesData();
  const courseId = req.params.id;
  for (const obj of jsonDataArray)
    if (obj.id === courseId) {
      res.send({
        success: true,
        msg: "data fetched successfully",
        data: obj,
      });
      return;
    }

  res.send({
    success: true,
    msg: `course with id ${courseId} does not exist`,
    data: [],
  });
};
exports.updateCourse = async (req, res) => {
  const jsonDataArray = getCoursesData();
  const courseId = req.params.id;
  const updatedArray = jsonDataArray.map((el) => {
    if (el.id === courseId) {
      el = req.body;
      el.id = courseId;
    }
    return el;
  });
  fs.writeFileSync("courses.json", JSON.stringify(updatedArray));
  res.send({
    success: true,
    msg: `course with id ${courseId} updated successfully`,
    data: updatedArray,
  });
};
exports.deleteCourse = async (req, res) => {
  const jsonDataArray = getCoursesData();
  const courseId = req.params.id;
  jsonDataArray.forEach((el, index) => {
    if (el.id === courseId) {
      jsonDataArray.splice(index, 1);
      fs.writeFileSync("courses.json", JSON.stringify(jsonDataArray));
      res.send({
        success: true,
        msg: `course with id ${courseId} deleted successfully`,
        data: [],
      });
      return;
    }
  });
  res.send({
    success: true,
    msg: `course with id ${courseId} does not exist`,
    data: [],
  });
};
