const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const DB = require("./db/db")
const path = require("path")
// routes
const userRouter = require("./routes/userRoutes")
const blogRouter = require("./routes/postRoutes")

const errorHandler = require("./middlware/error")

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
DB()   //mongodb
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    credentials: true // Cookie-larni qo'llab-quvvatlash
}))
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use("/", userRouter);
app.use("/", blogRouter);

// 
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`${port}-portda ishladi`)
})






