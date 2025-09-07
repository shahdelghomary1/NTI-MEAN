const user = require('../models/user.model')
const bcrypt = require('bcryptjs')
const getAllUsers = async(req,res)=>{
    try{
        let users = await user.find( )
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
const registerUser = async(req,res)=>{
    const {firstName,lastName,email,password} = req.body
    const user = await User.findOne({email : email})
    if(user) return res.status(400).json({error: 'User already exists'})
  
    const hashedpasword = bcrypt.hashSync(password , 10)
    const newUser = await User.create({firstName,lastName,email,password:hashedpasword})
      const token =await jwt .sign({email},process.env.JWT_SECRET,{expiresIn: '1d'})
    res.status(201).json({message: 'Created Successfully' , data: newUser})
}
const login = async(req,res)=>{
    const {email,password} = req.body
    let user = await User.findOne({email : email})
    const comparepassword = await bcrypt.compare(password , user.password)
    if( user && comparepassword){
        res.status(200).json({message: 'Login Successfully' , data: user})
    }else{
        res.status(400).json({error: 'Invalid Credentials'})
    }
    
}
module.exports = {
    getAllUsers,
    registerUser,
    login
}