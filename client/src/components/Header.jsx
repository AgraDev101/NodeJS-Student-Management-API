import { NavLink, useLocation, useNavigate } from "react-router"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Student from "../pages/Student"
import Teacher from "../pages/Teacher"

function Header() {

    let navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem("user")) ?? ""

    if (user) {

    }

    let handleLogout = async () => {
        let res = await fetch("http://localhost:5000/v1/logout", {
            credentials: "include",
            method: "GET",
        })
        let data = await res.json()
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
                <li style={user.role == "teacher" ? hideStyle : showStyle}>
                    <NavLink to="/student" element={<Student />}>Student Page</NavLink>
                </li>
                <li style={user.role == "student" ? hideStyle : showStyle}>
                    <NavLink to="/teacher" element={<Teacher />}>Teacher Page</NavLink>
                </li>
                <li style={user ? hideStyle : showStyle}>
                    <NavLink to="/login" element={<Login />}>Login Page</NavLink>
                </li>
                <li style={user ? hideStyle : showStyle}>
                    <NavLink to="/register" element={<Register />}>Register Page</NavLink>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header