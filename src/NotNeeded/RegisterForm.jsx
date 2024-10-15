import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid2,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // Import the Axios instance
import { motion } from "framer-motion"; // Ensure you import motion if you're using it

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
    <Container
      maxWidth="lg"
      sx={{
        width: "90vw",
        // height: "72vh",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "black",
        fontWeight: "bolder",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={10}
        sx={{ padding: 3, borderRadius: 3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color="primary"
            sx={{ fontWeight: "bold", fontSize: "2rem" }}
          >
            Register
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            sx={{ mb: 3 }}
          >
            Create an account
          </Typography>

          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          <Box mb={2}>
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
          </Box>

          <Box mb={2}>
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
          </Box>

          <Box mb={2}>
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
          </Box>

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
            sx={{
              padding: "10px",
              backgroundColor: "secondary.main",
              ":hover": { backgroundColor: "secondary.dark" },
              fontSize: "1.2rem",
            }}
          >
            Sign Up
          </Button>

          <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
            <Grid2 item>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid2>
          </Grid2>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
