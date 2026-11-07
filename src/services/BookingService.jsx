import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/bookings";

// Fetch all bookings
export const fetchBookings = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Add a new booking
export const addBooking = async (newBooking) => {
  try {
    const response = await axios.post(API_BASE_URL, newBooking);
    return response.data;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

// Update an existing booking
export const updateBooking = async (bookingId, updatedBooking) => {
  try {
    await axios.put(`${API_BASE_URL}/${bookingId}`, updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${bookingId}`);
    alert("Booking delete successfully, will be processing your refund soon");
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
