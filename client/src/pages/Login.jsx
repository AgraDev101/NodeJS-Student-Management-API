import { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router"

function Login() {
    let [ username, setUsername ] = useState("")
    let [ password, setPassword ] = useState("")

    let navigate = useNavigate()

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
            console.log(data.username, data.role, data.id)
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
            </div>
        </>
    )
}

export default Login