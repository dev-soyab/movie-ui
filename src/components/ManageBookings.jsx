import React, { useEffect, useState } from "react";
import "./Styles/ManageBookings.css";
import {
  fetchBookings,
  addBooking,
  updateBooking,
  deleteBooking,
} from "../services/BookingService";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    userId: "",
    showtimeId: "",
    bookingDate: "",
    numberOfTickets: "",
    totalPrice: "",
  });
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadBookings();
},[]);

  const loadBookings = async () => {
    try {
      const bookingsData = await fetchBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedBooking) {
      setSelectedBooking((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewBooking((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    try {
      const addedBooking = await addBooking({
        user: { userId: newBooking.userId },
        bookingDate: newBooking.bookingDate,
        numberOfTickets: newBooking.numberOfTickets,
        totalPrice: newBooking.totalPrice,
        showtime: { showtimeId: newBooking.showtimeId },
      });
      setBookings([...bookings, addedBooking]);
      loadBookings();  //reload bookings list
      setNewBooking({
        userId: "",
        showtimeId: "",
        bookingDate: "",
        numberOfTickets: "",
        totalPrice: "",
      });
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    if (!selectedBooking || !selectedBooking.bookingId) {
      console.error("Booking ID is missing");
      return;
    }
    try {
      await updateBooking(selectedBooking.bookingId, {
        user: { userId: selectedBooking.userId },
        bookingDate: selectedBooking.bookingDate,
        numberOfTickets: selectedBooking.numberOfTickets,
        totalPrice: selectedBooking.totalPrice,
        showtime: { showtimeId: selectedBooking.showtimeId },
      });
      loadBookings(); // Reload updated bookings
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter((booking) => booking.bookingId !== id));
      loadBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking({
      bookingId: booking.bookingId,
      userId: booking.userId,
      showtimeId: booking.showtimeId,
      bookingDate: booking.bookingDate,
      numberOfTickets: booking.numberOfTickets,
      totalPrice: booking.totalPrice,
    });
  };

  const resetForm = () => {
    setSelectedBooking(null);
    setNewBooking({
      userId: "",
      showtimeId: "",
      bookingDate: "",
      numberOfTickets: "",
      totalPrice: "",
    });
  };

  return (
    <div className="manage-bookings-container">
      <h2>Manage Bookings</h2>

      {/* Add Booking Form */}
      <form onSubmit={handleAddBooking} className="booking-form">
        <h3>Add New Booking</h3>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={newBooking.userId}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="showtimeId"
          placeholder="Showtime ID"
          value={newBooking.showtimeId}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="bookingDate"
          placeholder="Booking Date"
          value={newBooking.bookingDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="numberOfTickets"
          placeholder="Number of Tickets"
          value={newBooking.numberOfTickets}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="totalPrice"
          placeholder="Total Price"
          value={newBooking.totalPrice}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Booking</button>
      </form>

      {/* Update Booking Form */}
      {selectedBooking && (
        <form onSubmit={handleUpdateBooking} className="booking-form">
          <h3>Update Booking</h3>
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={selectedBooking.userId}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="showtimeId"
            placeholder="Showtime ID"
            value={selectedBooking.showtimeId}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="bookingDate"
            placeholder="Booking Date"
            value={selectedBooking.bookingDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="numberOfTickets"
            placeholder="Number of Tickets"
            value={selectedBooking.numberOfTickets}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="totalPrice"
            placeholder="Total Price"
            value={selectedBooking.totalPrice}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Update Booking</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}

      {/* Booking Cards */}
      <div className="booking-cards">
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="booking-card">
            <h3>Booking ID: {booking.bookingId}</h3>
            <p>User ID: {booking.userId}</p>
            <p>Showtime ID: {booking.showtimeId}</p>
            <p>Booking Date: {booking.bookingDate}</p>
            <p>Number of Tickets: {booking.numberOfTickets}</p>
            <p>Total Price: {booking.totalPrice}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(booking)}>Update</button>
              <button onClick={() => handleDeleteBooking(booking.bookingId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
