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
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [scores, setScores] = useState([]);
  const [topScores, setTopScores] = useState([]);
  const [pieData, setPieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch scores and top scores
        const [scoresResponse, topScoresResponse] = await Promise.all([
          API.get("/admin/scores"),
          API.get("/admin/top10"),
        ]);
        setScores(scoresResponse.data);
        setTopScores(topScoresResponse.data);

        // Fetch pie chart data
        const pieDataResponse = await API.get("/admin/pieData");
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

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid2 container spacing={3}>
        {/* Metric View of Scores */}
        <Grid2 item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Total Scores" />
            <CardContent>
              <Typography variant="h5">{scores.length} Scores</Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Top 10 Scores */}
        <Grid2 item xs={12} md={6} lg={4}>
          <Card>
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
                        data: topScores.map((score) => score.score),
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              ) : (
                <Typography>No top scores available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid2>

        {/* Pie Chart of Results */}
        <Grid2 item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Student Results Distribution" />
            <CardContent>
              {pieData.labels ? (
                <Pie data={pieData} />
              ) : (
                <Typography>No data available for the pie chart</Typography>
              )}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Grid2 container justifyContent="center">
        <Grid2 item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            component={Link}
            to="/tests"
          >
            Test Results
          </Button>{" "}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            component={Link}
            to="/leaderboard"
          >
            View Leaderboard
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default AdminDashboard;
