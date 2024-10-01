import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Typography, Box } from "@mui/material";

const TypingEffect = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        height: "100px", // Set a fixed height to prevent content shifting
        marginTop: 5,
        marginRight: 8,
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: "#4A90E2", // Use a softer blue
          fontWeight: "bold",
          fontSize: { xs: "3.5rem", md: "5rem" }, // Double the responsive font size
          padding: 2, // Padding for spacing
          lineHeight: "1", // Reduce line height for vertical spacing
        }}
        className="text-5xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent"
        aria-live="polite" // For accessibility
      >
        <span
          style={{
            display: "inline-block",
            minWidth: "300px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typewriter
            words={["University of Ibadan", "The First", "And The Best"]}
            loop={0}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </Typography>
    </Box>
  );
};

export default TypingEffect;
