import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import API from "../../api";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/admin/register", formData);
      navigate("/login/admin");
      setSnackbar({
        open: true,
        message: "Admin registered successfully!",
        severity: "success",
      });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Registration failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "90vw",
        height: "50vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Admin Registration
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            sx={{ mb: 3 }}
          >
            Register a new admin by filling out the form below.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                value={formData.fullName}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "10px",
                backgroundColor: "secondary.main",
                ":hover": { backgroundColor: "secondary.dark" },
              }}
            >
              Register Admin
            </Button>
          </form>
        </motion.div>
      </Paper>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminRegisterForm;
