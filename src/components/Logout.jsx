import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Styles/Logout.css'

const Logout = () => {
const navigate = useNavigate();

 useEffect(() => {
  localStorage.removeItem('loggedIn');
 }, []);
 
  return (
    <div className="logout">
      <h1>
        <strong>Thank you for choosing us!</strong>
      </h1>
      <br />
      <button
        className="btn btn-lg btn-primary"
        onClick={() => navigate("/home")}
      >
        Back to Home
      </button>
      <button
        className="btn btn-lg btn-primary ms-3"
        onClick={() => navigate("/login")}
      >
        Login Again
      </button>
    </div>
  );
};

export default Logout
