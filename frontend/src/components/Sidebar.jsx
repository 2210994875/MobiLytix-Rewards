import React from "react";
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
import "./Sidebar.css"; // import CSS file

export default function Sidebar() {
  const location = useLocation(); // for active link

  return (
    <div className="sidebar">
      {/* Logo / Title */}
      <h2 className="sidebar-title">Make My Trip</h2>

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
        <li className={location.pathname === "/discounts" ? "active" : ""}>
          <FaTags className="icon" />
          <Link to="/discounts">Give Discounts</Link>
        </li>
        <li className={location.pathname === "/voucher" ? "active" : ""}>
          <FaGift className="icon" />
          <Link to="/voucher">Voucher Validation</Link>
        </li>
        <li className={location.pathname === "/company-profile" ? "active" : ""}>
          <FaUser className="icon" />
          <Link to="/company-profile">Company Profile</Link>
        </li>
        <li className={location.pathname === "/settlement" ? "active" : ""}>
          <FaFileInvoiceDollar className="icon" />
          <Link to="/settlement">Settlement Tab</Link>
        </li>
        <li>
          <FaSignOutAlt className="icon" />
          <Link to="/logout">Sign Out</Link>
        </li>
      </ul>
    </div>
  );
}
