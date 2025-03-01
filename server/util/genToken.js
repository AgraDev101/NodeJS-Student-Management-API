import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, "secret123", {
        expiresIn: "2d"
    })
}

const verifyToken = (token) => {
    jwt.verify(token, "secret123")
}

export { generateToken, verifyToken }