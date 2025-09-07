const express = require('express')
const courseController = require('../contollers/course.controller')
const validation = require('../middlewares/validation')

let router = express.Router()

router.route('/')
        .get(courseController.getAllCourses)
        .post(validation ,courseController.addCourse)

router.route('/:courseId')
        .get(courseController.getCourseById)
        .patch(courseController.updateCourse)
        .delete(courseController.deleteCourse)


module.exports = router