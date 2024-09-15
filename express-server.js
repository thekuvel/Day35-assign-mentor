import express from "express"
import mentorRouter from "./routes/mentorRouter.js";
import studentRouter from "./routes/studentRouter.js";
import mongoDBconnection from "./dbUtils/mongooseConnection.js";

await mongoDBconnection();

const server = express();

const port = 8000;

//To handle JSON data
server.use(express.json());

server.get("/", (req,res)=>{
    res.send("Express Backend Server");
})

// Using Express Router
server.use("/mentors", mentorRouter);
server.use("/students", studentRouter);


server.listen(port,(req,res)=>{
    console.log(Date().toString(), "Server running on port: ", port);
    
});