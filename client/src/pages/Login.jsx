import { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router"

function Login() {
    let [ username, setUsername ] = useState("")
    let [ password, setPassword ] = useState("")
    let [ email, setEmail ] = useState("")

    let navigate = useNavigate()

    let handleForgotPassword = async () => {
        try {
            let res = await fetch("http://localhost:5000/v1/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email
                })
            })
            let data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    let handleLogin = async () => {
        try {
            let res = await fetch("http://localhost:5000/v1/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            let data = await res.json()
            localStorage.setItem("user", JSON.stringify({
                username: data.username,
                role: data.role,
                id: data.id
            }))
            if (data.role == "student") {
                navigate("/student")
            } else if (data.role == "teacher") {
                navigate("/teacher")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <h1>Login Page</h1>
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
                <button onClick={handleLogin} type="button" class="btn btn-primary">Login</button>
                <button style={{
                            marginLeft: "10px"
                        }} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Forgot Password
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Username</span>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Email</span>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleForgotPassword} type="button" class="btn btn-primary">Send Forgot Password Link</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Login