import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api"; // Assuming you have an Axios instance

const TestDetails = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await API.get(`/test/submitted/${id}`);
        setTest(data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching test details"
        );
      }
    };

    fetchTest();
  }, [id]);

  return (
    <div>
      <h1>Test Details</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {test && (
        <div>
          <h2>Test ID {test._id}</h2>
          <p>
            <strong>Category</strong> {test.category}
          </p>
          <p>
            <strong>Submitted At</strong>{" "}
            {new Date(test.submittedAt).toLocaleString()}
          </p>

          <h3>User Details</h3>
          <p>
            <strong>User ID</strong> {test.userId._id}
          </p>
          <p>
            <strong>Username</strong> {test.userId.username}
          </p>
          <p>
            <strong>Email</strong> {test.userId.email}
          </p>

          <h3>Answers</h3>
          <ul>
            {test.answers.map((answer) => (
              <li key={answer._id}>
                <p>
                  <strong>Answer ID</strong> {answer._id}
                </p>
                <p>
                  <strong>Question ID</strong> {answer.questionId._id}
                </p>
                <p>
                  <strong>Answer</strong> {answer.answer}
                </p>

                <h4>Question Details</h4>
                <p>
                  <strong>Category</strong> {answer.questionId.category}
                </p>
                <p>
                  <strong>Question Text</strong>{" "}
                  {answer.questionId.questionText}
                </p>
                <p>
                  <strong>Possible Answers</strong>
                </p>
                <ul>
                  {answer.questionId.answers.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                <p>
                  <strong>Correct Answer</strong>{" "}
                  {answer.questionId.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestDetails;
