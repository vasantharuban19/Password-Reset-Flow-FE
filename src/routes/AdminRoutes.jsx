import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoutes({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return userData.role === "admin" ? children : <Navigate to="/" />;
}

export default AdminRoutes;
