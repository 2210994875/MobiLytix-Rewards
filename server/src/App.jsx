import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RegisterCompany from "./pages/RegisterCompany";

import Sidebar from "./components/Sidebar";
 
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {isLoggedIn && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          {/* <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> */}
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/register" element={isLoggedIn ? <RegisterCompany /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}