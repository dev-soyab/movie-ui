import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { fetchMovies } from "./services/MovieService";
import Logout from "./components/Logout";

import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute"
import AllBookings from "./components/AllBookings";
import LoginContextProvider from "./components/LoginContextProvider";

function App() {
  const [movies, setMovies] = useState([]);

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
