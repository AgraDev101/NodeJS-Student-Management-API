import './App.css'
import { Route, Routes} from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  )
}

export default App
