// Loader.js
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <CircularProgress size={60} color="primary" />
      <Typography variant="h6" color="textSecondary" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
