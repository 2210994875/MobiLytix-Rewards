import React from "react";
import { Link } from "react-router-dom";
 
export default function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#eee", padding: "20px" }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/register">Register Company</Link></li>
      </ul>
    </div>
  );
}