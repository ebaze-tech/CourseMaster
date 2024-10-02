// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import TypingEffect from "./TypingEffect";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Light background
        color: "black",
        marginTop: "11rem",
        width: "100vw",
        // overflow: "hidden",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          color: "black",
        }}
      >
        {/* Animated Introduction Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            fontSize="2.5rem"
            gutterBottom
          >
            Welcome to
            <TypingEffect />
            <Typography variant="h5" component="span">
              Test Platform
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            fontSize="1.5rem"
            marginTop="1.5rem"
            gutterBottom
          >
            Proceed to your platform account
          </Typography>
        </motion.div>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                padding: "10px 40px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                backgroundColor: "darkviolet",
                height: "4rem",
                borderRadius: "0.8rem",
                "&:hover": {
                  // Apply hover effect
                  backgroundColor: "blueviolet", // Change background color on hover
                  color: "white", // Change text color on hover
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="success"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                padding: "10px 40px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderColor: "black",
                color: "white",
                height: "4rem",
                borderRadius: "0.8rem",
                backgroundColor: "green",
                "&:hover": {
                  // Apply hover effect
                  backgroundColor: "lightgreen", // Change background color on hover
                  color: "white", // Change text color on hover
                },
              }}
            >
              Register
            </Button>
          </Box>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "40px",
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              marginTop: "4rem",
              textAlign: "left",
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              Why Choose Us?
            </Typography>
            <Typography variant="h6" paragraph>
              🚀 <strong>Boost Your Knowledge:</strong> Take specialized tests
              designed by experts to sharpen your skills and knowledge.
            </Typography>
            <Typography variant="h6" paragraph>
              💼 <strong>Industry-Driven:</strong> Our tests are tailored to
              real-world scenarios to prepare you for future opportunities.
            </Typography>
            <Typography variant="h6" paragraph>
              📈 <strong>Track Your Progress:</strong> Review your past
              performances and monitor improvements over time.
            </Typography>
            <Typography variant="h6" paragraph>
              🔗 <strong>Seamless Experience:</strong> Just sign up, login, and
              paste the test link to get started with your next test!
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
