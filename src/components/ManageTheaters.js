import React, { useEffect, useState } from "react";
import {
  fetchTheaters,
  addTheater,
  updateTheater,
  deleteTheater,
} from "../services/TheaterService";
import "./Styles/ManageTheaters.css";

const ManageTheaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [newTheater, setNewTheater] = useState({
    name: "",
    location: "",
    capacity: "",
  });
  const [selectedTheater, setSelectedTheater] = useState(null);

  useEffect(() => {
    loadTheaters();
  }, []);

  const loadTheaters = async () => {
    try {
      const data = await fetchTheaters();
      setTheaters(data);
    } catch (error) {
      console.error("Error loading theaters:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedTheater) {
      setSelectedTheater((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewTheater((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddTheater = async (e) => {
    e.preventDefault();
    try {
      const addedTheater = await addTheater(newTheater);
      alert("Theater Addded Successfully!!");
      loadTheaters();
      // setTheaters([...theaters, addedTheater]);
      setNewTheater({ name: "", location: "", capacity: "" });
    } catch (error) {
      console.error("Error adding theater:", error);
    }
  };

  const handleUpdateTheater = async (e) => {
    e.preventDefault();
    if (!selectedTheater || !selectedTheater.theaterId) {
      console.error("Theater ID is missing");
      return;
    }
    try {
      await updateTheater(selectedTheater.theaterId, selectedTheater);
      alert("Theater Updated Successfully!");
      await loadTheaters(); // Fetch updated theaters
      setSelectedTheater(null);
    } catch (error) {
      console.error("Error updating theater:", error);
    }
  };

  const handleDeleteTheater = async (id) => {
    try {
      await deleteTheater(parseInt(id));
      alert("Theater Deleted Successfully!");
      await loadTheaters();
      // setTheaters(theaters.filter((theater) => theater.theater_id !== id));
    } catch (error) {
      console.error("Error deleting theater:", error);
    }
  };

  const handleEdit = (theater) => {
    setSelectedTheater(theater);
  };

  const resetForm = () => {
    setSelectedTheater(null);
    setNewTheater({ name: "", location: "", capacity: "" });
  };

  return (
    <div className="manage-theaters-container">
      <h2>Manage Theaters</h2>

      {/* Add Theater Form */}
      <form onSubmit={handleAddTheater} className="theater-form">
        <h3>Add New Theater</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newTheater.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newTheater.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={newTheater.capacity}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Theater</button>
      </form>

      {/* Update Theater Form */}
      {selectedTheater && (
        <form onSubmit={handleUpdateTheater} className="theater-form">
          <h3>Update Theater</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={selectedTheater.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={selectedTheater.location}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={selectedTheater.capacity}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Update Theater</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}

      {/* Theater Cards */}
      <div className="theater-cards">
        {theaters.length > 0 ? (
          theaters.map((theater) => (
            <div key={theater.theaterId} className="theater-card">
              <h3>{theater.name}</h3>
              <p>Location: {theater.location}</p>
              <p>Capacity: {theater.capacity}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(theater)}>Update</button>
                <button onClick={() => handleDeleteTheater(theater.theaterId)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No theaters available</p>
        )}
      </div>
    </div>
  );
};

export default ManageTheaters;
