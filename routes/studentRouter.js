import express from "express";

import models from "../dbUtils/models.js";

const studentModel = models.studentModel;

const studentRouter = express.Router();

studentRouter.get("/", async (req,res)=>{
	let students = await studentModel.find({});
	res.send(students);
});

studentRouter.get("/:studentId", async (req,res) => {
	let {body} = req;
	let {studentId} = req.params;

	let student = await studentModel.findOne({studentId:studentId});

	res.send(student.historyOfMentors);
})

studentRouter.post("/", async (req,res)=>{
	let body = req.body;
	
	try{

		let student = await new studentModel({
			...body
		})

		await student.save();

		res.send("Student created successfully.")
	}catch(err){
		console.log("Error msg:",err);
		res.send({msg : err})
	}

});

studentRouter.put("/:studentId", async (req,res) => {
	let {body}  = req;
	let {studentId} = req.params;

	let currentMentor = body.currentMentor;

	try{

		await studentModel.updateOne({studentId:studentId}, {$set: body});
		await studentModel.updateOne({studentId:studentId}, {$push:{historyOfMentors:currentMentor}});

		res.send("Mentor added successfully");

	}catch(err){
		console.log("Error msg: ",err);
		res.send({msg:err})
	}

});

export default studentRouter;