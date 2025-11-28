import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Mahindra-comviva.png";
import {
  FaTachometerAlt,
  FaUser,
  FaLanguage,
  //FaSignOutAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* ===== Logo ===== */}
      <div className="sidebar-logo">
        <img src={logo} alt="Comviva Logo" />
      </div>

      {/* ===== Navigation Menu ===== */}
      <ul className="sidebar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === "/company-profile" ? "active" : ""}>
          <Link to="/company-profile">
            <FaUser className="icon" />
            <span>Company Profile</span>
          </Link>
        </li>
        <li className={location.pathname === "/language" ? "active" : ""}>
          <Link to="/language">
            <FaLanguage className="icon" />
            <span>Language Settings</span>
          </Link>
        </li>
      </ul>

      {/* ===== Divider ===== */}
      <div className="sidebar-divider"></div>

      {/* ===== Company Info Section ===== */}
      <div className="sidebar-footer">
        <h4>Comviva</h4>
        <p className="company-tagline">
          Innovating Tomorrow with Connected Technology
        </p>

        <div className="contact-info">
          <p>
            <FaMapMarkerAlt className="contact-icon" />
            <span>Tech Mahindra, Gurgaon</span>
          </p>
          <p>
            <FaEnvelope className="contact-icon" />
            <a href="mailto:info@comviva.com">info@comviva.com</a>
          </p>
          <p>
            <FaPhoneAlt className="contact-icon" />
            <a href="tel:+911244200000">+91 124 420 0000</a>
          </p>
        </div>

        {/* <button className="logout-btn">
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </button> */}
      </div>
    </div>
  );
}
