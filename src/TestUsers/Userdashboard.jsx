import React, { useEffect, useState } from "react";
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
import PROFILEPICTURE from "../assets/PROFILEPICTURE.png";
import GHOSTPICTURE from "../assets/GHOSTPICTURE.png";
import BENZENE from "../assets/BENZENE.png";
import TESA from "../assets/TESA.png";
import NICESA from "../assets/NICESA.png";
import BACKICON from "../assets/BACKICON.svg";
import FORWARDICON from "../assets/FORWARDICON.svg";
import API from "../api";

const Userdashboard = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);

  // API REQUEST TO FETCH USER DETAILS
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsResponse = await API.get("/fetchuser/:id");
        if (!userDetailsResponse) {
          throw new Error("Failed to fetch user details");
        }
        const userDetails = await userDetailsResponse.json();
        setUserDetails(userDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  // API REQUEST TO FETCH TEST SCHEDULES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/test/all");
        if (!response) {
          throw new Error("Failed to fetch test schedule data");
        }
        const result = await response.json();
        setScheduleData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // API REQUEST TO FETCH DATE DISPLAYED ON THE DASHBOARD
  useEffect(() => {
    const fetchDashboardDate = async () => {
      try {
        const dateResponse = await API.get("/current-datetime");
        if (!dateResponse) {
          throw new Error("Failed to fetch date");
        }
        const dateData = await dateResponse.json(); // Await the JSON parsing
        setDate(dateData.datetime);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardDate();
  }, []);

  // Function to format the date into a more user-friendly format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error}</div>;

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
            <img src={NOTIFICATION} alt="" />
            <p>Notifications</p>
          </div>
          <div>
            <img src={SCHEDULE} alt="" />
            <p>Test Schedule</p>
          </div>
          <div>
            <img src={SUBMISSONS} alt="" />
            <p>Submissions</p>
          </div>
          <div>
            <img src={RESULTS} alt="" />
            <p>Results & Performance</p>
          </div>
          <div>
            <img src={DISCUSSION} alt="" />
            <p>Discussion Forum</p>
          </div>
          <div>
            <img src={STUDY} alt="" />
            <p>Study Materials & Resources</p>
          </div>
          <div>
            <img src={SUPPORT} alt="" />
            <p>Support & Help Center</p>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      <section>
        <div>
          <div>
            <h1>Welcome {userDetails.name}!</h1>
            <p>Matric No: {userDetails.number}</p>
            <p>Faculty: {userDetails.faculty}</p>
            <p>Department: {userDetails.department}</p>
            <p>Level: {userDetails.level}</p>
          </div>
          <div>
            <p>{formatDate(date)}</p> {/* Display formatted date */}
          </div>
        </div>
        <div>
          <h2>Test Schedule</h2>
          <span>
            <p>Month</p>
            <p>Week</p>
            <p>Day</p>
          </span>
        </div>
        <div>
          <div>
            <h2>
              {new Date(date).toLocaleString("default", { month: "long" })}
            </h2>
          </div>
          <div></div>
          <div></div>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section></section>
    </div>
  );
};

export default Userdashboard;
