import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Update with your API base URL

export const getUserByUsername = (username) => {
  return axios.get(`${API_URL}/username/${username}`);
};

export const registerUser = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// Add more API functions as needed
