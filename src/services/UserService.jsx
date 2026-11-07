import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

// Get all users
export const getAllUsers = () => {
  return axios.get(`${API_BASE_URL}/all`);
};

// Delete a user by ID
export const deleteUserById = async (id) => {
  return await axios.delete(`${API_BASE_URL}/${id}`);
};

// Update user details
export const updateUserById = async (id, updatedUserData) => {
  return await axios.put(`${API_BASE_URL}/${id}`, updatedUserData);
};

//get user by username
export const getUserByUsername = async (username) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/username/${username}`);
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