import axios from "axios";
import API_BASE_URL from "../api/baseUrl";

const AUTH_URL = `${API_BASE_URL}/api/auth`;

// Get all users
export const getAllUsers = () => {
  return axios.get(`${AUTH_URL}/all`);
};

// Delete a user by ID
export const deleteUserById = async (id) => {
  return await axios.delete(`${AUTH_URL}/${id}`);
};

// Update user details
export const updateUserById = async (id, updatedUserData) => {
  return await axios.put(`${AUTH_URL}/${id}`, updatedUserData);
};

//get user by username
export const getUserByUsername = async (username) => {
  try{
    const response = await axios.get(`${AUTH_URL}/username/${username}`);
  if(response.data){
    console.log("User found by username",response.data);
    return response.data;
  }
  else{
    alert("username doesn't exist");
  }
  }
  catch(error){
    console.error("Error fetching user by username",error);
  }

}