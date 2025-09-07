const express = require('express')
const courseRouter = require('./routes/course.route')
const userRouter = require('./routes/user.route')
const connection = require('./database/connection')



const app = express()
app.use(express.json())

app.use('/api/courses',courseRouter)
app.use('/api/users',userRouter)
app.listen(3000,()=>{
    console.log('Listening on port 3000')
})