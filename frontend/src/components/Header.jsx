

import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

export default function Header() {
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef(null);

  // 📘 Handle Documentation Download
 const handleDownload = () => {
  const link = document.createElement("a");
  link.href = `docs/website-documentation.pdf`;
  link.download = "website-documentation.pdf";
  link.click();
};


  // 📘 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelp(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="app-header">
      {/* ===== Left Section ===== */}
      <div className="header-left">
        <h2 className="header-title">Comviva Partner Portal</h2>
        <p className="header-subtitle">Empowering Businesses through Innovation</p>
      </div>

      {/* ===== Right Section: Help Center ===== */}
      <div className="header-right" ref={helpRef}>
        <div
          className="help-center-btn"
          onClick={() => setShowHelp(!showHelp)}
        >
          Help Center
        </div>

        {showHelp && (
          <div className="help-dropdown">
            <p className="help-heading">📧 Email Support</p>
            <p>support@comviva.com</p>
            <p>helpdesk@comviva.com</p>

            <hr />

            <p className="help-heading">📞 Phone Support</p>
            <p>+91 98765 43210</p>
            <p>+91 91234 56789</p>

            <hr />

            <button onClick={handleDownload} className="download-docs">
              ⬇️ Download Documentation
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
