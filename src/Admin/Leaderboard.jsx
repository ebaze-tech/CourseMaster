import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import API from "../api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await API.get("/admin/leaderboard");
        console.log("Leaderboard data:", data); // Log the data for debugging
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError(
          error.response?.data?.message || "Error fetching leaderboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Total Score</TableCell>
              <TableCell>Tests Taken</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.userDetails.username}</TableCell>
                  <TableCell>{user.totalScore}</TableCell>
                  <TableCell>{user.count}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  No leaderboard data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
