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
import { Link } from "react-router-dom";

const SubmittedTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get("/test/submitted");
        setTests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setError(error.response?.data?.message || "Error fetching tests");
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Submitted Tests
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Test Category</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.length > 0 ? (
              tests.map((test) => (
                <TableRow key={test._id}>
                  <TableCell>
                    {test.userId ? test.userId.username : "Unknown User"}
                  </TableCell>
                  <TableCell>{test.category}</TableCell>
                  <TableCell>
                    {new Date(test.submittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/tests/${test._id}`}>View Test</Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography>No tests submitted yet.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SubmittedTests;
