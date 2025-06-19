import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from '../pages/login'
import Home from '../pages/home'
import Admin from '../pages/admin'




function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
