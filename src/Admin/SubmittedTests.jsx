import React, { useState, useEffect } from "react";
import API from "../api"; // Assuming you have an Axios instance

const SubmittedTests = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get("/test/submitted");
        console.log("Fetched tests:", data);
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setError(error.response?.data?.message || "Error fetching tests");
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h1>Submitted Tests</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tests.map((test) => (
          <li key={test._id}>
            <h2>{test.testName}</h2>
            <p>Submitted at: {new Date(test.submittedAt).toLocaleString()}</p>
            <a href={`/tests/${test._id}`}>View Test</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedTests;
