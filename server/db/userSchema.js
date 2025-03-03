import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const studentSchema = new Schema({
    _id: {
        type: "ObjectId", ref: "User" 
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    courses: [{type: String }]
})

const teacherSchema = new Schema({
    _id: {
        type: "ObjectId", ref: "User" 
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)
const Student = mongoose.model("Student", studentSchema)
const Teacher = mongoose.model("Teacher", teacherSchema)

export { User, Student, Teacher }