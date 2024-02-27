import React from "react";
import { Navigate } from "react-router-dom";

function UserRoutes({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return userData.role === "user" ? children : <Navigate to="/" />;
}

export default UserRoutes;
