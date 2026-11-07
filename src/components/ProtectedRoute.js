import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const {loggedIn} = useContext(LoginContext);
  // const isAuthenticated = !localStorage.getItem("token");
  // console.log("inside ProtectedRoute", localStorage.getItem("token"));
  // console.log("isAuthenticated",isAuthenticated);
  // return isAuthenticated ? element : <Navigate to="/login" />;

  return loggedIn ? element : <Navigate to="/login" />;
  
};

export default ProtectedRoute;
