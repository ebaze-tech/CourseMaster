import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path accordingly

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, user } = useAuth(); // Use context or state to get authentication status

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && user?.role === "admin" ? (
          Component
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
