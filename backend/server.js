const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DB = require("./db/db");
const path = require("path");
// routes
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/postRoutes");
// *************************************************
//adding socket.io configuration
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// **************************************************
const errorHandler = require("./middlware/error");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
DB(); //mongodb
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend domenini kiriting

    credentials: true, // Cookie-larni qo'llab-quvvatlash
  })
);
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/", userRouter);
app.use("/", blogRouter);

//
app.use(errorHandler);
// ***************************************
io.on("connection", (socket) => {
  //console.log('a user connected', socket.id);
  socket.on("comment", (msg) => {
    // console.log('new comment received', msg);
    io.emit("new-comment", msg);
  });
});

exports.io = io;

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`${port}-portda ishladi`);
});
