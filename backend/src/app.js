const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const ChatRoutes = require("./routes/chat.routes");
const app = express();


app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/chat", ChatRoutes);

module.exports = app;