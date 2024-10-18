const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;


const postSchema = new mongoose.Schema({

    title: {
        type:String,
        required: [true, "title ni kiriting"]
    },
    content: {
        type: String,
        required: [true, "contentni kiriting"]
    },
    postedBy: {
        type: ObjectId,
        ref: "userModel"
    },
    image:{
        type: String,
    },
    likes: [{type: ObjectId, ref: "userModel"}],
    comments:[
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy:{
                type: ObjectId,
                ref: "userModel"
            },
        },
    ],

},{timestamps:true})

module.exports = mongoose.model("postModel", postSchema)