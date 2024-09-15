import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    mentorId : {
        type : "string",
        required : true
    },
    mentorName : {
        type : "string",
        required : true
    },
    course : {
        type : "string",
        required : true
    },
    batch : {
        type : "string",
        required : true
    },
    students : {
        type : "array",
        required : false
    }
});

const studentSchema = new mongoose.Schema({
    studentId : {
        type : "string",
        required : true
    },
    studentName : {
        type : "string",
        required : true
    },
    course : {
        type : "string",
        required : true
    },
    batch : {
        type : "string",
        required : true
    },
    currentMentor : {
        type : "array",
        required : false
    },
    historyOfMentors: {
        type : "array",
        required : false
    }
});

const mentorModel = new mongoose.model("mentor", mentorSchema, "mentors");

const studentModel = new mongoose.model("student", studentSchema, "students");

export default {mentorModel, studentModel};