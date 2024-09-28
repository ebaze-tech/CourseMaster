import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Slide,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { green, red, grey } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useParams } from "react-router-dom";
import API from "../api";

const TestDetails = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await API.get(`/test/submitted/${id}`);
        setTest(data);
      } catch (error) {
        console.error("Error fetching test details:", error);
        setError(
          error.response?.data?.message || "Error fetching test details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        Test Details
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {test && (
        <Box>
          {/* Test Summary */}
          <Box
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: grey[100],
            }}
          >
            <Typography variant="h6" color="textPrimary" mb={2}>
              Test: {test.testName || "Unnamed Test"} (ID: {test._id})
            </Typography>
            <Typography color="textSecondary">
              Submitted At: {new Date(test.createdAt).toLocaleString()}
            </Typography>
            <Typography color="textSecondary" mt={1}>
              Total Score: <Chip label={test.totalScore} color="primary" />
            </Typography>
          </Box>

          {/* Answers Section */}
          <Typography variant="h5" gutterBottom>
            Answers
          </Typography>

          {test.answers.map((answer) => (
            <Slide
              direction="up"
              in
              key={answer._id}
              mountOnEnter
              unmountOnExit
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" alignItems="center">
                    <Typography sx={{ fontWeight: "bold", flexGrow: 1 }}>
                      {answer.questionId?.questionText ||
                        "Question text unavailable"}
                    </Typography>
                    {/* Correct/Incorrect Indicator */}
                    {answer.isCorrect ? (
                      <CheckCircleIcon sx={{ color: green[500], ml: 2 }} />
                    ) : (
                      <CancelIcon sx={{ color: red[500], ml: 2 }} />
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <strong>Your Answer:</strong>{" "}
                    {answer.answer || "No answer provided"}
                  </Typography>
                  <Typography>
                    <strong>Correct Answer:</strong>{" "}
                    {answer.correctAnswer || "No correct answer provided"}
                  </Typography>
                  <Typography>
                    <strong>Category:</strong>{" "}
                    {answer.questionId?.category || "No category provided"}
                  </Typography>
                  {/* Display possible answers only for objective questions */}
                  {answer.questionId?.options?.length > 0 && (
                    <>
                      <Typography variant="body2" mt={2} mb={1}>
                        Possible Answers:
                      </Typography>
                      <Box ml={3}>
                        <ul style={{ listStyleType: "circle" }}>
                          {answer.questionId.options.map((option, index) => (
                            <li key={index}>{option}</li>
                          ))}
                        </ul>
                      </Box>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </Slide>
          ))}

          <Divider sx={{ mt: 4 }} />
        </Box>
      )}
    </Container>
  );
};

export default TestDetails;
