import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = decodeJWT(token);
        // Check if the token is valid and has not expired
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(decoded); // Assuming the token contains user information
        } else {
          // Handle token expiration
          logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
  }, []);

  const login = (token, user) => {
    console.log("Storing token: ", token);
    localStorage.setItem("token", token); // Store the token only
    const decoded = decodeJWT(token); // Decode the token to extract user info
    setIsAuthenticated(true);
    setUser({ ...decoded, ...user }); // Store the decoded user information (from the token)
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setIsAuthenticated(false);
    setUser(null);
  };

  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1]; // Get the payload part
      const decodedPayload = JSON.parse(atob(payload)); // Decode base64 and parse JSON
      return decodedPayload; // Return the decoded payload (contains user info like id, etc.)
    } catch (error) {
      console.error("Invalid token format", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
