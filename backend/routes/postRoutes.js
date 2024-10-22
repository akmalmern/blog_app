const express = require("express");
const router = express.Router();
const upload = require("../middlware/upload");
const {
  addPost,
  getPost,
  updatePost,
  deletPost,
  singlePost,
  addComment,
  addLike,
  removeLike,
} = require("../controller/postController");
const { isAuthenticated } = require("../middlware/isAuth");

router.post("/addpost", isAuthenticated, upload.single("image"), addPost);
router.get("/posts", getPost);
router.get("/singlepost/:id", singlePost);
router.put("/update/:id",isAuthenticated, upload.single("image"), updatePost);
router.put("/comment/post/:id", isAuthenticated, addComment);
router.put("/like/post/:id", isAuthenticated, addLike);
router.put("/like/post/delete/:id", isAuthenticated, removeLike);
router.delete(
  "/delete/:id",

  isAuthenticated,
  deletPost
);

module.exports = router;
