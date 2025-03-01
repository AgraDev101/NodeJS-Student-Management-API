import jwt from "jsonwebtoken";
import { User } from "../db/userSchema.js";

export const protect = async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if (token) {
        try {
            let decoded = jwt.verify(token, "secret123")
            req.user = await User.findOne({_id: decoded.id})
            next()
        } catch (error) {
            return res.status(401).json({
                message: "token not verified"
            })
        }
    } else {
        return res.status(401).json({message: "token not found"})
    }
}