import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/UserNavbar.css";
import { Link } from "react-router-dom";

const UserNavbar = ({
  theaters,
  loadMovies,
  onTheaterSelect,
  showTheaters,
  setShowTheaters,
}) => {
  const navigate = useNavigate();
  const theatersContainerRef = useRef(null);
  const [selectedTheaterId, setSelectedTheaterId] = useState("all");

  const handleTheaterChange = (event) => {
    const theaterId = event.target.value;
    setSelectedTheaterId(theaterId);
    const selectedTheater =
      theaterId === "all"
        ? null
        : theaters.find((theater) => theater.theaterId === parseInt(theaterId));
   
      onTheaterSelect(selectedTheater); // Notify parent component of the selection

      
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        theatersContainerRef.current &&
        !theatersContainerRef.current.contains(event.target)
      ) {
        setShowTheaters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowTheaters]);

const handleLogout = () => {
  const userConfirmed = window.confirm("Are you sure you want to logout?");
  if (userConfirmed) {
    navigate("/logout"); // Only navigate if the user confirms
  }
};

  const handleToggleTheaters = () => {
    // Toggle visibility on button click
    setShowTheaters((prevState) => !prevState);
  };

  const handleSelectedTheater = (theater) => {
    onTheaterSelect(theater);
  };


  // const handleAllMovies = () => {
  //   setSelectedTheaterId('all');
  //   onTheaterSelect(null);
  //   loadMovies();
  // };
  return (
    <nav className="user-navbar">
      <div className="navbar-container">
        <img
          className="logo"
          src={require(`../assets/title-logo.png`)}
          alt="logo"
        />
        <h2 className="navbar-brand">MovieZone</h2>
        <div className="navbar-right">
          {/* <button className="all-movies" onClick={handleAllMovies}>
            All Movies
          </button> */}
          <Link className="all-bookings-button" to="/mybookings">
            <strong>My Bookings</strong>
          </Link>
          <select
            className="btn btn-secondary dropdown-toggle ms-3 py-2 px-2"
            value={selectedTheaterId}
            onChange={handleTheaterChange}
            onClick={handleToggleTheaters}
          >
            <option value="all" key={0}>
              All Theaters
            </option>
            {theaters.map((theater) => (
              <option key={theater.theaterId} value={theater.theaterId}>
                <b>{theater.name}</b>
              </option>
            ))}
          </select>

          <div
            className={`theaters-container ${showTheaters ? "visible" : ""}`}
            ref={theatersContainerRef}
          >
            {theaters.length > 0 ? (
              theaters.map((theater) => (
                <div
                  key={theater.theater_id}
                  className="theater-card text-center"
                >
                  <h4 style={{ textAlign: "center" }}>{theater.name}</h4>
                  <p style={{ color: "white" }}>{theater.location}</p>
                  <p style={{ color: "white" }}>{theater.capacity} seats</p>
                  <button
                    className="btn btn-warning mt-2 mb-2 p-2 theater-button"
                    onClick={() => handleSelectedTheater(theater)}
                  >
                    Check Availability
                  </button>
                </div>
              ))
            ) : (
              <p>No theaters available</p>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout &nbsp;
            <i class="fa fa-sign-out" aria-hidden="false"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
