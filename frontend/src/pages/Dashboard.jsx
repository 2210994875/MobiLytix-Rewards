import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaBuilding, FaLanguage } from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeCompanies: 0,
    totalLanguages: 0,
  });

  // 🧠 Fetch data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/stats");
        const data = await res.json();
        setStats({
          activeCompanies: data.activeCompanies || 0,
          totalLanguages: data.totalLanguages || 0,
        });
      } catch (err) {
        console.error("❌ Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  // 📘 Download Documentation
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/website-documentation.pdf";
    link.download = "website-documentation.pdf";
    link.click();
  };

  return (
    <div className="dashboard-container">
      {/* Info button */}
      <button
        className="info-btn"
        onClick={handleDownload}
        title="Download Website Documentation"
      >
        i
      </button>

      <div className="dashboard-header">
        <h1>Welcome to Dashboard</h1>
        <p className="dashboard-subtitle">
          Empowering businesses through insight and innovation.
        </p>
      </div>

      {/* Stats section */}
      <div className="stats-grid">
        <div className="stat-card gradient-blue">
          <FaBuilding className="stat-icon" />
          <h2>{stats.activeCompanies}</h2>
          <p>Active Companies</p>
        </div>

        <div className="stat-card gradient-green">
          <FaLanguage className="stat-icon" />
          <h2>{stats.totalLanguages}</h2>
          <p>Supported Languages</p>
        </div>
      </div>

      <div className="quote-banner">
        <p>“Data drives decisions, and decisions drive success.”</p>
      </div>
    </div>
  );
}
