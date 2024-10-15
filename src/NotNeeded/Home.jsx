import React from "react";
// import TypingEffect from "./TypingEffect";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // Import the icon
import { TypeAnimation } from "react-type-animation";
import "./Home.css"

import Test3 from "../assets/test3.jpg";
import Test4 from "../assets/test4.jpg";
const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <div className="whole-container">
      {/* Left Section: Text and Instructions */}
      <div className="left-container">
        <div className="welcome-section">
          {/* Welcome and Title Section */}
          <div className="first-text">
            <h1 className="">
              Welcome to</h1><TypeAnimation sequence={[' The University of Ibadan....', 700, ' The First!', 700, ' And Certainly The Best!', 700]} speed={200} style={{ fontSize: '2em', color: "#4A90E2" }} repeat={Infinity} />
            <h1>Test Platform</h1>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="instructions-section">
          <p >
            This platform is designed to facilitate a seamless testing
            experience for students. Here, you will be able to access and
            complete your scheduled tests and assessments with ease.
          </p>

          <div className="instructions-list">
            <h2 className="instructions">
              <strong>Instructions</strong>
            </h2>
            <ul className="instructions-list-li">
              <li>
                <p>
                  <strong>Login</strong>: Use your university matric number and
                  password to log in.
                </p>
              </li>
              <li>
                <p>
                  <strong>Select Test</strong>: Once logged in, select the test
                  you are scheduled to take.
                </p>
              </li>
              <li>
                <p>
                  <strong>Test Timing</strong>: Each test has a set duration,
                  and the timer will start as soon as you begin.
                </p>
              </li>
              <li>
                <p>
                  <strong>Submit</strong>: Ensure you review your answers and
                  submit before the timer ends.
                </p>
              </li>
            </ul>
          </div>
          <div className="instructions-conclusion">
            <p className="">
              Good luck with your tests, and remember to follow all instructions
              carefully! <br />
              If you encounter any issues, contact the technical support team via{" "}
              <i>
                <a href="#" className="">
                  info@items.ui.edu.ng
                </a>
              </i>
            </p>
          </div>
        </div>
      </div>
      {/* Right Section: Image */}
      <div className="right-container">
        <div className="right-container-images">
          <img
            src={Test3}
            alt="Student"
          />
          <img
            src={Test4}
            alt="Student"
            className="right-container-images image-2"
          />
        </div>
        <div className="right-container-btn">
          <button
            onClick={handleSubmit}>
            <p className="right-container-p">Login</p> <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="icon"
            />
          </button>
        </div>
      </div>
    </div >
  );
};

export default Home;
