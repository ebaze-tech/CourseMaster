import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import API from "../api";
import Timer from "./Timer";

const TestForm = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timerStopped, setTimerStopped] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await API.get(`/test/questions/${category}`);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  useEffect(() => {
    // Function to apply restrictions
    const applyRestrictions = () => {
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.addEventListener("copy", (event) => {
        event.clipboardData.setData("text/plain", ""); // Disable copying text
        event.preventDefault();
      });
      document.onkeydown = (e) => {
        if (
          e.keyCode === 123 ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 73)
        ) {
          e.preventDefault(); // Disable F12 and Ctrl+Shift+I
        }
      };
    };

    // Apply restrictions when component mounts
    if (document.body.id === "test-page") {
      applyRestrictions();
    }

    // Cleanup restrictions on component unmount
    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.removeEventListener("copy", (event) => {
        event.clipboardData.setData("text/plain", "");
        event.preventDefault();
      });
      document.onkeydown = null; // Restore default behavior
    };
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/test/submit", {
        category,
        answers: Object.keys(answers).map((questionId) => ({
          questionId,
          answer: answers[questionId],
        })),
      });
      setSubmitted(true);
      setTimerStopped(true); // Stop the timer on submission
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  const handleTimeUp = useCallback(() => {
    setSubmitted(true);
    setTimerStopped(true);
  }, []);

  return (
    <Container
      id="test-page"
      maxWidth="md"
      style={{ marginTop: "50px", color: "black" }}
    >
      <Typography variant="h4" gutterBottom>
        {category} Test
      </Typography>

      <Timer initialSeconds={3600} onTimeUp={handleTimeUp} />

      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <Box key={question._id} mb={3}>
            <Typography variant="h6">{question.questionText}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={answers[question._id] || ""}
              onChange={(e) => handleChange(question._id, e.target.value)}
              placeholder="Type your answer here..."
            />
          </Box>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={submitted || timerStopped}
        >
          {submitted ? "Test Submitted" : "Submit Test"}
        </Button>
      </form>
    </Container>
  );
};

export default TestForm;
