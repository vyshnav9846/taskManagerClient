import { useState } from 'react'
// import login from './pages/login'


import './App.css'
import { Router,Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {


  return (
    <>
      <div className='App'>
      
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
           <Route path="/dashboard" element={<Dashboard />} />
          </Routes>

      



      </div>

    </>
  )
}

export default App
