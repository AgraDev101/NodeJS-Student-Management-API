import express from "express"
import multer from "multer"
import path from "path"
import { Student } from "../db/userSchema.js"
import { protect } from "../util/protect.js"
import { checkRole } from "../util/checkRole.js"
import { __dirname } from "../index.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}.jpg`)
    }
})

const router = express.Router()

const upload = multer({storage}).single("file")

// find the user in the database
// save the filename

// 2nd API we are going
// check the database
// fetch the filename
// res.sendFile

router.post("/student/image/:id", protect, upload, async (req, res) => {
    try {
        await Student.findOneAndUpdate({ _id: req.params.id }, {
            imageFileName: req.file.filename
        })
        return res.json({ data: req.file.originalname })
    } catch (error) {
        console.log(error)   
    }
})

router.get("/student/image/:id", protect, async (req, res) => {
    try {
        let student = await Student.findOne({ _id: req.params.id })
        let filename = student.imageFileName
        let file = path.join(__dirname, "uploads", filename)
        return res.sendFile(file)
    } catch (error) {
        console.log(error)
    }
})

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

// UPDATE
router.patch("/student/:id", protect, checkRole(["student"]), async (req, res) => {
    try {
        await Student.findOneAndUpdate({ _id: req.params.id }, {
            $push: {
                courses: req.body.course
            }
        })
        return res.json({message: "updated"})
    } catch (error) {
        console.log(error)
    }
})

export { router }