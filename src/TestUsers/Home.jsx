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
      <div className="pl-8">
        <div className="flex flex-col mt-[2rem] ">
          {/* Welcome and Title Section */}
          <div className=" text-center lg:text-left ml-4">
            <h1 className="text-[2rem] lg:text-[2rem] text-left mr-[1rem] font-bold text-gray-700">
              Welcome to </h1>
          </div>
          <div className="mr-10">
            <TypingEffect />
          </div>
          <div className="ml-4">
            <h1 className="text-[2rem] lg:text-[2rem] text-left font-bold text-gray-700">
              Test Platform!</h1>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-3 w-[40rem]">
          <p className="text-[1.2rem] text-gray-600 ">
            This platform is designed to facilitate a seamless testing
            experience for students. Here, you will be able to access and
            complete your scheduled tests and assessments with ease.
          </p>

          <div className="text-[1.4rem] ">
            <h2 className=" text-gray-800 text-left border-black">
              <strong>Instructions:</strong>
            </h2>
            <ul className=" list-inside mt-2 space-y-2 list-none text-[1.2rem]">
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
          <div>
            <p className="font-bold text-gray-700 text-[1.2rem] ">
              Good luck with your tests, and remember to follow all instructions
              carefully!
            </p>
            <p className="mt-2 text-gray-600 font-bold text-[1.2rem]">
              If you encounter any issues, contact the technical support team via{" "}
              <i>
                <a href="#" className="text-purple-500">
                  info@items.ui.edu.ng
                </a>
              </i>
            </p>
          </div>
        </div>
      </div>
      {/* Right Section: Image */}
      <div className="flex flex-col items-center justify-center mt-12 ">
        <div className="flex flex-row items-center justify-center  pr-8 ">
          <img
            src={Test3}
            alt="Student"
            className="w-[20rem] max-w-[50rem] h-[32rem] object-cover"
          />
          <img
            src={Test4}
            alt="Student"
            className="w-[20rem] max-w-[50rem] h-[32rem] object-cover"
          />
        </div>
        <div className="flex flex-col items-center text-center justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="flex flex-row items-center justify-center text-center gap-4 px-[8.55rem]   rounded-md mr-10 bg-[#4A90E2] h-[3rem] hover:bg-gray-500 hover:text-black text-white "
          >
            <p className="text-[1.7rem]">Login</p>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}

              className="w-10 h-8 items-center justify-center"
            />
          </button>
        </div>
      </div>
    </div >
  );
};

export default Home;
