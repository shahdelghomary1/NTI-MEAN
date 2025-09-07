const mongoose = require('mongoose');
const connection =()=>{
    return mongoose.connect("mongodb://localhost:27017/courses-app").then(()=>{
        console.log("Database connected");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connection;