
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CompanyProfile.css";
import RedirectModal from "../pages/RedirectModal"; // 👈 import

export default function CompanyProfile() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 👈 new state
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
    }, 800); 
  };

  // ✅ Filter companies based on search term
  const filteredCompanies = companies.filter((c) => {
    const firstLang = c.properties ? Object.values(c.properties)[0] : {};
    return (
      firstLang?.company_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      c.company_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="register-container">
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* 🔍 Search Box */}
        <input
          type="text"
          placeholder="Search by Company Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

        {/* ➕ Register Button */}
        <Link to="/company-profile/new" className="create-company-link">
          ➕ Register Company
        </Link>
      </div>

      {/* Table of registered companies */}
      <main className="company-table-container">
        <h2>Active Company Profiles</h2>
        {loading ? (
          <p>Loading...</p>
        ) : filteredCompanies.length === 0 ? (
          <p>No matching companies found.</p>
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
              {filteredCompanies.map((c) => {
                const firstLang = c.properties
                  ? Object.values(c.properties)[0]
                  : {};

                return (
                  <tr key={c.company_id}>
                    <td className="company-id">{c.company_id}</td>
                    <td className="company-name">
                      {firstLang?.company_name || "-"}
                    </td>
                    <td className="owner">{firstLang?.owner_name || "-"}</td>
                    <td className="email">{c.email}</td>
                    <td className="mobile">{c.mobile}</td>
                    <td className="category">{c.category}</td>
                    <td className="subcategory">{c.subcategory}</td>
                    <td className="discount">{c.discount}%</td>

                    {/* ✅ Show contract download link if available */}
                    <td className="contract">
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

                    <td className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(c.company_id)}
                        title="Edit Company"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(c.company_id)}
                        title="Delete Company"
                      >
                        <FaTrash />
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
        onClose={() => {}} // disable manual close
      />
    </div>
  );
}

