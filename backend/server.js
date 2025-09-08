require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log("Server is running on port : ", port);
} );