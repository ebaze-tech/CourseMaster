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
import Forwardicon from "../assets/FORWARDICON.svg";
import Backicon from "../assets/BACKICON.svg";
import PROFILEPICTURE from "../assets/PROFILEPICTURE.png";
import API from "../api";

const Userdashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [timeData, setTimeData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  // const [ setSelectedView] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

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
          setTimeData(response.data);
          localStorage.setItem("timeData", JSON.stringify(response.data));
        } else {
          throw new Error("Invalid data structure from API");
        }
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(
          "Unable to load current date and time. Please try again later."
        );
        setLoading(false);
      }
    };
    fetchDashboardDate();
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
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

  useEffect(() => {
    // Async function to fetch test schedule
    const fetchUserScheduleData = async () => {
      setLoading(true);
      try {
        const response = await API.get("/schedule/user/testschedule");
        console.log(response);
        if (!response.data) {
          setError(() => "No schedule data available.");
          setLoading(false);
          return;
        } else if (response.data) {
          setScheduleData(response.data);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          throw new Error("Could not fetch user test schedule");
        }
      } catch (error) {
        console.error(error.message);
        setError(error.message || "Error fetching user test schedule");
        setLoading(false);
      }
    };
    fetchUserScheduleData();
  }, []);

  useEffect(() => {
    const fetchTestSchedules = async () => {
      setLoading(true);
      try {
        const response = await API.get(
          `/schedule/previous?view=${selectedView}&month=${selectedMonth}&week=${selectedWeek}&day=${selectedDay}`
        );
        console.log(response);
        if (!response.data) {
          setError(() => "No test schedule found for selected query.");
          setLoading(false);
          return;
        } else if (response.data) {
          setSchedules(response.data);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          throw new Error("Could not fetch previous test schedules");
        }
      } catch (error) {
        console.error(error);
        setError(
          "Unable to load previous test schedules. Please try again later."
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMonth || selectedWeek || selectedDay) {
      fetchTestSchedules();
    }
  }, [selectedMonth, selectedWeek, selectedDay]);

  useEffect(() => {
    if (!scheduleData && !loading) {
      setError(() => "No schedule data available. Check back later.");
    }
  }, [scheduleData, loading]);
  return (
    <div className="dashboard-container">
      {/* LEFT SECTION */}
      <section className="left-section">
        <div className="left-section-top">
          <img src={UILOGO} alt="Logo of The University of Ibadan" />
          <h2>UI TEST PLATFORM</h2>
        </div>
        <div className="left-section-bottom">
          <div className="left-section-bottom-items .user">
            <img src={PROFILEPICTURE} className="test" alt="Take a test" />
            <p className="username">{userData.username}</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={TAKE_TEST} alt="Take a test" />
            <p>Take Test</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={NOTIFICATION} alt="Notifications" />
            <p>Notifications</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={SCHEDULE} alt="Test Schedule" />
            <p>Test Schedule</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={SUBMISSONS} alt="Submissions" />
            <p>Submissions</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={RESULTS} alt="Results" />
            <p>Results & Performance</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={DISCUSSION} alt="Discussion Forum" />
            <p>Discussion Forum</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={STUDY} alt="Study Materials" />
            <p>Study Materials & Resources</p>
          </div>
          <div className="left-section-bottom-items">
            <img src={SUPPORT} alt="Support & Help" />
            <p>Support & Help Center</p>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      <section className="middle-section">
        {/* USER INFO SECTION */}
        <div className="middle-section-top">
          <div className="middle-section-top-left">
            <h1>
              Welcome {userData.username ? userData.username : "Unknown User"}!
            </h1>
            <div className="userdata">
              <div>
                <p>
                  Matric No:
                  <b>
                    {userData.matricNumber
                      ? userData.matricNumber
                      : "Loading..."}
                  </b>
                </p>
                <p>
                  Faculty:
                  <b>{userData.faculty ? userData.faculty : "Loading..."}</b>
                </p>
              </div>
              <div>
                <p>
                  Department:
                  <b>
                    {userData.department ? userData.department : "Loading..."}
                  </b>
                </p>
                <p>
                  Level: <b>{userData.level ? userData.level : "Loading..."}</b>
                </p>
              </div>
            </div>
          </div>
          <div className="date">
            <p>
              {timeData.formattedDate ? timeData.formattedDate : "Loading..."}
            </p>
          </div>
        </div>

        {/* TEST SCHEDULE SEARCH SECTION */}
        <div className="middle-section-middle">
          <h2>Test Schedule</h2>
          {/* SEARCH PREVIOUS AND FUTURE TEST SCHEDULES */}
          <div className="scheduleselect">
            <label>
              Month:
              <input
                type="text"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                placeholder="Enter month"
              />
            </label>
            <label>
              Month:
              <input
                type="text"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                placeholder="Enter week"
              />
            </label>
            <label>
              Month:
              <input
                type="text"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                placeholder="Enter day"
              />
            </label>
            <button onClick={() => {}} Search></button>
          </div>
        </div>

        <div className="middle-section-bottom">
          <div className="middle-section-bottom-top">
            <h2 className="text">
              {timeData.formattedMonth ? timeData.formattedMonth : "Loading..."}
            </h2>
            <div className="history">
              {/* SEARCH EITHER TODAY OR BY PREVIOUS HISTORY OR BY FUTURE SCHEDULES*/}
              <img
                src={Forwardicon}
                onClick={() => console.log("Backward Clicked")}
                alt="Backward"
              />
              <p>Today</p>
              <img
                src={Backicon}
                onClick={() => console.log("Forward clicked.")}
                alt="Forward"
              />
            </div>
          </div>
          <div className="middle-section-bottom-bottom">
            {loading ? (
              <p className="middle-section-bottom-bottom-item">Loading...</p>
            ) : error ? (
              <p className="middle-section-bottom-bottom-item">
                {`Error: ${error}`}
              </p>
            ) : (
              <>
                {scheduleData.map((schedule, index) => (
                  <div
                    key={index}
                    className="middle-section-bottom-bottom-item"
                  >
                    <h3>
                      Course:
                      {schedule.course
                        ? schedule.course
                        : "No course available"}
                    </h3>
                    <p>
                      Lecturer:
                      {schedule.lecturerName
                        ? schedule.lecturerName
                        : "Empty lecturer name"}
                    </p>
                    <p>
                      Description:
                      {schedule.description
                        ? schedule.description
                        : "Empty description"}
                    </p>
                    <p>Time: {schedule.time ? schedule.time : "Empty time"}</p>
                    <p>
                      Duration:
                      {schedule.duration ? schedule.duration : "Empty duration"}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="right-section">afakf a</section>
    </div>
  );
};

export default Userdashboard;
