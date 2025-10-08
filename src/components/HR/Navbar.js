import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/Vien-Logo.png";

const Navbar = () => {
  return (
    <header className="hr-header">
      <div className="hr-header-container">
        <div className="hr-logo-section">
          <img src={logo} alt="Company Logo" className="hr-logo" />
        </div>
        <nav>
          <ul className="hr-nav-list">
            <li><Link to="/hr-dashboard" className="hr-nav-link">Home</Link></li>
            <li><Link to="/hr-dashboard/applied" className="hr-nav-link">Applied</Link></li>
            <li><Link to="/hr-dashboard/candidates" className="hr-nav-link">Candidates</Link></li>
            <li><Link to="/hr-dashboard/clients" className="hr-nav-link">Clients</Link></li>
            <li><Link to="/hr-dashboard/jobs" className="hr-nav-link">Jobs</Link></li>
            <li><Link to="/hr-dashboard/hr-walkin" className="hr-nav-link">Walk-in</Link></li>
            <li><Link to="/hr-dashboard/onboard" className="hr-nav-link">Onboard</Link></li>
            <li><Link to="/logout" className="hr-nav-link">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
