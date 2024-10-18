const express = require("express")
const router = express.Router()
const upload = require("../middlware/upload")
const { addPost, getPost, updatePost, deletBlog } = require("../controller/postController")
const { isAuthenticated } = require("../middlware/isAuth")


router.post("/addpost",isAuthenticated, upload.single("image"), addPost)
router.get("/posts",isAuthenticated, getPost)
router.put("/update/:id",upload.single('image'), updatePost)
router.delete("/delete/:id",upload.single('image'), deletBlog)


module.exports = router
