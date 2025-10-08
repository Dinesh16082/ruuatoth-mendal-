import React from "react";
import "./Navbar.css";
import VienLogo from "../../../assets/images/Vien-Logo.png";

const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={VienLogo} alt="Vien Logo" />
      </div>
      <ul>
        <li onClick={() => setActiveTab("welcome")}>🏠 Home</li>
        <li onClick={() => setActiveTab("history")}>📜 Posted Jobs</li>
        <li onClick={() => setActiveTab("addJob")}>➕ Add Job</li>
        <li onClick={() => setActiveTab("applied")}>👥 Applied</li>
        <li onClick={() => setActiveTab("walkin")}>🚪 Walk-in</li>
        <li onClick={() => setActiveTab("onboard")}>🛫 Onboard</li>
        <li onClick={() => setActiveTab("profile")}>⚙️ Profile</li>
        <li onClick={() => setActiveTab("logout")}>🚪 Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
