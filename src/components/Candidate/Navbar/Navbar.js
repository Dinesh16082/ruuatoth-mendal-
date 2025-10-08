import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional CSS styling
import logo from '../../../assets/images/Vien-Logo.png'; // Adjust path to your logo image

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>
      <ul className="navbar-right">
    
        <li><Link to="/candidate-dashboard">Home</Link></li>
        <li><Link to="/candidate_history">History</Link></li>
        <li className="dropdown">
          <span>Jobs ▾</span>
          <ul className="dropdown-content">
            <li><Link to="/jobs/related">Related Jobs</Link></li>
            <li><Link to="/jobs/all">All Jobs</Link></li>
          </ul>
        </li>
        <li><Link to="/candidate-profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
