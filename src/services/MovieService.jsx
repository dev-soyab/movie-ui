// src/services/movieService.js
import axios from "axios";
import API_BASE_URL from "../api/baseUrl";

const MOVIES_URL = `${API_BASE_URL}/api/movies`;

// Fetch all movies
export const fetchMovies = async () => {
  try {
    const response = await axios.get(MOVIES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Add a new movie
export const addMovie = async (newMovie) => {
  try {
    const response = await axios.post(MOVIES_URL, newMovie, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// Update an existing movie
export const updateMovie = async (movieId, updatedMovie) => {
  try {
    const response = await axios.put(
      `${MOVIES_URL}/${movieId}`,
      updatedMovie,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

// Delete a movie
export const deleteMovie = async (movieId) => {
  try {
    await axios.delete(`${MOVIES_URL}/${movieId}`);
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// Function to get a single movie by ID
export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${MOVIES_URL}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie By Id:", error);
    alert("Error fetching movie by ID: " + movieId);
    throw error; // Rethrow the error if you need to handle it elsewhere
  }
};

// Function to fetch multiple movies by their IDs
export const fetchMoviesByIds = async (movieIds) => {
  try {
    const movies = await Promise.all(
      movieIds.map(async (movieId) => {
        const movie = await getMovieById(movieId);
        return movie;
      })
    );
    // console.log("Movies fetched:", movies);
    return movies;
  } catch (error) {
    console.error("Error fetching movies by IDs:", error);
    alert("Error fetching movies by IDs");
    throw error; // Rethrow the error if needed elsewhere
  }
};
