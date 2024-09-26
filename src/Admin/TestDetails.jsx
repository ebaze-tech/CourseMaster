import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
        setLoading(false); // Ensure loading is stopped even after an error
      }
    };

    fetchTest();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Test Details
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {test && (
        <div>
          <Typography variant="h6">
            Test: {test.testName || "Unnamed Test"} (ID: {test._id})
          </Typography>
          <Typography>
            Submitted At: {new Date(test.submittedAt).toLocaleString()}
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Answers
          </Typography>

          {test.answers.map((answer) => (
            <Accordion key={answer._id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Question:{" "}
                  {answer.questionId?.questionText ||
                    "Question text unavailable"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Answer: {answer.answer || "No answer provided"}
                </Typography>
                <Typography>
                  Correct Answer:{" "}
                  {answer.correctAnswer || "No correct answer provided"}
                </Typography>
                <Typography>
                  Category: {answer.category || "No category provided"}
                </Typography>
                {answer.questionId &&
                  Array.isArray(answer.options) &&
                  answer.options.length > 0 && (
                    <>
                      <Typography>Possible Answers:</Typography>
                      <ul>
                        {answer.options.map((option, index) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ul>
                    </>
                  )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </Container>
  );
};

export default TestDetails;
