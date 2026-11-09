import React, { useState } from "react";
import axios from "axios";
import "./Styles/AllBookings.css";
import { deleteBooking } from "../services/BookingService";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/baseUrl";

const AllBookings = () => {
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Separate function for fetching bookings
  const fetchUserBookings = async () => {
    setLoading(true);
    setError(null); // Reset error message

    try {
      // Step 1: Fetch user details including bookings using the provided username
      const userResponse = await axios.get(
        `${API_BASE_URL}/api/auth/username/${username}`
      );
      const userBookings = userResponse.data.bookings;

      // Step 2: Fetch details for each booking
      const detailedBookingsPromises = userBookings.map(async (booking) => {
        const showtimeResponse = await axios.get(
          `${API_BASE_URL}/api/showtimes/${booking.showtimeId}`
        );
        const showtime = showtimeResponse.data;

        const movieResponse = await axios.get(
          `${API_BASE_URL}/api/movies/${showtime.movieId}`
        );
        const theaterResponse = await axios.get(
          `${API_BASE_URL}/api/theaters/${showtime.theaterId}`
        );

        return {
          ...booking,
          showDate: showtime.showDate,
          showTime: showtime.showTime,
          movieTitle: movieResponse.data.title,
          theaterName: theaterResponse.data.name,
          theaterLocation: theaterResponse.data.location,
        };
      });

      // Wait for all promises to resolve
      const detailedBookings = await Promise.all(detailedBookingsPromises);
      setBookings(detailedBookings);
      setLoading(false);
    } catch (err) {
      setError(
        "Failed to fetch bookings. Please check the username and try again."
      );
      setLoading(false);
    }
  };

  // Handles search submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUserBookings();
  };

  // Handles booking deletion
  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(parseInt(id));
      fetchUserBookings(); // Refetch bookings after successful deletion
    } catch (error) {
      alert("Couldn't delete your booking!");
      console.log("Error deleting booking:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="all-bookings">
      <h1>Search User Bookings</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <label htmlFor="username">Enter Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Search</button>
        <button className="btn btn-primary m-2 px-3" onClick={()=>navigate("/user-dashboard")}>Back to User Dashboard</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Booking Cards */}
      <div className="booking-cards">
        {bookings.length > 0 && !loading
          ? bookings.map((booking) => (
              <div key={booking.bookingId} className="booking-card">
                <h2 className="movie-title">{booking.movieTitle}</h2>
                <div className="booking-details">
                  <p>
                    <span className="highlight">Theater:</span>{" "}
                    {booking.theaterName} ({booking.theaterLocation})
                  </p>
                  <p>
                    <span className="highlight">Show Date:</span>{" "}
                    {booking.showDate}
                  </p>
                  <p>
                    <span className="highlight">Show Time:</span>{" "}
                    {booking.showTime}
                  </p>
                  <p>
                    <span className="highlight">Tickets:</span>{" "}
                    {booking.numberOfTickets}
                  </p>
                  <p>
                    <span className="highlight">Total Price:</span> $
                    {booking.totalPrice}
                  </p>
                </div>
                <button
                  className="cta-button"
                  onClick={() => handleDeleteBooking(booking.bookingId)}
                >
                  Cancel Booking
                </button>
              </div>
            ))
          : !loading && <p>No bookings found.</p>}
      </div>
    </div>
  );
};

export default AllBookings;
