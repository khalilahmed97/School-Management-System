const express = require("express")
const { getCourse, getAllCourses, addCourse, deleteCourse, editCourse} = require("../controllers/Course")
const {verifyAdmin, verifyUser} = require("../utils/verifyToken.js")
const router = express.Router()

router.route("/allCourses", verifyAdmin).get(getAllCourses)
router.route("/addCourse", verifyAdmin).post(addCourse)
router.route("/delete/:id", verifyAdmin).delete(deleteCourse)
router.route("/edit/:id", verifyAdmin).patch(editCourse)
router.route("/:id", verifyUser).get(getCourse)



module.exports = router