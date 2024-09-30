import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // Import the Axios instance

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login with:", { email, password });
      const { data } = await API.post("/auth/login", { email, password });
      console.log("Login successful, token:", data.token);
      localStorage.setItem("token", data.token);
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Invalid email or password");
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
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            sx={{ mb: 3 }}
          >
            Login to your account
          </Typography>

          <Box mb={4}>
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
              variant="outlined" // Corrected variant
              name="password"
              type="password"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
              backgroundColor: "secondary.main",
              ":hover": { backgroundColor: "secondary.dark" },
              fontSize: "1.2rem",
            }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default LoginForm;
