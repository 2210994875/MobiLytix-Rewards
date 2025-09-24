import React from "react";
 
export default function TermsModal({ open, onClose }) {
  if (!open) return null;
 
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff", padding: "20px", borderRadius: "8px", width: "400px", position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "10px", right: "15px", border: "none", background: "transparent", fontSize: "18px"
        }}>×</button>
        <h3>Terms & Conditions</h3>
        <p style={{ fontSize: "14px", color: "#555" }}>
          By using this portal, you agree to provide accurate details and comply with all regulations.
          The partner is responsible for the authenticity of submitted information.
        </p>
        <button onClick={onClose} style={{
          background: "#8A1538", color: "white", padding: "8px 20px", border: "none", borderRadius: "4px", marginTop: "15px"
        }}>Close</button>
      </div>
    </div>
  );
}