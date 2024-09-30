import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion"; // Import framer-motion for animations

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // background: "linear-gradient(135deg, #3f51b5 30%, #2196f3 90%)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <Container
        maxWidth="md"
        sx={{ textAlign: "center", color: "black", marginTop: "10rem" }}
      >
        {/* Animated Introduction Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            color="black"
            fontWeight="bold"
            marginTop={30}
            gutterBottom
          >
            Welcome to the University of Ibadan Platform
          </Typography>
          <Typography
            variant="h6"
            color="black"
            fontSize="1.5rem"
            marginTop="3rem"
            gutterBottom
          >
            Proceed to your platform account
          </Typography>
        </motion.div>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Box
            mt={4}
            justifyContent="space-between"
            alignItems="center"
            justifyItems="center"
            textAlign="center"
            gap={15}
          >
            <Button
              variant="contained"
              color="black"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                // marginRight: "20px",
                padding: "10px 40px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                backgroundColor: "blueviolet",
                height: "4rem",
                borderRadius: "0.8rem",
                marginRight:"2rem"
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="black"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                padding: "10px 20px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                backgroundColor: "green",
                height: "4rem",
                borderRadius: "0.8rem",
                marginLeft:"2rem"
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
              padding: "30px",
              backgroundColor: "#fff",
              borderRadius: "15px",
              textAlign: "left",
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              Why Choose Us?
            </Typography>
            <Typography variant="h6" prop>
              🚀 <strong>Boost Your Knowledge:</strong> Take specialized tests
              designed by experts to sharpen your skills and knowledge.
            </Typography>
            <Typography variant="h6" prop>
              💼 <strong>Industry-Driven:</strong> Our tests are tailored to
              real-world scenarios to prepare you for future opportunities.
            </Typography>
            <Typography variant="h6" prop>
              📈 <strong>Track Your Progress:</strong> Review your past
              performances and monitor improvements over time.
            </Typography>
            <Typography variant="h6" prop>
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
