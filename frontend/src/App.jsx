
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CompanyProfile from "./pages/CompanyProfile";   
import CompanyProfileForm from "./pages/CompanyProfileForm";  // ✅ import the form
import Sidebar from "./components/Sidebar";
import LanguageSettings from "./pages/LanguageSettings";
import "@fortawesome/fontawesome-free/css/all.min.css";





export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {isLoggedIn && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          {/* Login */}
          {/* <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> */}

          {/* Dashboard */}
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Company Profile list */}
          <Route
            path="/company-profile"
            element={isLoggedIn ? <CompanyProfile /> : <Navigate to="/login" />}
          />

          {/* Create Company Profile */}
          <Route
            path="/company-profile/new"
            element={isLoggedIn ? <CompanyProfileForm /> : <Navigate to="/login" />}
          />

          {/* Edit Company Profile */}
          <Route
            path="/company-profile/:id/edit"
            element={isLoggedIn ? <CompanyProfileForm /> : <Navigate to="/login" />}
          />
          <Route
  path="/language"
  element={isLoggedIn ? <LanguageSettings /> : <Navigate to="/login" />}
/>
 {/* Existing Languages list */}
          {/* <Route
            path="/language/existing"
            element={isLoggedIn ? <ExistingLanguages /> : <Navigate to="/login" />}
          /> */}
          

        </Routes>
        
      </div>
    </div>
  );
}
