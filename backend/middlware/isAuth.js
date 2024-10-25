const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorResponse("Login dan o'tishingiz kerak 00", 401));
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorResponse("Logindan o'tishingiz kerak 09212", 401));
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "user") {
    return next(new ErrorResponse("Siz admin emassiz", 401));
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
