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
import PROFILEPICTURE from "../assets/PROFILEPICTURE.png";
import API from "../api";
import ErrorPage from "./ErrorPage";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

const Userdashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [timeData, setTimeData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const { user } = useContext(AuthContext);
  const userId = user ? user.id : null;

  // Fetch date and time on dashboard load
  useEffect(() => {
    const fetchDashboardDate = async () => {
      setLoading(true);
      try {
        const response = await API.get("/current-datetime");
        setTimeData(response.data);
        localStorage.setItem("timeData", JSON.stringify(response.data));
      } catch (error) {
        setError(
          "Unable to load current date and time. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardDate();
  }, []);

  // Fetch user data when component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      return;
    }

    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID not found.");
        return;
      }
      setLoading(true);
      try {
        const response = await API.get(`/userdetail/fetchuser/${userId}`);
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  // Fetch schedules based on search query
  useEffect(() => {
    const fetchTestSchedules = async () => {
      if (!selectedMonth && !selectedWeek && !selectedDay) return;

      setLoading(true);
      try {
        let query = [];
        if (selectedMonth) query.push(`month=${selectedMonth}`);
        if (selectedWeek) query.push(`week=${selectedWeek}`);
        if (selectedDay) query.push(`day=${selectedDay}`);

        const queryString = query.length ? `?${query.join("&")}` : "";
        const response = await API.get(`/schedule/previous${queryString}`);

        if (!response.data || response.data.length === 0) {
          setError("No test schedule found for selected query.");
        } else {
          setScheduleData(response.data);
        }
      } catch (error) {
        setError(
          "Unable to load previous test schedules. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestSchedules();
  }, [selectedMonth, selectedWeek, selectedDay]);

  // Refresh the schedule
  const handleRefresh = () => {
    setSelectedMonth("");
    setSelectedWeek("");
    setSelectedDay("");
    // setScheduleData([]);
    setError(null);
  };
  const handleReload = () => {
    window.location.reload();
  };
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
      } finally {
        setLoading(false);
      }
    };
    fetchUserScheduleData();
  }, []);

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
            <div className="userdetails">
              <p>{userData.username}</p>
              <p>{userData.email}</p>
            </div>
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
          <div className="left-section-bottom-items">
            <p>&copy; University of Ibadan 2024</p>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      <section className="middle-section">
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
          <div className="scheduleselect">
            <div className="search">
              <div className="month">
                <label>Month</label>
                <input
                  type="text"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  placeholder="YYYY-MM"
                />
              </div>
              <div className="week">
                <label>Week</label>
                <input
                  type="text"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  placeholder="YYYY-WW"
                />
              </div>
              <div className="day">
                <label>Day</label>
                <input
                  type="text"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
            <div className="btn">
              <button className="refresh" onClick={handleRefresh}>
                Refresh Schedules
              </button>
              <button className="reload" onClick={handleReload}>
                Reload Page
              </button>
            </div>
          </div>
        </div>

        <div className="middle-section-bottom">
          {/* <div className="middle-section-bottom-top">
            <h2 className="text">
              {timeData.formattedMonth ? timeData.formattedMonth : "Loading..."}
            </h2>
          </div> */}
          <div className="middle-section-bottom-bottom">
            {loading ? (
              <p className="middle-section-bottom-bottom-item-loading">
                Loading...
              </p>
            ) : error ? (
              // <p className="middle-section-bottom-bottom-item-error">{`Error: ${error}`}</p>
              <ErrorPage />
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
      <section className="right-section">
        <div className="right-section-top">
          <h1>Discussion Forum</h1>

          <div>
            <SearchOutlined/>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div></div>
        <div></div>
      </section>
    </div>
  );
};

export default Userdashboard;
