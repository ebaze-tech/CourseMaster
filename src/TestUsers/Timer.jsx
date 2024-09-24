import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";

const Timer = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (isActive && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      onTimeUp(); // Notify when time is up
    }
  }, [seconds, isActive, onTimeUp]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Box mb={3}>
      <Typography variant="h6">Time Left: {formatTime()}</Typography>
    </Box>
  );
};

export default Timer;
