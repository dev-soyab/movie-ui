import React from "react";
import "./Styles/Footer.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {

 const navigate = useNavigate();
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-card">
          <h3>Services</h3>
          <ul>
            <li>
              <Link className="plain-text-link" to="/signup">
                Book Now
              </Link>
            </li>
            <li>
              <Link className="plain-text-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-card">
          <h3>Company</h3>
          <p>About us</p>
          <p>Contact us</p>
          <p>Terms and Conditions</p>
        </div>
        <div className="footer-card">
          <h3>Address</h3>
          <p>123 Movie Lane</p>
          <p>Film City, FC 10101</p>
          <p>Email: support@moviewebsite.com</p>
        </div>
      </div>
      <h4>Website Design and Developed By Soyab Ansari</h4>
      <p>&copy;2024 All rights reserved.</p>
    </footer>
  );
};

export default Footer;
