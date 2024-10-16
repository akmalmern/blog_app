const ErrorResponse = require("../utils/errorResponse")
const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const signUp = async (req,res,next) =>{
    const {email,password,name} = req.body;
    const userExist = await userModel.findOne({email})
    if(userExist){
        return next(new ErrorResponse("Bu email royxatdan otgan", 400))
    }
    if(!name || !email || !password){
        return next(new ErrorResponse("maydonni toliq toldiring", 400))
    }
    if(password.length < 5){
        return next(new ErrorResponse("kamida 6 ta belgidan iborat bolish kk", 400))
    }

    try {

        let salt = bcrypt.genSaltSync(10)
        const hashpassword = await bcrypt.hash(password,salt)


        const user = await userModel.create({
            name,
            email,
            password: hashpassword
        })
        res.status(201).json({
            success: true,
            message:"royxatdan otdingiz",
            user
        })
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

const signIn = async (req,res,next) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return 
        }
    } catch (error) {
        
    }
}


module.exports = signUp