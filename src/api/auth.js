import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Adjusted API URL

// Login function using axios
export const login = async (credentials) => {
  try {
    console.log("Credentials in login()", credentials);
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    // // Store token in localStorage if available
    // if (data.token) {
    //   localStorage.setItem("token", data.token);
    // }

    // Redirect if there's a redirect URL in the response
    console.log("inside auth.js",data);
    if (data) {
      // window.location.href = data.redirectUrl;
      return data;
    } else {
      throw new Error("No redirect URL provided");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // If the error has a response and data, capture it
      console.error(
        "Error during login:",
        error.response.data.error || error.message
      );
      throw new Error(error.response.data.error || "Login failed");
    } else {
      console.error("Error during login:", error.message);
      throw error;
    }
  }
};

// Signup function using axios
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(
        "Error during signup:",
        error.response.data.error || error.message
      );
      throw new Error(error.response.data.error || "Signup failed");
    } else {
      console.error("Error during signup:", error.message);
      throw error;
    }
  }
};
