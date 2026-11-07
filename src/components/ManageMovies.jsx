// src/components/ManageMovies.js

import React, { useEffect, useState } from "react";
import "./Styles/ManageMovies.css";
import {
  fetchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../services/MovieService";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    rating: "",
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies from the service
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedMovie) {
      setSelectedMovie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewMovie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Add a new movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const addedMovie = await addMovie(newMovie);
      setMovies([...movies, addedMovie]);
      setNewMovie({
        title: "",
        description: "",
        genre: "",
        duration: "",
        rating: "",
      });
      loadMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Update a movie
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    if (!selectedMovie || !selectedMovie.movieId) {
      console.error("Movie ID is missing");
      return;
    }
    try {
      await updateMovie(selectedMovie.movieId, selectedMovie);
      await loadMovies(); // Reload updated movie list
      alert("Movie updated successfully!");
      setSelectedMovie(null);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // Delete a movie
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie.movieId !== id));
      alert("Movie deleted Successfully");
      await loadMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Set the selected movie for updating
  const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  // Reset selected movie and clear forms
  const resetForm = () => {
    setSelectedMovie(null);
    setNewMovie({
      title: "",
      description: "",
      genre: "",
      duration: "",
      rating: "",
    });
  };

  return (
    <div className="manage-movies-container">
      <h2>Manage Movies</h2>

      {/* Add Movie Form */}
      <form onSubmit={handleAddMovie} className="movie-form">
        <h3>Add New Movie</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          value={newMovie.duration}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Movie</button>
      </form>

      {/* Update Movie Form */}
      {selectedMovie && (
        <form onSubmit={handleUpdateMovie} className="movie-form">
          <h3>Update Movie</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={selectedMovie.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={selectedMovie.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={selectedMovie.genre}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration"
            value={selectedMovie.duration}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={selectedMovie.rating}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Update Movie</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}

      {/* Movie Cards */}
      <div className="movie-cards">
        {movies.map((movie) => (
          <div key={movie.movieId} className="movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Genre: {movie.genre}</p>
            <p>Duration: {movie.duration} mins</p>
            <p>Rating: {movie.rating}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(movie)}>Update</button>
              <button onClick={() => handleDeleteMovie(movie.movieId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMovies;
