import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginHeader from './component/login.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListKH from './component/listKH.jsx'
import AddKH from './component/addKH.jsx'
import TicketList from './component/ticketlist.jsx'
import UpdateKH from './component/updateKH.jsx'
import QrScanner from "./component/QrScanner";
import Checkout from './component/Checkuot.jsx'
import Home from './component/home.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginHeader />} />
        <Route path="/listKH" element={<ListKH />} />
        <Route path="/addKH" element={<AddKH />} />
        <Route path="/ticketlist" element={<TicketList />} />
        <Route path="/updateKH/:maKH" element={<UpdateKH />} />
        <Route path="/scan-qr" element={<QrScanner />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App
