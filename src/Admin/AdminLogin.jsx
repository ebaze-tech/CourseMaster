import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid2,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // Import the Axios instance

const AdminLoginForm = () => {
  const [adminNumber, setAdminNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting admin login with:", { adminNumber, password });
      const { data } = await API.post("/auth/admin/login", {
        adminNumber,
        password,
      });
      console.log("Login successful, token:", data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard"); // Adjust the navigation path as needed
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Invalid admin number or password"
      );
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "100px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Login
        </Typography>

        <TextField
          label="Admin Number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={adminNumber}
          onChange={(e) => setAdminNumber(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        {/* <Grid2 container justifyContent="center">
          <Grid2 item>
            <Link
              to="/admin/register" // Adjust the path for admin registration if needed
              style={{ textDecoration: "none", color: "blue" }}
            >
              Don't have an admin account? Sign up
            </Link>
          </Grid2>
        </Grid2> */}
      </Box>
    </Container>
  );
};

export default AdminLoginForm;
