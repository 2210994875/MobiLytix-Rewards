import React from "react";
import logo from "../assets/Mahindra-comviva.png";

 
import "./Sidebar.css";  
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTags,
  FaGift,
  FaUser,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";


export default function Sidebar() {
  const location = useLocation(); // for active link

  return (
    <div className="sidebar">
      {/* Logo / Title */}
     <div className="sidebar-logo">
  <img src={logo} alt="Mahindra Comviva Logo" />
</div>


      {/* User Section */}
      <div className="sidebar-user">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="user-avatar"
        />
        <p>
          Welcome, <b>Tapas</b>
        </p>
        <FaLock />
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <FaTachometerAlt className="icon" />
          <Link to="/">Dashboard</Link>
        </li>
        <li className={location.pathname === "/company-profile" ? "active" : ""}>
          <FaUser className="icon" />
          <Link to="/company-profile">Company Profile</Link>
        </li>
      <li className={location.pathname === "/language" ? "active" : ""}>
  <FaFileInvoiceDollar className="icon" />
  <Link to="/language">Language settings</Link>
</li>

  
        <li>
          <FaSignOutAlt className="icon" />
          <Link to="/logout">Sign Out</Link>
        </li>
      </ul>
    </div>
  );
}
