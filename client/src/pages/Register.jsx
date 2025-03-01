import { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router"

function Register() {

    let [ username, setUsername ] = useState("")
    let [ password, setPassword ] = useState("")
    let [ role, setRole ] = useState("student")

    let navigate = useNavigate()

    let handleRegister = async () => {
        try {
            let res = await fetch("http://localhost:5000/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                    role
                })
            })
            let data = await res.json()
            console.log(data)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <h1>Register Page</h1>
            <div style={{
                width: "50%",
                margin: "20px auto"
            }}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <label for="exampleInputEmail1" class="form-label">Register as</label>
                <select onChange={(e) => setRole(e.target.value)} class="form-select" aria-label="Default select example">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <br></br>
                <button onClick={handleRegister} type="button" class="btn btn-primary">Register</button>
            </div>
        </>
    )
}

export default Register