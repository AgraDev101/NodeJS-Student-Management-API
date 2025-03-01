import { NavLink, useLocation, useNavigate } from "react-router"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import About from "../pages/Register"
import Login from "../pages/Login"
import Register from "../pages/Register"

function Header() {

    let location = useLocation()
    let navigate = useNavigate()

    let test = async () => {
        let res = await fetch("http://localhost:5000/v1/protected", {
            method: "GET",
            credentials: "include",
        })
        let data = await res.json()
        console.log(data)
    }

    let handleLogout = async () => {
        let res = await fetch("http://localhost:5000/v1/logout", {
            credentials: "include",
            method: "GET",
        })
        let data = await res.json()
        localStorage.clear()
        navigate("/")
        console.log(data)
    }

    let linkStyle = {
        fontWeight: "bold",
        textWrap: "none"
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
                <li style={location.pathname == "/" ? linkStyle : null}>
                    <NavLink to="/" element={<Home />}>Home Page</NavLink>
                </li>
                <li style={location.pathname == "/profile" ? linkStyle : null}>
                    <NavLink to="/profile" element={<Profile />}>Profile Page</NavLink>
                </li>
                <li style={location.pathname == "/login" ? linkStyle : null}>
                    <NavLink to="/login" element={<Login />}>Login Page</NavLink>
                </li>
                <li style={location.pathname == "/register" ? linkStyle : null}>
                    <NavLink to="/register" element={<Register />}>Register Page</NavLink>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
                <li>
                    <button onClick={test}>Test</button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header