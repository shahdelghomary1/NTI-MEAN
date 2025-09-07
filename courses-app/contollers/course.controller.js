// let courses = require('../data/courses')

const courses = require('../models/course.model')
const {validationResult} = require('express-validator')


const getAllCourses = async(req,res)=>{
    try{
        let courses = await course.find( {} , {'__v':false})
        res.status(200).json(courses)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

const getCourseById = async (req,res)=>{
    let id = req.params.courseId;
    // let course = courses.find(c=> c.id === id)
    let course = await course.findById(id)
    if(!course) return res.status(404).json({error: 'Course not found'})
    res.status(200).json(course)
}


const addCourse = async(req,res)=>{
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()) return res.status(400).json({message: 'Bad Request', errors: errors.array()})

   let newCourse = new course(req.body)
   await newCourse.save() 
    
    res.status(201).json({message: 'Created Successfully'})
}


const updateCourse = as(req,res)=>{
    let id = +req.params.courseId;
    let updateCourse  = awit Course.findByIdAndUpdate(id,{$set:{...req.body}})
    let course = courses.find(c=> c.id === id)
    if(!course) return res.status(404).json({error: 'Course not found'})

    course = {...course, ...req.body}
    courses = courses.map(obj=> obj.id === id ? course : obj)
    res.status(200).json({message: 'Updated Successfully'})
}


const deleteCourse = as(req,res)=>{
    let id = req.params.courseId;

    courses = courses.filter(c=> c.id !== id)
    res.status(200).json({message: 'Deleted Successfully'})
}


module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}