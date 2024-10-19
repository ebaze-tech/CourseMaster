import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

const ViewTestSchedule = () => {
  const [viewOneTest, setViewOneTest] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleViewOneTestSchedule = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/schedule/user/testschedule/${id}`);
        setViewOneTest(response.data);
      } catch (error) {
        console.error("Error fetching schedule: ", error);
        setError(error.message ? error.message : "Server Error.");
      } finally {
        setLoading(false);
      }
    };
    handleViewOneTestSchedule();
  }, [id]);
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="middle-section-bottom-bottom-item">
        <h3>
          Course:
          {viewOneTest.course ? viewOneTest.course : "No course available"}
        </h3>
        <p>
          Lecturer:
          {viewOneTest.lecturerName
            ? viewOneTest.lecturerName
            : "Empty lecturer name"}
        </p>
        <p>
          Description:
          {viewOneTest.description
            ? viewOneTest.description
            : "Empty description"}
        </p>
        <p>Time: {viewOneTest.time ? viewOneTest.time : "Empty time"}</p>
        <p>
          Duration:
          {viewOneTest.duration ? viewOneTest.duration : "Empty duration"}
        </p>
        <button></button>
      </div>
    </div>
  );
};

export default ViewTestSchedule;
