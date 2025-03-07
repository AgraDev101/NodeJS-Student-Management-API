import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./db/connectDB.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { router as userRoute } from "./routes/userRoute.js"
import { router as studentRoute } from "./routes/studentRoute.js"
import { router as teacherRoute } from "./routes/teacherRoute.js"

const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/v1", userRoute)
app.use("/students", studentRoute)
app.use("/teachers", teacherRoute)

const PORT = 5000

app.listen(PORT, () => console.log("server is running on port "+PORT))

// state management on the backend
// offload the authentication to frontend