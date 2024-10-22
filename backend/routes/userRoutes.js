const express = require("express");
const {
  signUp,
  signIn,
  logOut,
  userProfile,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlware/isAuth");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logOut);
router.get("/userprofile", isAuthenticated, userProfile);
router.get("/private", isAuthenticated);
// router.post("/forgot-password", forgotPassword)
// router.post("/reset-password", resetPassword)

module.exports = router;
