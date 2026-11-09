import React, { useEffect, useState, useCallback } from "react";
// import { fetchMovies } from "../services/MovieService";
import "./Styles/UserMovies.css";
import { fetchTheaterById } from "../services/TheaterService";
import { addBooking } from "../services/BookingService";
import { getUserByUsername } from "../services/UserService";

const UserMovies = ({
  onBookTickets,
  showShowtimes,
  onExploreMore,
  movies,
  setMovies,
  loadMovies,
  selectedTheater,
  onTheaterSelect,
}) => {
  // const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [theaters, setTheaters] = useState({}); // Store fetched theaters by theaterId
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(500); // default one ticket price
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [username, setUsername] = useState("");

  const handleBookTicketsClick = (movie) => {
    setSelectedMovie(movie);
    onBookTickets();
  };

  // Use useCallback to memoize the fetchingTheater function
  const fetchingTheater = useCallback(
    async (theaterId) => {
      if (!theaters[theaterId]) {
        try {
          const response = await fetchTheaterById(parseInt(theaterId));
          setTheaters((prev) => ({
            ...prev,
            [theaterId]: {
              name: response.name,
              location: response.location,
              capacity: response.capacity,
            },
          }));
        } catch (error) {
          console.log("Error while fetching theater:", error);
        }
      }
    },
    [theaters]
  ); // Dependencies: theaters

  useEffect(() => {
    if (selectedMovie && selectedMovie.showtimes) {
      // Fetch the theaters for all showtimes of the selected movie
      console.log("Selected Movie showtimes",selectedMovie.showtimes);
      selectedMovie.showtimes.forEach((showtime) => {
        console.log("Fetching theater with ID",showtime.theaterId);
        fetchingTheater(showtime.theaterId);
      });
    }
  }, [selectedMovie, fetchingTheater]); // Add fetchingTheater as a dependency

  const handleBookingClick = (showtime) => {
    setSelectedShowtime(showtime);
    setShowBookingForm(true);
  };

  const handleTicketChange = (e) => {
    const tickets = e.target.value;
    setNumberOfTickets(tickets);
    setTotalPrice(tickets * 500); // Ticket price is 500
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0]; // Format today's date

    try {
      const user = await getUserByUsername(username);
      let userId;
      if (user != null) {
        userId = user.userId;
      }
      else{
        alert("Username doesn't exist, do registration first!");
        return;
      }
      const newBooking = {
        user: { userId: userId },
        bookingDate: today,
        numberOfTickets,
        totalPrice,
        showtime: { showtimeId: selectedShowtime.showtimeId },
      };
      const response = await addBooking(newBooking);
      console.log(response);
      alert(`Booking saved with successfully!`);
      setShowBookingForm(false);
      setSelectedShowtime(null);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (showBookingForm && selectedShowtime) {
    return (
      <div className="booking-form-container">
        <h2 className="booking-title">
          <b>Reserve Your Seat</b>
        </h2>

        {/* Display Theater and Showtime Information */}
        <div className="showtime-info">
          <h2 className="movie-title">
            <i className="fa fa-film" />
            &nbsp;
            <strong>
              {selectedMovie ? selectedMovie.title : "Loading..."}
            </strong>
          </h2>
          <p>
            <strong>
              {theaters[selectedShowtime.theaterId]?.name || "Loading..."}
            </strong>
          </p>
          <p>
            <i className="fa fa-calendar">
              &nbsp;
              <strong>
                {selectedShowtime.showDate} | {selectedShowtime.showTime}
              </strong>
            </i>
          </p>
        </div>

        <form onSubmit={handleBookingSubmit} className="booking-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Showtime ID:</label>
            <input
              type="number"
              className="form-control"
              value={selectedShowtime.showtimeId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Date of Booking:</label>
            <input
              type="text"
              className="form-control"
              value={new Date().toISOString().split("T")[0]}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Number of Tickets:</label>
            <input
              type="number"
              className="form-control"
              value={numberOfTickets}
              onChange={handleTicketChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>
              Total Price: <span className="total-price">{totalPrice} INR</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary reserve-btn">
            Reserve Your Seat
          </button>
        </form>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={() => setShowBookingForm(false)}
            className="btn btn-secondary"
          >
            Back to Showtimes
          </button>
          <button onClick={onExploreMore} className="btn btn-secondary">
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  if (showShowtimes && selectedMovie) {
    // navigate("/movies/" + selectedMovie)
    return (
      <div>
        <div className="showtimes-container">
          <h2>{selectedMovie.title} Shows</h2>
          <div className="showtime-cards-wrapper">
            <div className="showtime-cards">
              {selectedMovie.showtimes.map((showtime) => {
                const theater = theaters[showtime.theaterId]; // Get cached theater data
                return (
                  <div key={showtime.showtimeId} className="showtime-card">
                    <h4>{showtime.showTime}</h4>
                    <p>{showtime.showDate}</p>

                    {theater ? (
                      <>
                        <h4>{theater.name}</h4>
                        <p>{theater.location}</p>
                        <p>Capacity: {theater.capacity}</p>
                        <p>
                          Seats left:{" "}
                          {showtime.seatsLeft}
                          {/* {theater.capacity - showtime.bookings.length} */}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleBookingClick(showtime)}
                        >
                          Book
                        </button>
                      </>
                    ) : (
                      <p>Loading theater information...</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="explore-btn" onClick={onExploreMore}>
            Explore More Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-section">
      {/* Conditionally render the theater name if selectedTheater is provided */}
      {selectedTheater && (
        <h2 className="theater-heading">
          <strong>Showing at {selectedTheater.name}</strong>
        </h2>
      )}

      {/* Movie cards */}
      <div className="movie-cards">
        {movies.map((movie) => (
          <div key={movie.movieId} className="movie-card">
            <img
              src={require(`../assets/movie-poster.png`)}
              alt={`${movie.title} poster`}
            />
            <h3 style={{ color: "#D89216" }}>
              <strong>{movie.title}</strong>
            </h3>
            <p>{movie.genre}</p>
            <p>{movie.description}</p>
            <p>Duration: {movie.duration} Mins</p>
            <p>
              <span className="fa fa-star" style={{ color: "red" }}></span>{" "}
              &nbsp; {movie.rating}/10
            </p>
            <button
              className="btn btn-primary mt-2 px-4"
              onClick={() => handleBookTicketsClick(movie)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMovies;


