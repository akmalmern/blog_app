const ErrorResponse = require("../utils/errorResponse");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

const signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("Bu email royxatdan otgan", 400));
  }
  if (!name || !email || !password) {
    return next(new ErrorResponse("maydonni toliq toldiring", 400));
  }
  if (password.length < 4) {
    return next(
      new ErrorResponse("Parol kamida 4 ta belgidan iborat bolish kk", 400)
    );
  }

  try {
    const user = await userModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "royxatdan otdingiz",
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Validatsiya xatoliklarini foydalanuvchiga aniq ko'rsatish
      next(
        new ErrorResponse(error.errors.password?.message || "Yaroqsiz ma'lumot")
      );
    }

    next(new ErrorResponse(error.message, 500));
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Maydonni to/'liq to/'ldiring", 400));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Bu odam tzimda yuq", 404));
    }

    // parolni tekshirish
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse("parol xato"), 401);
    }

    sendTokenResponse(user, 200, res);

    // const options = {
    //   maxAge: 60 * 60 * 1000,
    //   httpOnly: true,
    //   sameSite: "Strict",
    // };

    // res.status(200).cookie("token", token, options).json({
    //   success: true,
    //   message: "logindan o'tdi",
    //   id: user._id, // Foydalanuvchi ID'si
    //   role: user.role,

    // });
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, 500));
  }
};
const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  console.log("dddd" + token);
  const options = { maxAge: 60 * 60 * 1000, httpOnly: true };

  res.status(codeStatus).cookie("token", token, options).json({
    success: true,
    id: user._id,

    role: user.role,
    token,
  });
};

// app.get('/api/user/role', authenticateToken, (req, res) => {
//   const user = getUserById(req.user.id); // user ID dan rolni toping
//   res.json({ role: user.role });
// });

const userProfile = async (req, res, next) => {
  try {
    const userp = await userModel.findById(req.user.id).select("-password");
    if (!userp) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      userp,
    });
  } catch (error) {
    console.log(error.message);
    next(new ErrorResponse(error.message, 500));
  }
};

const logOut = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logout success",
  });
};
// forgot password------------------------------------------------------------------------

// OTP yaratish funksiyasi
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Forgot Password - OTP yuborish
// const forgotPassword =  async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'Foydalanuvchi topilmadi' });

//     const otp = generateOTP();
//     user.otp = otp;
//     user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutlik amal qilish muddati
//     await user.save();

//     // Nodemailer bilan OTP yuborish
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       to: user.email,
//       from: process.env.EMAIL_USER,
//       subject: 'Parolni yangilash uchun OTP',
//       text: `Sizning parolni yangilash kodingiz: ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (err, response) => {
//       if (err) {
//         console.error('Email yuborishda xato:', err);
//         return res.status(500).json({ error: 'Email yuborishda xato' });
//       }
//       res.json({ message: 'Parolni tiklash uchun OTP yuborildi. Iltimos, emailni tekshiring.' });
//     });
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ error: error.message });
//   }
// }

// // Parolni yangilash - OTP tasdiqlash va yangi parolni o'rnatish
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'Foydalanuvchi topilmadi' });

//     if (user.otp !== otp || user.otpExpire < Date.now()) {
//       return res.status(400).json({ error: 'Noto\'g\'ri yoki muddati o\'tgan OTP' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.otp = undefined;
//     user.otpExpire = undefined;
//     await user.save();

//     res.json({ message: 'Parol muvaffaqiyatli yangilandi' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

module.exports = { signUp, signIn, logOut, userProfile };
