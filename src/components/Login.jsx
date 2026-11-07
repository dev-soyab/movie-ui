import React, { useState,useContext, useEffect } from "react";
import { login } from "../api/auth";
import "./Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming axios is used for HTTP requests
import { Link } from "react-router-dom";
import { LoginContext } from "./LoginContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [isForgotPassword, setIsForgotPassword] = useState(false); // To toggle between forms
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotPasswordUsername, setForgotPasswordUsername] = useState("");
  const [updatePasswordError, setUpdatePasswordError] = useState(""); // State for forgot password error

  const navigate = useNavigate();
  const {loggedIn,toggleLogin} = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ usernameOrEmail: username, password });
      if (response) {
        console.log("Inside Login.jsx: ", response);
        toggleLogin();
        if(response.redirectUrl=="/user-dashboard"){         
          navigate("/movies");
        }
        else{
          navigate(response.redirectUrl);
        }
        
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Username or Password is wrong!");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate that password is at least 5 characters
    if (newPassword.length < 5) {
      setUpdatePasswordError("Password should be at least 5 characters.");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      setUpdatePasswordError("Passwords do not match!");
      return;
    }

    // Clear error state if validation passes
    setUpdatePasswordError("");

    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/${forgotPasswordUsername}`,
        null, // No body data
        {
          params: {
            newPassword: newPassword,
          },
        }
      );
      alert(response.data); // Assuming backend sends "Password Updated successfully"
      setIsForgotPassword(false); // Switch back to login form
    } catch (error) {
      console.error("Error during password update:", error);
      alert("This username or email doesn't exist.");
    }
  };
  useEffect(()=>{
    console.log("loggedIn:",loggedIn);
  },[]);
  return (
    <div className="login">
      <div className="login-background">
        <img
          src={require(`../assets/login-background.png`)}
          alt="login background img"
        />
      </div>

      <div className="login-container">
        <h2 className="login-title">
          <strong>
            {isForgotPassword ? "Set New Password" : "Welcome Back!"}
          </strong>
        </h2>
        {error && <p className="error-message">{error}</p>}

        {isForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPasswordSubmit}>
            <input
              type="text"
              className="login-input"
              placeholder="Username or Email"
              value={forgotPasswordUsername}
              onChange={(e) => setForgotPasswordUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            {/* Display error if password validation fails */}
            {updatePasswordError && (
              <p className="error-message">{updatePasswordError}</p>
            )}
            <button type="submit" className="login-button">
              Update Password
            </button>
            <button
              className="btn btn-primary mt-2"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="forgot-password-btn"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </button>
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate("/home")}
            >
              Back to Home
            </button>
          </form>
        )}
        <p>
          <Link className="no-account" to="/signup">
            Don't have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
