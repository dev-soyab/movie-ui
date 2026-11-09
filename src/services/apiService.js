import axios from 'axios';
import API_BASE_URL from '../api/baseUrl';

const API_URL = `${API_BASE_URL}/api/auth`;

export const getUserByUsername = (username) => {
  return axios.get(`${API_URL}/username/${username}`);
};

export const registerUser = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// Add more API functions as needed
