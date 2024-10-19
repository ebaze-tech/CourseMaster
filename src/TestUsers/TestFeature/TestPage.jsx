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
  CircularProgress,
  Alert,
  Grid2,
} from "@mui/material";
import API from "../../api";
import Timer from "../Miscellaneous/Timer";

const TestForm = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timerStopped, setTimerStopped] = useState(false);
  const [score, setScore] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false); // Loader for the submit action
  const [fetchError, setFetchError] = useState(null); // Error handling for fetching questions
  const [isHolding, setIsHolding] = useState(false); // Holding state
  const [showResults, setShowResults] = useState(false); // To display results after holding

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await API.get(`/test/questions/${category}`);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setFetchError("Failed to fetch questions. Please try again.");
      }
    };

    fetchQuestions();
  }, [category]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while submitting
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
      setScore(data.totalScore);
      setResult(data.answers);
      setIsHolding(true); // Show "Hold on to view your result" page after submission

      // After 3 seconds, show the result page
      setTimeout(() => {
        setIsHolding(false);
        setShowResults(true); // Show result page
      }, 5000); // 3 seconds delay before showing the results
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit the test. Please try again.");
    } finally {
      setLoading(false); // Stop loading when submission is done
    }
  };

  const handleTimeUp = useCallback(() => {
    setSubmitted(true);
    setTimerStopped(true);
  }, []);

  // If the user is in the "holding" stage
  if (isHolding) {
    return (
      <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" color="black" gutterBottom>
          Hold on to view your result...
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  // If the user has submitted and the results should be shown
  if (showResults) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h5" color="black" gutterBottom>
          Your Score {score}
        </Typography>
        <Typography variant="h6" color="black" gutterBottom>
          Results
        </Typography>

        <Box>
          {Array.isArray(result) && result.length > 0 ? (
            result.map((r) => {
              const question = questions.find((q) => q._id === r.questionId);
              return (
                <Box
                  key={r.questionId}
                  p={2}
                  mb={2}
                  boxShadow={2}
                  borderRadius={2}
                  bgcolor={r.isCorrect ? "success.light" : "error.light"}
                  color="white"
                >
                  <Typography variant="body1">
                    Question: {question?.questionText || "Question not found"}
                  </Typography>
                  <Typography variant="body2">
                    Your Answer: {r.answer}
                  </Typography>
                  <Typography variant="body2">
                    Correct Answer: {r.correctAnswer}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {r.isCorrect ? "✔️ Correct" : "❌ Incorrect"}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <Typography>No results available</Typography>
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container id="test-page" maxWidth="md" sx={{ mt: 5, color: "black" }}>
      <Grid2 container spacing={3} justifyContent="center">
        <Grid2 item xs={12} md={6}>
          <Typography variant="h4" gutterBottom align="center">
            {category} Test
          </Typography>
        </Grid2>
        <Grid2 item xs={12} md={6} textAlign="center">
          <Timer initialSeconds={7200} onTimeUp={handleTimeUp} />
        </Grid2>
      </Grid2>

      {fetchError && <Alert severity="error">{fetchError}</Alert>}

      <form onSubmit={handleSubmit}>
        {questions.length > 0 ? (
          questions.map((question) => (
            <Box key={question._id} mb={3} p={2} boxShadow={3} borderRadius={2}>
              <Typography variant="h6" gutterBottom> 
                {question.questionText}
              </Typography>
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
          <Typography>Questions loading. Please wait....</Typography>
        )}

        <Box mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitted || timerStopped || loading}
            endIcon={loading && <CircularProgress size={24} />}
          >
            {submitted ? "Test Submitted" : "Submit Test"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default TestForm;
