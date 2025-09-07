const express = require('express')
const courseController = require('../contollers/course.controller')
let router = express.Router()

router.route('/')
        .get(userController.getAllCourses)
     

router.route('/:courseId')
        .get(userController.getCourseById)
        
router.route('/login')
        .post(userController.login)

module.exports = router