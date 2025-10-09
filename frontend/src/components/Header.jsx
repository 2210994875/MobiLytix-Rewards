import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  // 📘 Handle Documentation Download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/website-documentation.pdf";
    link.download = "website-documentation.pdf";
    link.click();
  };

  return (
    <header className="app-header">
      {/* ===== Left Section: Title & Subtitle ===== */}
      <div className="header-left">
        <h2 className="header-title">Comviva Partner Portal</h2>
        <p className="header-subtitle">Empowering Businesses through Innovation</p>
      </div>

      {/* ===== Right Section: Documentation Button ===== */}
      <div className="header-right">
        <button
          className="info-button"
          title="Download Website Documentation"
          onClick={handleDownload}
        >
          <FaInfoCircle className="info-icon" />
        </button>
      </div>
    </header>
  );
}
