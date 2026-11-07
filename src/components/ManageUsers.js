import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUserById,
  updateUserById,
} from "../services/UserService"; // Import service functions
import "./Styles/ManageUsers.css";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  // Fetch all users on component mount
  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("Unexpected response format");
        }
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle user deletion
  const handleDelete = (id) => {
    deleteUserById(id)
      .then(() => {
        setUsers(users.filter((user) => user.user_id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      });
  };

  // Handle user selection for update
  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
    setShowUpdateForm(true);
  };

  // Handle input change in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for updating the user
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (selectedUser) {
      updateUserById(selectedUser.userId, updatedUser)
        .then(() => {
          setUsers(
            users.map((user) =>
              user.userId === selectedUser.userId
                ? { ...user, ...updatedUser }
                : user
            )
          );
          setShowUpdateForm(false); // Close the update form after successful update
          setSelectedUser(null); // Reset the selected user
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("Error updating user");
        });
    }
  };

  return (
    <div className="manage-users-container">
      <div className="user-list-container">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(user)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.userId)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showUpdateForm && (
          <div className="update-form-container">
            <h2>Update User</h2>
            <form onSubmit={handleSubmitUpdate}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={updatedUser.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={updatedUser.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Role:
                <input
                  type="text"
                  name="role"
                  value={updatedUser.role}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowUpdateForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;













// import React, { useEffect, useState } from "react";
// import {
//   getAllUsers,
//   deleteUserById,
//   updateUserById,
// } from "../services/UserService";
// import "./Styles/ManageUsers.css";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newUser, setNewUser] = useState({
//     username: "",
//     password: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     role: "",
//   });

//   // Load all users on component mount
//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await getAllUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (selectedUser) {
//       setSelectedUser((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else {
//       setNewUser((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle adding a new user (if applicable)
//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     // Add the logic to add a new user here
//     // Reset the form if necessary
//     alert("New user functionality can be added.");
//   };

//   // Handle updating a selected user
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     if (!selectedUser || !selectedUser.userId) {
//       console.error("User ID is missing");
//       return;
//     }
//     try {
//       await updateUserById(selectedUser.userId, selectedUser);
//       alert("User updated successfully!");
//       await loadUsers(); // Fetch updated users
//       resetForm(); // Reset the form
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   // Handle deleting a user
//   const handleDeleteUser = async (id) => {
//     try {
//       await deleteUserById(id);
//       alert("User deleted successfully!");
//       await loadUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   // Handle edit user button click
//   const handleEdit = (user) => {
//     setSelectedUser(user);
//   };

//   // Reset form state
//   const resetForm = () => {
//     setSelectedUser(null);
//     setNewUser({
//       username: "",
//       password: "",
//       email: "",
//       firstName: "",
//       lastName: "",
//       role: "",
//     });
//   };

//   return (
//     <div className="manage-users-container">
//       <h2>Manage Users</h2>

//       {/* Add User Form (if applicable) */}
//       <form onSubmit={handleAddUser} className="user-form">
//         <h3>Add New User</h3>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={newUser.username}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={newUser.firstName}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={newUser.lastName}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="role"
//           placeholder="Role"
//           value={newUser.role}
//           onChange={handleInputChange}
//           required
//         />
//         <button type="submit">Add User</button>
//       </form>

//       {/* Update User Form */}
//       {selectedUser && (
//         <form onSubmit={handleUpdateUser} className="user-form">
//           <h3>Update User</h3>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={selectedUser.username}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={selectedUser.password}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={selectedUser.email}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={selectedUser.firstName}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={selectedUser.lastName}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="text"
//             name="role"
//             placeholder="Role"
//             value={selectedUser.role}
//             onChange={handleInputChange}
//             required
//           />
//           <button type="submit">Update User</button>
//           <button type="button" onClick={resetForm}>
//             Cancel
//           </button>
//         </form>
//       )}

//       {/* User Cards */}
//       <div className="user-cards">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div key={user.userId} className="user-card">
//               <h3>{user.username}</h3>
//               <p>Email: {user.email}</p>
//               <p>First Name: {user.firstName}</p>
//               <p>Last Name: {user.lastName}</p>
//               <p>Role: {user.role}</p>
//               <div className="card-buttons">
//                 <button onClick={() => handleEdit(user)}>Update</button>
//                 <button onClick={() => handleDeleteUser(user.userId)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No users available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;
