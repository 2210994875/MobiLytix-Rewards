import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/website-documentation.pdf"; // path inside public/docs
    link.download = "website-documentation.pdf";
    link.click();
  };

  return (
    <div className="dashboard-container">
      {/* Small ⓘ button in top right */}
      <button className="info-btn" onClick={handleDownload} title="Download Documentation">
        i
      </button>

      <h2>Welcome to Dashboard</h2>
    </div>
  );
}
