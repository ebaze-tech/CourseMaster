import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../token"; // Adjust the import path as needed
import "./Userdashboard.css";
import UILOGO from "../assets/UI_LOGO.png";
import TAKE_TEST from "../assets/TAKE_TEST.svg";
import NOTIFICATION from "../assets/NOTIFICATION.svg";
import SCHEDULE from "../assets/CALENDAR.svg";
import SUBMISSONS from "../assets/SUBMISSIONS.svg";
import RESULTS from "../assets/RESULTS.svg";
import DISCUSSION from "../assets/DISCUSSION.svg";
import STUDY from "../assets/STUDY.svg";
import SUPPORT from "../assets/UNION.svg";
import API from "../api";

const Userdashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  const { user } = useContext(AuthContext);
  const userId = user ? user.id : null;

  useEffect(() => {
    // Async function to fetch the date on dashboard
    const fetchDashboardDate = async () => {
      setLoading(true);
      try {
        const response = await API.get("/current-datetime");
        console.log(response);
        if (response.data) {
          console.log(response.data);
          setTimeData(response.data);
          localStorage.setItem("timeData", JSON.stringify(response.data));
        } else {
          throw new Error("Invalid data structure from API");
        }
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(error.message || "Error updating date");
        setLoading(false);
      }
    };
    fetchDashboardDate();
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      console.log("Stored user data: ", storedUserData);
      setUserData(JSON.parse(storedUserData));
      return;
    }

    // Async function to fetch the details of the user
    const fetchUserData = async () => {
      if (!userId) {
        console.error("User ID not found.");
        setError("User ID not found.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await API.get(`/userdetail/fetchuser/${userId}`);
        console.log(response.data);
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(error.message || "Error fetching user data");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-container">
      {/* LEFT SECTION */}
      <section>
        <div>
          <img src={UILOGO} alt="Logo of The University of Ibadan" />
          <h2>UI TEST PLATFORM</h2>
        </div>
        <div>
          <div>
            <img src={TAKE_TEST} alt="Take a test" />
            <p>Take Test</p>
          </div>
          <div>
            <img src={NOTIFICATION} alt="Notifications" />
            <p>Notifications</p>
          </div>
          <div>
            <img src={SCHEDULE} alt="Test Schedule" />
            <p>Test Schedule</p>
          </div>
          <div>
            <img src={SUBMISSONS} alt="Submissions" />
            <p>Submissions</p>
          </div>
          <div>
            <img src={RESULTS} alt="Results" />
            <p>Results & Performance</p>
          </div>
          <div>
            <img src={DISCUSSION} alt="Discussion Forum" />
            <p>Discussion Forum</p>
          </div>
          <div>
            <img src={STUDY} alt="Study Materials" />
            <p>Study Materials & Resources</p>
          </div>
          <div>
            <img src={SUPPORT} alt="Support & Help" />
            <p>Support & Help Center</p>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      <section>
        <div>
          <h1>Welcome {userData.username}!</h1>
          <p>Matric No: {userData.matricNumber}</p>
          <p>Faculty: {userData.faculty}</p>
          <p>Department: {userData.department}</p>
          <p>Level: {userData.level}</p>
        </div>
        <div>
          <p>{timeData.formattedDate}</p>
        </div>
      </section>
    </div>
  );
};

export default Userdashboard;
