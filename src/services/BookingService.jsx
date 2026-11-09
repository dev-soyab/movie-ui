import axios from "axios";
import API_BASE_URL from "../api/baseUrl";

const BOOKINGS_URL = `${API_BASE_URL}/api/bookings`;

// Fetch all bookings
export const fetchBookings = async () => {
  try {
    const response = await axios.get(BOOKINGS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Add a new booking
export const addBooking = async (newBooking) => {
  try {
    const response = await axios.post(BOOKINGS_URL, newBooking);
    return response.data;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

// Update an existing booking
export const updateBooking = async (bookingId, updatedBooking) => {
  try {
    await axios.put(`${BOOKINGS_URL}/${bookingId}`, updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    await axios.delete(`${BOOKINGS_URL}/${bookingId}`);
    alert("Booking delete successfully, will be processing your refund soon");
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
