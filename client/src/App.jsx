import './App.css'
import { Route, Routes} from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Student from './pages/Student'
import Teacher from './pages/Teacher'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/student' element={<Student />}></Route>
      <Route path='/teacher' element={<Teacher />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  )
}

export default App
