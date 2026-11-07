import React, { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import UserMovies from "./UserMovies";
import { fetchMovies } from "../services/MovieService";
import { fetchTheaters } from "../services/TheaterService";
import { fetchMoviesByTheaterId } from "../services/TheaterService";
import { fetchMoviesByIds } from "../services/MovieService";
import "./Styles/UserDashboard.css";


function UserDashboard() {
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [showTheaters, setShowTheaters] = useState(false);

  // Function to handle when "Book Tickets" is clicked
  const handleMovieSelection = (movieSelected) => {
    setIsMovieSelected(movieSelected);
  };

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
    else{
      loadMovies();
    }
  }, [selectedTheater]); // The effect will run only when `selectedTheater` changes

  return (
      <div className="user-dashboard">
        <UserNavbar
          movies={movies}
          setMovies={setMovies}
          loadMovies={loadMovies}
          theaters={theaters}
          setTheaters={setTheaters}
          loadTheaters={loadTheaters}
          selectedTheater={selectedTheater}
          onTheaterSelect={handleTheaterSelection}
          showTheaters={showTheaters}
          setShowTheaters={setShowTheaters}
        />
        <div className="content-container">
          {isMovieSelected ? (
            // Showtimes will be displayed in UserMovies
            <UserMovies
              onBookTickets={() => {}}
              showShowtimes={true}
              onExploreMore={() => handleMovieSelection(false)}
              movies={movies}
              setMovies={setMovies}
              loadMovies={loadMovies}
              selectedTheater={selectedTheater}
              onTheaterSelect={handleTheaterSelection}
            />
          ) : (
            // Movie cards displayed in UserMovies
            <div className="movies-container">
              <UserMovies
                onBookTickets={() => handleMovieSelection(true)}
                movies={movies}
                setMovies={setMovies}
                loadMovies={loadMovies}
                selectedTheater={selectedTheater}
                onTheaterSelect={handleTheaterSelection}
              />
            </div>
          )}
        </div>
      </div>
  );
}

export default UserDashboard;

