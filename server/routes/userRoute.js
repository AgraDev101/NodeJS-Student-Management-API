import express from "express"
import bcrypt from "bcrypt"
import { User } from "../db/userSchema.js"
import { protect } from "../util/protect.js"
import { generateToken } from "../util/genToken.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        let { username, password, role } = req.body
        const user = await User.findOne({username: username})
        if (user) {
            return res.json({message: "user already exist"})
        }
        let hashedPassword = await bcrypt.hash(password, 4)
        await User.insertOne({
            username,
            password: hashedPassword,
            role
        });
        return res.json({
            message: "user successfully created"
        })  
    } catch (error) {
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    let { username, password } = req.body
    try {
        let user = await User.findOne({ username })
        if (!user) {
            res.json({ message: "user not found" })
        }
        let matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            res.json({ message: "password incorrect" })
        }
        let token = generateToken(user._id)
        res.status(201).cookie("jwt", token, {
            httpOnly: true
        }).json({
            message: "logged in",
            username: user.username,
            role: user.role,
            id: user._id
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout", (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    }).json({ message: "logged out" })
})

router.get("/profile", protect, (req, res) => {
    console.log(req.cookies.jwt)
    return res.json({message: "you are logged in"})
})

export { router }

// student management API
// CR student API,
// CRU teacher,
// ROLE BASED ACCESS, 
