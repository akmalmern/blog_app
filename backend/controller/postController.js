const postModel = require("../model/postModel");
const ErrorResponse = require("../utils/errorResponse");
const fs = require('fs');
const path = require("path")

const addPost = async (req, res, next) => {
    try {
        const { title, content, image, postedBy } = req.body;
        const post = await postModel.create({
            title,
            content,
            postedBy: req.user._id,
            image: req.file ? req.file.path : null,
        })
        res.status(201).json({
            success: true,
            message: "blog qoshildi",
            post
        })
    } catch (error) {
        next(new ErrorResponse(error.message, 500))
        console.log(error.message)
    }
}

const getPost = async (req,res,next)=>{
    try {
        const posts = await postModel.find()
        .sort({ createdAt: -1 })
        .populate('postedBy', 'name');
        if(!posts){
            return next(new ErrorResponse("postlar topilmadi", 404))
        }
        res.status(200).send({
            success: true,
            message:"posts success",
            total_post: posts.length + " " + "ta",
            posts
        })
    } catch (error) {
        console.log(error.message)
        next(new ErrorResponse(error.message, 500))
    }
}

// const updatePost = async (req,res,next)=>{

//     try {
//         const blog = await postModel.findById(req.params.id)
//         if(!blog){
//             return next(new ErrorResponse("Blog topilmadi", 404))
//         }
//         // eski rasmni o'chirish
//         if(req.file && blog.image){
//             const imagePath = path.resolve(blog.image);
//                             fs.unlink(imagePath, (err) => {
//                                 if (err) {
//                                     next(new ErrorResponse(err.message, 401))
                                    
//                                 } 
//                             });
           
//         }
//         blog.title = req.body.title || blog.title;
//         blog.content = req.body.content || blog.content;
//         blog.image = req.file ? req.file.path : blog.image;

//         await blog.save()
//         res.status(200).json({
//             success: true,
//             message:"blog ozgardi",
//             blog
//         })
        
//     } catch (error) {
//         console.log(error.message)
//         next(new ErrorResponse(error.message, 500))
        
//     }
// }
const updatePost = async (req,res,next)=>{
  
    try {
      
        const updateData = {
            title: req.body.title,
            content: req.body.content,
        };

        // Agar yangi rasm yuklangan bo'lsa, eski rasmni o'chiramiz va yangi rasmni updateData ga qo'shamiz
        if (req.file) {
            const blog = await postModel.findById(req.params.id);
            if (blog && blog.image) {
                fs.unlinkSync(blog.image); // Eski rasmni o'chirish
            }
            updateData.image = req.file.path; // Yangi rasmni qo'shish
        }

   

        const updatedBlog = await postModel.findByIdAndUpdate(req.params.id, updateData, {
            new: true, // Yangilangan hujjatni qaytarish
            runValidators: true // Validatsiyani ishga tushirish
        });

        
        if (!updatedBlog) {
            return next(new ErrorResponse("Blog topilmadi", 404))
        }
        res.status(200).json({
            success: true,
            message:"blog ozgartirildi",
            newBlog: updatedBlog
        })
    } catch (error) {
        console.log(error.message)
        next(new ErrorResponse(error.message, 500));
    }

    }
// Blogni o'chirish (Delete)
const deletBlog =  async (req, res, next) => {
    try {
        const del_blog = await postModel.findByIdAndDelete(req.params.id);

        if (!del_blog){
            return next(new ErrorResponse("Blog topilmadi", 404))
        } 

        // Rasmni o'chirish
        if (del_blog.image) {
            fs.unlinkSync(del_blog.image)
        }

        res.status(200).json({
            success: true,
            message:"Blog o\'chirildi"
        })
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}


module.exports = { addPost,getPost ,updatePost, deletBlog}