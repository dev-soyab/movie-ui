import React, { useEffect, useState } from "react";
import "./Styles/ManageShowtimes.css";
import {
  fetchShowtimes,
  addShowtime,
  updateShowtime,
  deleteShowtime,
} from "../services/ShowtimeService";

const ManageShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [movieId, setMovieId] = useState("");
  const [theaterId, setTheaterId] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    loadShowtimes();
  }, []);

  const loadShowtimes = async () => {
    try {
      const showtimesData = await fetchShowtimes();
      setShowtimes(showtimesData);
    } catch (error) {
      console.error("Error loading showtimes:", error);
    }
  };

  // Add a new showtime
  const handleAddShowtime = async (e) => {
    e.preventDefault();
    try {
      const newShowtime = {
        showDate,
        showTime,
        movie: { movieId: Number(movieId) }, // Use movie object
        theater: { theaterId: Number(theaterId) }, // Use theater object
      };

      const addedShowtime = await addShowtime(newShowtime);
      setShowtimes([...showtimes, addedShowtime]);

      // Clear the form after adding
      setShowDate("");
      setShowTime("");
      setMovieId("");
      setTheaterId("");
    } catch (error) {
      alert("Error!! couldn't add the showtime! try again with correct details!");
      console.error("Error adding showtime:", error);
    }
  };

  // Update a showtime
  const handleUpdateShowtime = async (e) => {
    e.preventDefault();
    if (!selectedShowtime || !selectedShowtime.showtimeId) {
      console.error("Showtime ID is missing");
      return;
    }

    try {
      const updatedShowtime = {
        showDate: selectedShowtime.showDate,
        showTime: selectedShowtime.showTime,
        movie: { movieId: Number(selectedShowtime.movieId) }, // Use movie object
        theater: { theaterId: Number(selectedShowtime.theaterId) }, // Use theater object
      };

      await updateShowtime(selectedShowtime.showtimeId, updatedShowtime);
      alert("Showtime Updated Successfully")
      await loadShowtimes(); // Reload updated showtimes
      setSelectedShowtime(null); // Clear selection
    } catch (error) {
      console.error("Error updating showtime:", error);
    }
  };

  // Handle input change for the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedShowtime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete a showtime
  const handleDeleteShowtime = async (id) => {
    try {
      await deleteShowtime(id);
      setShowtimes(showtimes.filter((showtime) => showtime.showtimeId !== id));
    } catch (error) {
      console.error("Error deleting showtime:", error);
    }
  };

  // Set the selected showtime for updating
  const handleEdit = (showtime) => {
    setSelectedShowtime({
      ...showtime,
      movieId: showtime.movieId, // Assign movieId for update form
      theaterId: showtime.theaterId, // Assign theaterId for update form
    });
  };

  return (
    <div className="manage-showtimes-container">
      <h2>Manage Showtimes</h2>

      {/* Add Showtime Form */}
      <form onSubmit={handleAddShowtime} className="showtime-form">
        <h3>Add New Showtime</h3>
        <input
          type="number"
          name="movieId"
          placeholder="Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        />
        <input
          type="number"
          name="theaterId"
          placeholder="Theater ID"
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
          required
        />
        <input
          type="date"
          name="showDate"
          placeholder="Show Date"
          value={showDate}
          onChange={(e) => setShowDate(e.target.value)}
          required
        />
        <input
          type="time"
          name="showTime"
          placeholder="Show Time"
          value={showTime}
          onChange={(e) => setShowTime(e.target.value)}
          required
        />
        <button type="submit">Add Showtime</button>
      </form>

      {/* Update Showtime Form */}
      {selectedShowtime && (
        <form onSubmit={handleUpdateShowtime} className="showtime-form">
          <h3>Update Showtime</h3>
          <input
            type="number"
            name="movieId"
            placeholder="Movie ID"
            value={selectedShowtime.movieId}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="theaterId"
            placeholder="Theater ID"
            value={selectedShowtime.theaterId}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="showDate"
            placeholder="Show Date"
            value={selectedShowtime.showDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="time"
            name="showTime"
            placeholder="Show Time"
            value={selectedShowtime.showTime}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Update Showtime</button>
          <button type="button" onClick={() => setSelectedShowtime(null)}>
            Cancel
          </button>
        </form>
      )}

      {/* Showtime Cards */}
      <div className="showtime-cards">
        {showtimes.map((showtime) => (
          <div key={showtime.showtimeId} className="showtime-card">
            <h3>Showtime ID: {showtime.showtimeId}</h3>
            <p>Movie ID: {showtime.movieId}</p>
            <p>Theater ID: {showtime.theaterId}</p>
            <p>Show Date: {showtime.showDate}</p>
            <p>Show Time: {showtime.showTime}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(showtime)}>Update</button>
              <button onClick={() => handleDeleteShowtime(showtime.showtimeId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageShowtimes;
