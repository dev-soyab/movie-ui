import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <img
            className="logo"
            src={require(`../assets/title-logo.png`)}
            alt="logo"
          />
          <h1 className="navbar-brand book">MovieZone</h1>
          <ul className="navbar-menu">
            <li className="navbar-item">
              {/* <Link to="/mybookings" className="navbar-link">
                My Bookings
              </Link> */}
            </li>
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
                Signup
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
};

export default Navbar;
