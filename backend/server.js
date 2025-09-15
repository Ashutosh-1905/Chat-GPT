require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");
const http = require("http")
const initSocket = require("./src/sockets/socket.server");
const httpServer = http.createServer(app);


connectDB();

const port = process.env.PORT || 4000;

 initSocket(httpServer);

httpServer.listen(port, ()=>{
   
    console.log("Server is running on port : ", port);
} );