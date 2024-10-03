import React from "react";
import TypingEffect from "./TypingEffect";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // Import the icon

import Test3 from "../assets/test3.jpg";
import Test4 from "../assets/test4.jpg";
const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between  bg-gray-100 w-screen overflow-x-hidden  max-h-screen font-AfacacadFlux">
      {/* Left Section: Text and Instructions */}
      <div className="flex flex-col mt-[35rem] lg:flex-col lg:mt-{0rem}">
        {/* Welcome and Title Section */}
        <div className=" text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl text-left font-bold text-gray-700">
            Welcome to
            <TypingEffect />
            {/* className="text-6xl lg:text-5x text-left font-bold text-gray-700 */}
            Test Platform!
          </h1>
        </div>

        {/* Instructions Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <p className="text-[1.8rem] text-gray-600 ">
            This platform is designed to facilitate a seamless testing
            experience for students. Here, you will be able to access and
            complete your scheduled tests and assessments with ease.
          </p>

          <div className="mb-4">
            <h2 className="text-[2.5rem]  text-gray-800 text-left border-black">
              <strong>Instructions:</strong>
            </h2>
            <ul className=" list-inside mt-2 space-y-2 list-none text-[1.8rem]">
              <li>
                <h3>
                  <strong>Login</strong>: Use your university matric number and
                  password to log in.
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Select Test</strong>: Once logged in, select the test
                  you are scheduled to take.
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Test Timing</strong>: Each test has a set duration,
                  and the timer will start as soon as you begin.
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Submit</strong>: Ensure you review your answers and
                  submit before the timer ends.
                </h3>
              </li>
            </ul>
          </div>

          <p className="font-bold text-gray-700 text-[1.4rem]">
            Good luck with your tests, and remember to follow all instructions
            carefully!
          </p>
          <p className="mt-4 text-gray-600 font-bold text-[1.2rem]">
            If you encounter any issues, contact the technical support team via{" "}
            <i>
              <a href="#" className="text-purple-500">
                info@items.ui.edu.ng
              </a>
            </i>
          </p>
        </div>
      </div>
      {/* Right Section: Image */}
      {/* <div className="flex flex-row w-full "> */}
      <div className="flex flex-col h-fit items-center justify-center mt-[12rem]">
        <div className="flex flex-row items-center justify-center w-[50rem] h-full mr-4">
          <img
            src={Test3}
            alt="Student"
            className="w-1/2 max-w-[50rem] h-[50rem] object-cover"
          />
          <img
            src={Test4}
            alt="Student"
            className="w-1/2 max-w-[50rem] h-[50rem] object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-auto">
          <button
            onClick={handleSubmit}
            className="flex flex-row items-center justify-center gap-4 px-[22.5rem] mt-[2rem] rounded-md w-2 mr-4 bg-[#4A90E2] h-[4rem] hover:bg-gray-500 hover:text-black text-white "
          >
            <p className="text-[2rem]">Login</p>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-10 h-8 items-center justify-center"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
