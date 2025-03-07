import { NavLink, useNavigate } from "react-router"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Student from "../pages/Student"
import Teacher from "../pages/Teacher"

function Header() {

    let navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem("user")) || ""

    let handleLogout = async () => {
        await fetch("http://localhost:5000/v1/logout", {
            credentials: "include",
            method: "GET",
        })
        localStorage.clear()
        navigate("/")
    }

    let showStyle = {
        display: "block"
    }

    let hideStyle = {
        display: "none"
    }

    return (
        <>
        <div style={{
            maxWidth: "75%",
            margin: "15px auto"
        }} >
            <ul style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-between"
            }}>
                <li style={user ? showStyle : showStyle}>
                    <NavLink to="/" element={<Home />}>Home Page</NavLink>
                </li>
                <li style={(user.role == "teacher") || (!user) ? hideStyle : showStyle}>
                    <NavLink to="/student" element={<Student />}>Student Page</NavLink>
                </li>
                <li style={(user.role == "student") || (!user) ? hideStyle : showStyle}>
                    <NavLink to="/teacher" element={<Teacher />}>Teacher Page</NavLink>
                </li>
                <li style={user ? hideStyle : showStyle}>
                    <NavLink to="/login" element={<Login />}>Login Page</NavLink>
                </li>
                <li style={user ? hideStyle : showStyle}>
                    <NavLink to="/register" element={<Register />}>Register Page</NavLink>
                </li>
                <li className="mt-n2" style={(!user) ? hideStyle : showStyle}>
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header