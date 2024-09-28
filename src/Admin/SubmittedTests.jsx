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
  Slide,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import API from "../api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { grey } from "@mui/material/colors";

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

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        Submitted Tests
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: grey[200] }}>
              <TableCell>
                <Typography variant="subtitle2">Username</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Test Category</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Submitted At</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Details</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.length > 0 ? (
              tests.map((test) => (
                <Slide
                  direction="up"
                  in
                  key={test._id}
                  mountOnEnter
                  unmountOnExit
                >
                  <TableRow
                    hover
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: grey[50] },
                    }}
                  >
                    <TableCell>
                      {test.userId ? test.userId.username : "Unknown User"}
                    </TableCell>
                    <TableCell>{test.category}</TableCell>
                    <TableCell>
                      {new Date(test.submittedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/admin/tests/${test._id}`}
                        color="primary"
                        aria-label="view details"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Slide>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography align="center">
                    No tests submitted yet.
                  </Typography>
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
