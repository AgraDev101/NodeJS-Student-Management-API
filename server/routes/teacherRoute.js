import express from "express"
import { Teacher } from "../db/userSchema.js"
import { protect } from "../util/protect.js"

const router = express.Router()

// CREATE
router.post("/teacher", protect, async (req, res) => {
    let { id, firstName, lastName, course } = req.body
    try {
        let teacher = await Teacher.insertOne({_id: id, firstName, lastName, course})
        res.json({message: "teacher created"})
    } catch (error) {
        console.log(error)
    }
})

export { router }