import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import "./Styles/Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("USER"); // Default value to 'USER'
  const [errors, setErrors] = useState({}); // Error state for form validation
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Validation function
  const validate = () => {
    let validationErrors = {};

    if (username.length < 3) {
      validationErrors.username = "Username should be more than 3 characters.";
    }
    if (password.length < 5) {
      validationErrors.password = "Password should be more than 5 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      validationErrors.email = "Email should be valid.";
    }
    if (!firstName.trim()) {
      validationErrors.firstName = "First name should not be empty.";
    }
    if (!lastName.trim()) {
      validationErrors.lastName = "Last name should not be empty.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await signup({
        username,
        password,
        email,
        firstName,
        lastName,
        role,
      });

      console.log("Signup response:", response);

      // If signup is successful, response data will be returned
      alert("Signup successful");

      // Redirect based on the user's role
      if (role === "ADMIN") {
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      } else {
        navigate("/user-dashboard"); // Redirect to User Dashboard
      }
    } catch (error) {
      // Handle signup error
      console.error("Error during signup:", error.message);
      alert(
        "Signup failed: " + (error.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2 className="signup-title">
          <strong>Signup</strong>
        </h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              className="signup-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <input
              type="password"
              className="signup-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="input-group">
            <input
              type="email"
              className="signup-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              type="text"
              className="signup-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="signup-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <div className="signup-checkboxes">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={role === "USER"}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                USER
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === "ADMIN"}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                ADMIN
              </label>
            </div>
          </div>
          <button type="submit" className="signup-button">
            Signup
          </button>
          <button
            className="btn btn-primary mt-2 p-6"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </form>
        <p>
          <Link className="already-account" to="/login">
            Already have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
