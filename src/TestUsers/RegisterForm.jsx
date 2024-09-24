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

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", { username, email, password });
      navigate("/login"); // Redirect to login after registration
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
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
          Register
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Sign Up
        </Button>

        <Grid2 container justifyContent="center">
          <Grid2 item>
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              Already have an account? Sign in
            </Link>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default RegisterForm;
