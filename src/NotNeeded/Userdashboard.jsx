import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserDashboard = () => {
  const [testLink, setTestLink] = useState("");
  const [scores, setScores] = useState([]);
  const [topScores, setTopScores] = useState([]);
  const [pieData, setPieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (testLink) {
      navigate(testLink); // Redirect user to the test interface
    } else {
      alert("Please enter a valid test link.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user-specific test results and top scores
        const [scoresResponse, topScoresResponse, pieDataResponse] =
          await Promise.all([
            API.get("/dashboard/user/test/results"),
            API.get("/dashboard/user/test/top10"),
            API.get("/dashboard/user/test/pieData"),
          ]);

        setScores(scoresResponse.data);
        setTopScores(topScoresResponse.data);

        // Prepare pie chart data for score distribution
        const pieChartData = {
          labels: pieDataResponse.data.labels,
          datasets: [
            {
              label: "Scores Distribution",
              data: pieDataResponse.data.values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#E6E6E6",
                "#FF9F40",
                "#E7E9ED",
                "#C9CBCF",
                "#C1C1C1",
                "#A8A8A8",
                "#6C757D",
              ],
            },
          ],
        };

        setPieData(pieChartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary"
        fontWeight="bold"
      >
        Welcome to your Dashboard
      </Typography>{" "}
      <Typography variant="h6" gutterBottom>
        Paste the test link below to take a test
      </Typography>
      <form onSubmit={handleTestSubmit}>
        <TextField
          label="Test Link"
          variant="outlined"
          fullWidth
          value={testLink}
          onChange={(e) => setTestLink(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ fontSize: "1.5rem", marginTop: "2rem" }}
          fullWidth
        >
          Take Test
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ fontSize: "1.5rem", marginTop: "2rem" }}
          fullWidth
          component={Link}
          to="/test/category"
        >
          Start Test
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "1.2rem",
            marginTop: "2rem",
          }}
          component={Link}
          to="/user/test/result/all"
        >
          View My Test Results
        </Button>
      </form>
      {error && (
        <Typography
          variant="body1"
          color="error"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
      <Grid2
        container
        justifyContent="center"
        spacing={2}
        sx={{ mt: 4 }}
      ></Grid2>
      <Grid2 container spacing={4}>
        {/* Metric View of Scores */}
        <Grid2 item xs={12} md={6} lg={4}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardHeader title="Total Tests Taken" />
            <CardContent>
              <Typography
                variant="h5"
                color="secondary"
                align="center"
                fontWeight="bold"
              >
                {scores.length} Tests
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Top 10 Scores */}
        <Grid2 item xs={12} md={6} lg={4}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardHeader title="Top 10 Scores" />
            <CardContent>
              {topScores.length > 0 ? (
                <Bar
                  data={{
                    labels: topScores.map((score) =>
                      score.userId ? score.userId.username : "Unknown User"
                    ),
                    datasets: [
                      {
                        label: "Scores",
                        data: topScores.map((score) => score.totalScore),
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54,162,235,1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: "#6c757d",
                        },
                      },
                      x: {
                        ticks: {
                          color: "#6c757d",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <Typography align="center">No top scores available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid2>

        {/* Pie Chart of Results */}
        <Grid2 item xs={12} md={6} lg={4}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardHeader title="Performance Distribution" />
            <CardContent>
              {pieData.labels ? (
                <Pie data={pieData} />
              ) : (
                <Typography align="center">
                  No data available for the pie chart
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default UserDashboard;
