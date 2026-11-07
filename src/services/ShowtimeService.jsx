import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/showtimes";

// Fetch all showtimes
export const fetchShowtimes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    throw error;
  }
};

// Add a new showtime
export const addShowtime = async (newShowtime) => {
  try {
    const response = await axios.post(API_BASE_URL, newShowtime);
    return response.data;
  } catch (error) {
    console.error("Error adding showtime:", error);
    throw error;
  }
};

// Update a showtime
export const updateShowtime = async (showtimeId, updatedShowtime) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${showtimeId}`,
      updatedShowtime
    );
    return response.data;
  } catch (error) {
    console.error("Error updating showtime:", error);
    throw error;
  }
};

// Delete a showtime
export const deleteShowtime = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting showtime:", error);
    throw error;
  }
};
