import express from "express"
import { Teacher, Student } from "../db/userSchema.js"
import { protect } from "../util/protect.js"
import { checkRole } from "../util/checkRole.js"

const router = express.Router()

// CREATE
router.post("/teacher", protect, async (req, res) => {
    let { id, firstName, lastName, course } = req.body
    try {
        await Teacher.insertOne({_id: id, firstName, lastName, course})
        return res.json({message: "teacher created"})
    } catch (error) {
        console.log(error)
    }
})

// READ
router.get("/teacher/:id", protect, checkRole(["teacher"]), async (req, res) => {
    try {
        let teacher = await Teacher.find({ _id: req.params.id })
        return res.json(teacher)
    } catch (error) {
        console.log(error)
    }
})

// DELETE
router.delete("/teacher/:id", protect, checkRole(["teacher"]), async (req, res) => {
    try {
        let teacher = await Teacher.findOneAndDelete({ _id: req.params.id })
        return res.json({ message: "profile deleted" })
    } catch (error) {
        console.log(error)
    }
})

// GET
router.get("/teacher", protect, checkRole(["teacher"]), async (req, res) => {
    try {
        let students = await Student.find({
            courses: {
                $elemMatch: {
                    $eq: req.query.course
                }
            }
        }, {
            _id: 0,
            firstName: 1,
            lastName: 1
        })
        console.log(students)
        return res.json({ data: students })
    } catch (error) {
        console.log(error)
    }
})


export { router }