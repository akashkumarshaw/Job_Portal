import React from "react";
import { Navigate } from "react-router-dom";

const EmployerRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || (user.role !== "employer" && user.role !== "admin")) {
    return <Navigate to="/" />;
  }

  return children;
};

export default EmployerRoute;
