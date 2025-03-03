import express from "express"
import { Student } from "../db/userSchema.js"
import { protect } from "../util/protect.js"

const router = express.Router()

// CREATE
router.post("/student", protect, async (req, res) => {
    let { id, firstName, lastName, courses } = req.body
    try {
        let student = await Student.insertOne({_id: id, firstName, lastName, courses})
        res.json({message: "student created"})
    } catch (error) {
        console.log(error)
    }
})

// READ
router.get("/student/:id", protect, async (req, res) => {
    try {
        let student = await Student.find({ _id: req.params.id })
        res.json(student)
    } catch (error) {
        console.log(error)
    }
})

export { router }