import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from '../pages/login'
import Home from '../pages/home'
import Admin from '../pages/admin'
import Data from '../pages/Data'




function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/data" element={<Data />} />

      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
