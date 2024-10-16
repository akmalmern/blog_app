const mongoose = require("mongoose")


const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: [true, "foydalanuvchi ismini kiritishiz kerak"],
        maxlength: 32
    },
    email:{
        type:String,
        trim:true,
        required:[true, "E-mailingizni kiriting..."],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'bu email emas tekshirib koring'
        ]

    },
    password:{
        type:String,
        trim:true,
        required:[true,"parolingizni kiritishingiz kerak..."],
        
        match: [passwordRegex, 'Parol kamida bitta katta harf, bitta raqam va bitta maxsus belgi (@$!%*?&) bo\'lishi kerak.'],
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})


const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel