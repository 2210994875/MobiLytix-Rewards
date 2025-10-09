
// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import CompanyProfile from "./pages/CompanyProfile";   
// import CompanyProfileForm from "./pages/CompanyProfileForm";  // ✅ import the form
// import Sidebar from "./components/Sidebar";
// import LanguageSettings from "./pages/LanguageSettings";


// import "@fortawesome/fontawesome-free/css/all.min.css";






// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {isLoggedIn && <Sidebar />}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <Routes>
//           {/* Login */}
//           {/* <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> */}

//           {/* Dashboard */}
//           <Route
//             path="/"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />

//           {/* Company Profile list */}
//           <Route
//             path="/company-profile"
//             element={isLoggedIn ? <CompanyProfile /> : <Navigate to="/login" />}
//           />

//           {/* Create Company Profile */}
//           <Route
//             path="/company-profile/new"
//             element={isLoggedIn ? <CompanyProfileForm /> : <Navigate to="/login" />}
//           />

//           {/* Edit Company Profile */}
//           <Route
//             path="/company-profile/:id/edit"
//             element={isLoggedIn ? <CompanyProfileForm /> : <Navigate to="/login" />}
//           />
//           <Route
//   path="/language"
//   element={isLoggedIn ? <LanguageSettings /> : <Navigate to="/login" />}
// />
//  {/* Existing Languages list */}
//           {/* <Route
//             path="/language/existing"
//             element={isLoggedIn ? <ExistingLanguages /> : <Navigate to="/login" />}
//           /> */}

//         </Routes>
        
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyProfileForm from "./pages/CompanyProfileForm";
import LanguageSettings from "./pages/LanguageSettings";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-layout" style={{ display: "flex" }}>
      {/* Sidebar (left-fixed) */}
      <Sidebar />

      {/* Main content area */}
      <div className="main-area" style={{ flex: 1, position: "relative" }}>
        {/* Fixed header at top */}
        <Header />

        {/* Routed content below header */}
        <div
          className="page-content"
          style={{
            marginTop: "70px", // offset header height
            padding: "30px 40px",
            background: "#f8fafc",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/company-profile/new" element={<CompanyProfileForm />} />
            <Route path="/company-profile/:id/edit" element={<CompanyProfileForm />} />
            <Route path="/language" element={<LanguageSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
