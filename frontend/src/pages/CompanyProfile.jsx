// // src/pages/CompanyProfile.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./CompanyProfile.css";
// import RedirectModal from "../components/RedirectModal"; // 👈 import

// export default function CompanyProfile() {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//    const [redirecting, setRedirecting] = useState(false);
//   const [redirectId, setRedirectId] = useState(null);
//     const navigate = useNavigate();

//   // Fetch companies from backend
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const base = import.meta.env.VITE_API_URL || "";
//         const res = await fetch(`${base}/api/companies`);
//         if (!res.ok) throw new Error("Failed to fetch companies");
//         const data = await res.json();
//         setCompanies(data.data || []); // backend returns {data: [...]}
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   // 🔹 Move handleDelete inside component
//   const handleDelete = async (companyId) => {
//     if (
//       !window.confirm(
//         "⚠️ Do you really want to delete this company profile? This action cannot be undone."
//       )
      
//     ) {
//       return;
//     }

//     try {
//       const base = import.meta.env.VITE_API_URL || "";
//       const res = await fetch(`${base}/api/companies/${companyId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(`❌ Failed to delete: ${data.error || "Unknown error"}`);
//         return;
//       }

//       alert("✅ " + data.message);

//       // ✅ update UI
//       setCompanies((prev) => prev.filter((c) => c.company_id !== companyId));
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//       alert("❌ Failed to delete company: " + err.message);
//     }
//   };

//   return (
//     <div className="register-container">
//       {/* Top bar */}
//       <header
//         className="banner"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Link to="/company-profile/new" className="create-file-btn">
//           📂 Create a Company Profile
//         </Link>
//       </header>

//       {/* Table of registered companies */}
//       <main className="company-table-container">
//         <h2>Registered Companies</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : companies.length === 0 ? (
//           <p>No companies registered yet.</p>
//         ) : (
//           <table className="company-table">
//   <thead>
//     <tr>
//       <th>Company ID</th>
//       <th>Company Name</th>
//       <th>Owner</th>
//       <th>Email</th>
//       <th>Mobile</th>
//       <th>Category</th>
//       <th>Subcategory</th>
//       <th>Discount</th>
//       <th>Contract</th>
//       <th>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {companies.map((c) => {
//       // ✅ Extract first language block
//       const firstLang = c.properties ? Object.values(c.properties)[0] : {};

//       return (
//         <tr key={c.company_id}>
//           <td>{c.company_id}</td>
//           <td>{firstLang?.company_name || "-"}</td>
//           <td>{firstLang?.owner_name || "-"}</td>
//           <td>{c.email}</td>
//           <td>{c.mobile}</td>
//           <td>{c.category}</td>
//           <td>{c.subcategory}</td>
//           <td>{c.discount}%</td>

//           {/* ✅ Show contract download link if available */}
//           <td>
//             {c.upload_contract ? (
//               <a href={c.upload_contract} target="_blank" rel="noopener noreferrer">
//                 📎 Download
//               </a>
//             ) : (
//               "-"
//             )}
//           </td>

//           <td>
//              <Link to={`/company-profile/${c.company_id}/edit`} className="edit-btn">
//               ✏️
//             </Link>
//             <button
//               className="delete-btn"
//               onClick={() => handleDelete(c.company_id)}
//             >
//               🗑️
//             </button>
//           </td>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>

//         )}
//       </main>

//       <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
//     </div>
//   );
// }


// src/pages/CompanyProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CompanyProfile.css";
import RedirectModal from "../pages/RedirectModal"; // 👈 import

export default function CompanyProfile() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const navigate = useNavigate();

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${base}/api/companies`);
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data.data || []); // backend returns {data: [...]}
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Delete handler
  const handleDelete = async (companyId) => {
    if (
      !window.confirm(
        "⚠️ Do you really want to delete this company profile? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const base = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${base}/api/companies/${companyId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Failed to delete: ${data.error || "Unknown error"}`);
        return;
      }

      alert("✅ " + data.message);

      // ✅ update UI
      setCompanies((prev) => prev.filter((c) => c.company_id !== companyId));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Failed to delete company: " + err.message);
    }
  };

  // Edit handler → show popup first
  const handleEdit = (companyId) => {
    setRedirecting(true);
    setRedirectId(companyId);

    setTimeout(() => {
      navigate(`/company-profile/${companyId}/edit`);
    }, 800); // 2 sec delay
  };

  return (
    <div className="register-container">
      {/* Top bar */}
   <header className="banner">
  <div style={{ flex: 1 }}></div> {/* spacer */}
  <Link to="/company-profile/new" className="create-company-link">
    📂 Create a Company Profile
  </Link>
</header>

    
      {/* Table of registered companies */}
      <main className="company-table-container">
        <h2>Registered Companies</h2>
        {loading ? (
          <p>Loading...</p>
        ) : companies.length === 0 ? (
          <p>No companies registered yet.</p>
        ) : (
          <table className="company-table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Discount</th>
                <th>Contract</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => {
                const firstLang = c.properties
                  ? Object.values(c.properties)[0]
                  : {};

                return (
                  <tr key={c.company_id}>
                    <td>{c.company_id}</td>
                    <td>{firstLang?.company_name || "-"}</td>
                    <td>{firstLang?.owner_name || "-"}</td>
                    <td>{c.email}</td>
                    <td>{c.mobile}</td>
                    <td>{c.category}</td>
                    <td>{c.subcategory}</td>
                    <td>{c.discount}%</td>

                    {/* ✅ Show contract download link if available */}
                    <td>
                      {c.upload_contract ? (
                        <a
                          href={c.upload_contract}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📎 Download
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(c.company_id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c.company_id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>

      <footer className="footer">© 2025 Comviva. All rights reserved.</footer>

      {/* Redirecting Popup */}
     <RedirectModal
  open={redirecting}
  message={`Redirecting you to edit page for company ${redirectId}...`}
  onClose={() => {}}   // disable manual close
/>
    </div>
  );
}
