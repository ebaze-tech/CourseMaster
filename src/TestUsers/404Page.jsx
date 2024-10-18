import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, delay: 0.2 },
  },
  exit: { x: "100vw", transition: { ease: "easeInOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: "100px" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", delay: 0.5, duration: 1 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.2,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: { yoyo: Infinity, duration: 0.4 },
  },
};

const imageVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    rotate: [0, 360],
    transition: { type: "spring", stiffness: 100, duration: 1.5 },
  },
};

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100vw",
        }}
      >
        {/* Animated Error Message */}
        <motion.div variants={textVariants}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", color: "#f50057" }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: "black", marginBottom: 2 }}
            gutterBottom
          >
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We can't seem to find the page you're looking for.
          </Typography>
        </motion.div>

        {/* Animated Image (Optional: you can replace with an image or icon) */}
        <motion.div variants={imageVariants} style={{ marginTop: "2rem" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
            alt="Error Icon"
            style={{ width: "250px" }}
          />
        </motion.div>

        {/* Animated Button with hover effect */}
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          style={{ marginTop: "3rem" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#1a237e" },
            }}
          >
            Go Back to Home
          </Button>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default NotFoundPage;
