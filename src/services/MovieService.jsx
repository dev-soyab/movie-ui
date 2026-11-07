// src/services/movieService.js
import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/movies";

// Fetch all movies
export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Add a new movie
export const addMovie = async (newMovie) => {
  try {
    const response = await axios.post(API_BASE_URL, newMovie, {
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
      `${API_BASE_URL}/${movieId}`,
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
    await axios.delete(`${API_BASE_URL}/${movieId}`);
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// Function to get a single movie by ID
export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${movieId}`);
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
