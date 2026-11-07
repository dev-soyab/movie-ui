import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Styles/AdminDashboard.css";
import ManageUsers from "./ManageUsers";
import ManageMovies from "./ManageMovies";
import ManageTheaters from "./ManageTheaters";
import ManageShowtimes from "./ManageShowtimes";
import ManageBookings from "./ManageBookings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("manageUsers");
  const navigate = useNavigate(); // Initialize useNavigate

  const renderContent = () => {
    switch (activeTab) {
      case "manageUsers":
        return <ManageUsers />;
      case "manageMovies":
        return <ManageMovies />;
      case "manageTheaters":
        return <ManageTheaters />;
      case "manageShowtimes":
        return <ManageShowtimes />;
      case "manageBookings":
        return <ManageBookings />;
      default:
        return <div>Welcome to Admin Dashboard</div>;
    }
  };

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      navigate("/logout"); // Only navigate if the user confirms
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="logo-header">
          <img
            className="logo"
            src={require(`../assets/title-logo.png`)}
            alt="logo"
          />
          <h1>Admin Dashboard</h1>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="admin-container">
        <nav className="admin-sidebar">
          <ul>
            <li onClick={() => setActiveTab("manageUsers")}>
              <img
                className="logo"
                src={require(`../assets/users.png`)}
                alt="user-logo"
              />
              <strong>Users</strong>
            </li>
            <li onClick={() => setActiveTab("manageMovies")}>
              <img
                className="logo"
                src={require(`../assets/movies.png`)}
                alt="movie-logo"
              />
              <strong>Movies</strong>
            </li>
            <li onClick={() => setActiveTab("manageTheaters")}>
              <img
                className="logo"
                src={require(`../assets/theaters.png`)}
                alt="theater-logo"
              />
              <strong>Theaters</strong>
            </li>
            <li onClick={() => setActiveTab("manageShowtimes")}>
              <img
                className="logo"
                src={require(`../assets/showtimes.png`)}
                alt="showtime-logo"
              />
              <strong>Showtimes</strong>
            </li>
            <li onClick={() => setActiveTab("manageBookings")}>
              <img
                className="logo"
                src={require(`../assets/bookings.png`)}
                alt="booking-logo"
              />
              <strong>Bookings</strong>
            </li>
          </ul>
        </nav>
        <main className="admin-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
