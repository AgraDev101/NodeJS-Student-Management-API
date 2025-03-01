import { useEffect, useState } from "react"
import Header from "../components/Header"

function Home() {

    // let [ usersList, setUsersList ] = useState([])
    // let [ postPerPage, setPostPerPage ] = useState(0)
    // let [ totalPosts, setTotalPosts ] = useState(12)
    // let [ page, setPage ] = useState(1);

    // let getData = async (page) => {
    //     let res = await fetch(`http://localhost:5000/v1/paginate?page=${page}`)
    //     let data = await res.json()
    //     setUsersList(data.allUsers)
    //     setTotalPosts(data.totalPosts)
    //     setPostPerPage(data.limit)
    // }

    // let pages = []

    // for (let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++) {
    //     pages.push(i)
    // }

    // const handlePageChange = (x) => {
    //     setPage(x)
    //     getData(x)
    // }

    // useEffect(() => {
    //     getData(page)
    // }, [])

    return (
        <>
            <Header />
            <h1>Home Page</h1>
            {/* <h1>Home Page</h1>
            {
                usersList.map((x) => {
                    return (
                        <div>
                            <p>{x.username}</p>
                        </div>
                    )
                })
            }   
            <nav aria-label="Page navigation example">
                <ul class="pagination">
            {
                pages.map((page) => {
                    return (
                        <li
                        onClick={() => handlePageChange(page)}
                        class="page-item">
                            <a class="page-link" href="#">
                                {page}
                            </a>
                        </li>
                    )
                })
            }
                </ul>
            </nav> */}
        </>
    )
}

export default Home