import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import API from "../api";
import Timer from "./Timer";

const TestForm = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timerStopped, setTimerStopped] = useState(false);
  const [score, setScore] = useState(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await API.get(`/test/questions/${category}`);
        console.log("Fetched questions:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/test/submit", {
        category,
        answers: Object.keys(answers).map((questionId) => ({
          questionId,
          answer: answers[questionId],
        })),
      });
      setSubmitted(true);
      setTimerStopped(true);
      setScore(data.score);
      setResult(data.answers);
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit the test. Please try again.");
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
        {questions.length > 0 ? (
          questions.map((question) => (
            <Box key={question._id} mb={3}>
              <Typography variant="h6">{question.questionText}</Typography>
              {question.questionType === "objective" ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Options</FormLabel>
                  <RadioGroup
                    value={answers[question._id] || ""}
                    onChange={(e) => handleChange(question._id, e.target.value)}
                  >
                    {question.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <TextField
                  label="Your Answer"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={answers[question._id] || ""}
                  onChange={(e) => handleChange(question._id, e.target.value)}
                />
              )}
            </Box>
          ))
        ) : (
          <Typography>No questions available</Typography>
        )}

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

      {submitted && (
        <Box mt={4}>
          <Typography variant="h5">Your Score: {score}</Typography>
          <Typography variant="h6">Results:</Typography>
          <ul>
            {result.map((r) => (
              <li key={r.questionId}>
                <Typography variant="body1">
                  Question:{" "}
                  {questions.find((q) => q._id === r.questionId)?.questionText}
                </Typography>
                <Typography variant="body2">Your Answer: {r.answer}</Typography>
                <Typography variant="body2">
                  Correct Answer: {r.correctAnswer}
                </Typography>
                <Typography variant="body2">
                  {r.isCorrect ? "Correct" : "Incorrect"}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Container>
  );
};

export default TestForm;
