import express from "express"
import models from "../dbUtils/models.js";

const mentorModel = models.mentorModel;

const mentorRouter = express.Router();

mentorRouter.get("/", async (req,res)=>{

    try{
        let mentors = await mentorModel.find({});
        res.send(mentors)
    }catch(err){
        console.log("Error msg:", err);
        res.send("Error")
    }

});

mentorRouter.get("/:mentorId", async (req,res)=>{

    let {mentorId} = req.params;

    let mentor = await mentorModel.findOne({mentorId:mentorId});
    
    res.send({students : mentor.students});
   

});

mentorRouter.post("/", async (req,res) => {
    let body = req.body;
    
    try{

        let newMentor = await new mentorModel({
            ...body,
            date : Date.now().toString()
        });

        await newMentor.save();

        res.send({msg : "New mentor created successfully."})

    }catch(err){
        console.log("Error Message: ", err);
        
        res.send({message: err})
    }
})

mentorRouter.put("/:mentorId", async (req,res) => {
    let body = req.body;
    let {mentorId} = req.params;
    
    try {

        // await mentorModel.updateOne({mentorId : mentorId},{$set: body});
        await mentorModel.updateOne({mentorId : mentorId},{$push: {students : body.student}});
        res.send("Studet added to mentor successfully.")
        
    } catch (error) {
        console.log(error);
        res.send({msg : `Error: ${err}`});
        
    }
})

export default mentorRouter