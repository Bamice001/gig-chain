import { Route, Routes } from 'react-router'
import './App.css'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
