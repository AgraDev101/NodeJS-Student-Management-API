import express from "express"
import bcrypt from "bcrypt"
import { User } from "../db/userSchema.js"
import { protect } from "../util/protect.js"
import { generateToken } from "../util/genToken.js"
import jwt from "jsonwebtoken";
import { sendMail } from "../util/sendMail.js"

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
        return res.status(201).cookie("jwt", token, {
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

router.post("/update", protect, async (req, res) => {
    let { password } = req.body
    try {
        let hashedPassword = await bcrypt.hash(password, 4)
        let getUser = await User.findOne({ _id: req.user.id})

        getUser.password = hashedPassword

        getUser.save()

        return res.json({ message: "password updated" })
    } catch (error) {
        console.log(error)
    }
})

router.post("/forgot", async (req, res) => {
    try {
        let { username, email } = req.body
        const user = await User.findOne({username: username})
        if (!user) {
            return res.json({message: "user not present"})
        }
        let token = jwt.sign({ username }, "secret123", {
            expiresIn: "1h"
        })
        sendMail(
            email,
            "Password reset email",
            `http://localhost:5000/v1/reset/${token}`
        )

        return res.json({
            message: "Link sent"
        })  
    } catch (error) {
        console.log(error)
    }
})

router.post("/reset", async (req, res) => {
    try {
        let token = req.body.token
        let password = req.body.password
        let decode = jwt.verify(token, "secret123")
        let getUser = await User.findOne({ username: decode.username })

        let hashedPassword = await bcrypt.hash(password, 4)

        getUser.password = hashedPassword

        getUser.save()

        return res.json({ message: "password updated" })

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

router.get("/test", protect, (req, res) => {
    console.log(req.cookies.jwt)
    return res.json({message: "you are logged in"})
})

export { router }

// API user is present in database or not
// send token, include username, email
// second API, verify token, updated password, fetch user from database
// update password
