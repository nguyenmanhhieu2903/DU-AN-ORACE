import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/header.jsx'
import LoginHeader from './component/login.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListKH from './component/listKH.jsx'
import AddKH from './component/addKH.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<LoginHeader />} />
        <Route path="/listKH" element={<ListKH />} />
        <Route path="/addKH" element={<AddKH />} />
      </Routes>
    </Router>
  );
}

export default App
