import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { fetchMovies } from "./services/MovieService";
import { fetchTheaters } from "./services/TheaterService";
import { fetchMoviesByTheaterId } from "./services/TheaterService";
import { fetchMoviesByIds } from "./services/MovieService";
import Logout from "./components/Logout";

import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute"
import AllBookings from "./components/AllBookings";
import LoginContextProvider from "./components/LoginContextProvider";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [showTheaters, setShowTheaters] = useState(false);
  const [theaters, setTheaters] = useState([]);

  const loadMovies = async () => {
    try {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const loadTheaters = async () => {
    try {
      const theatersData = await fetchTheaters();
      setTheaters(theatersData);
      // console.log(theatersData);
    } catch (error) {
      console.error("Error loading theaters:", error);
    }
  };

  useEffect(() => {
    // console.log("Inside useEffect of navbar theater fetching");

    loadTheaters();
  }, []);

  const handleTheaterSelection = (theater) => {
    setSelectedTheater(theater); // Set selected theater name
    // Optionally, you could filter movies based on the theater here
  };
  useEffect(() => {
    // Only execute if `selectedTheater` is not null
    if (selectedTheater != null) {
      const loadMovieIds = async () => {
        try {
          // Fetch movie IDs by theater ID
          const movieIds = await fetchMoviesByTheaterId(
            selectedTheater.theaterId
          );

          // Fetch movies by those IDs
          const theaterMovies = await fetchMoviesByIds(movieIds);

          // Update the movies state
          setMovies(theaterMovies);
          setShowTheaters(false);
          console.log("Fetched Movies", theaterMovies);
        } catch (error) {
          console.error("Error loading theater movies:", error);
        }
      };

      // Call the function
      loadMovieIds();
    }
  }, [selectedTheater]); // The effect will run only when `selectedTheater` changes




  return (
    <LoginContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home movies={movies} />} />
            <Route path="/home" element={<Home movies={movies} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/movies"
              element={<ProtectedRoute element={<UserDashboard />} />}
            />
            <Route
              path="/admin-dashboard"
              element={<ProtectedRoute element={<AdminDashboard />} />}
            />

            <Route path="/logout" element={<Logout />} />
            <Route path="/mybookings" element={<AllBookings />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginContextProvider>
  );
}

export default App;
