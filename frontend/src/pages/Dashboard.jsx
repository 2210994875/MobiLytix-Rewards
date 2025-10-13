
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaBuilding, FaLanguage } from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({ activeCompanies: 0, totalLanguages: 0 });

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/website-documentation.pdf";
    link.download = "website-documentation.pdf";
    link.click();
  };

  return (
    <div className="dashboard-container">
      {/* <button className="info-btn" onClick={handleDownload}>i</button> */}

      <header className="dashboard-header">
        <h1>Innovating Tomorrow with Connected Technology</h1>
        <p className="dashboard-subtitle">
          A platform that simplifies global connectivity, enabling enterprises to manage, scale,
          and evolve through smart, sustainable solutions.
        </p>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <FaBuilding className="stat-icon" />
          <h2>{stats.activeCompanies}</h2>
          <p>Active Companies</p>
        </div>
        <div className="stat-card">
          <FaLanguage className="stat-icon" />
          <h2>{stats.totalLanguages}</h2>
          <p>Supported Languages</p>
        </div>
      </section>

      <section className="overview-section">
        <h2>Overview</h2>
        <p>
          Our Dashboard is designed to deliver an intuitive, data-driven experience for organizations
          to monitor and manage multilingual company information efficiently. Through automation and
          clean design, it ensures productivity and clarity.
        </p>
        <p>
          Built for scalability, transparency, and ease of use, it brings real-time insights into business
          performance while maintaining simplicity and elegance in every interaction.
        </p>
      </section>

      <footer className="quote-banner">
        “Technology that connects people should also connect purpose.”
      </footer>
    </div>
  );
}
