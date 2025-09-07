const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
   title: {
       type: String,
       required: true,
       min: 3
   },
   prise : {
       type: Number,
       required: true
   }
})

const CourseModel = mongoose.model('Course', courseSchema)
module.exports = CourseModel