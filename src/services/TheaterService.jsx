// src/services/TheaterService.js
// /import { axios } from "axios";

import axios from "axios";
import API_BASE_URL from "../api/baseUrl";

const THEATERS_URL = `${API_BASE_URL}/api/theaters`;

// Fetch all theaters
export const fetchTheaters = async () => {
  try {
    const response = await axios.get(THEATERS_URL);
    if (!Array.isArray(response.data))
      throw new Error("Unexpected data format");
    return response.data;
  } catch (error) {
    console.error("Error fetching theaters:", error);
    throw error;
  }
};

// Add a new theater
export const addTheater = async (theater) => {
  try {
    const response = await axios.post(THEATERS_URL, theater, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding theater:", error);
    throw error;
  }
};

// Update an existing theater
export const updateTheater = async (id, theater) => {
  try {
    await axios.put(`${THEATERS_URL}/${id}`, theater, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating theater:", error);
    throw error;
  }
};

// Delete a theater
export const deleteTheater = async (id) => {
  try {
    await axios.delete(`${THEATERS_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting theater:", error);
    throw error;
  }
};


export const fetchTheaterById = async (id) => {
  try{
    const response = await axios.get(`${THEATERS_URL}/${id}`);
     
    console.log("Fetched data:",response.data);
    return response.data;
  }
  catch(error){
      console.error("Error fetching theater by ID:", error);
      throw error;
  }
}

export const fetchMoviesByTheaterId = async (theaterId)=>{
  try {
    const response = await axios.get(`${THEATERS_URL}/${theaterId}/movies`);
    // const movieIds = await response.data;
    // console.log("Fetched data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching moviesIds by theater ID:", error);
    throw error;
  }
}