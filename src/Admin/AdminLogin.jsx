import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Box,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import API from "../api";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    adminNumber: "",
    password: "",
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
      const response = await API.post("/auth/admin/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response
          ? error.response.data.message
          : "Login failed. Please check your credentials.",
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
        // height: "50vh",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Paper elevation={10} sx={{ padding: 0, borderRadius: 3 }}>
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
            Admin Login
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            sx={{ mb: 3, ontSize: "2rem" }}
          >
            Please login with your admin credentials.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <TextField
                label="Admin Number"
                name="adminNumber"
                fullWidth
                value={formData.adminNumber}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
                slotProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
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
                slotProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* <Box display="flex" justifyContent="flex-end" mb={2}>
              <Link href="#" underline="hover" color="secondary">
                Forgot password?
              </Link>
            </Box> */}

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
              Login Admin
            </Button>
          </form>
        </motion.div>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjusted position
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminLoginForm;
