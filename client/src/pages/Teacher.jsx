import { useEffect, useState } from "react"
import Header from "../components/Header"

function Teacher() {

    let [ fname, setFname] = useState("")
    let [ lname, setLname] = useState("")
    let [ course, setCourse] = useState("robotics")
    let [ details, setDetails] = useState({})

    console.log(details)

    let user = JSON.parse(localStorage.getItem("user")) ?? ""

    const handleTeacher = async () => {
        let res = await fetch("http://localhost:5000/teachers/teacher", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                course: course,
                id: user.id
            })
        })
        let data = await res.json()
        console.log(data)
    }

    const handleDetail = async () => {
        let res = await fetch(`http://localhost:5000/teachers/teacher/${user.id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        let data = await res.json()
        setDetails(data[0])
        console.log(data)
    }

    useEffect(() => {
        handleDetail()
    }, [])

    if (!user) {
        return (
            <>
                <Header />
                <h3>Not logged in</h3>
            </>
        )
    }

    return (
        <>
            <Header />
            <h1>Role: {user.role}</h1>
            <h1>Username: {user.username}</h1>
            <div style={{
                width: "60%",
                margin: "20px auto"
            }}>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">First Name</span>
                    <input onChange={(e) => setFname(e.target.value)} type="text" class="form-control" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Last Name</span>
                    <input onChange={(e) => setLname(e.target.value)} type="text" class="form-control" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <label for="exampleInputEmail1" class="form-label">Select course</label>
                <select onChange={(e) => setCourse(e.target.value)} class="form-select" aria-label="Default select example">
                    <option value="robotics">Robotics</option>
                    <option value="artificial intelligence">Artificial Intelligence</option>
                    <option value="data science">Data Science</option>
                </select>
                <br></br>
                <button onClick={handleTeacher} type="button" class="btn btn-primary">Register</button>
            </div>
            <div style={{
                width: "60%",
                margin: "20px auto"
            }}>
                <h3>Name: {details.firstName + " " + details.lastName}</h3>
                <h3>Teaching Course: {details.course}</h3>
            </div>
            </>
    )
}

export default Teacher