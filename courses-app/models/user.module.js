const mongoose = require('mongoose');   
// const validation = require('../middlewares/validation');
const {isEmail} = require('validator');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        nim: 3,

    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validation: [ isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModelf