// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import CompanyProfile from "./pages/CompanyProfile";   // ✅ renamed import

// import Sidebar from "./components/Sidebar";
 
// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
 
//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {isLoggedIn && <Sidebar />}
//       <div style={{ flex: 1, padding: "20px" }}>
//         <Routes>
//           {/* <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> */}
//           <Route
//             path="/"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/company-profile"   // ✅ updated route path
//             element={isLoggedIn ? <CompanyProfile /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CompanyProfile from "./pages/CompanyProfile";   
import CompanyProfileForm from "./pages/CompanyProfileForm";  // ✅ import the form
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {isLoggedIn && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          {/* <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> */}
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/company-profile"
            element={isLoggedIn ? <CompanyProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/company-profile/new"
            element={isLoggedIn ? <CompanyProfileForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}
