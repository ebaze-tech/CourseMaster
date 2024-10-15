import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Bg from "../Components/Bg";
import Logo from "../assets/UI_LOGO.png";
import API from "../api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const navigate = useNavigate();

  // Login submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    seetError("");

    // Form input valiation
    if (!email && !password) {
      seetError("Input email and password to login.");
      return;
    }

    if (!email) {
      seetError("Email is required for login.");
    } else if (!password) {
      seetError("Password is required for login.");
      return;
    }
    const loginData = { email, password };

    try {
      setIsLoading(true);
      console.log("Submitting login details: ", loginData);
      const { data } = await API.post("/auth/login", loginData);
      console.log("Login successful, token: ", data.token);
      localStorage.setItem("token", data.token);
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login error: ", error);
      seetError(
        error.response?.data?.message ||
          "Server error. Please refresh the page."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Swipeable lbrary config for swiping gesture
  const handlers = useSwipeable({
    onSwipedUp: () => setShowLoginForm(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <div className="body" {...handlers}>
      <div className="container">
        <div className="left-item">
          <img className="logo" src={Logo} alt="University of Ibadan Logo" />
          <h1>THE UNIVERSITY OF IBADAN TEST PLATFORM</h1>
        </div>
        <div className="right-item">
          <div className="right-item-top">
            <h1 className="right-item-text">Login</h1>
            <p>Login with your student email and matric number as password.</p>
          </div>
          {error && <p className="login-error">{error}</p>}
          <form noValidate className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              aria-label="Email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              required
            />
            <button
              type="submit"
              role="button"
              className="submit-btn"
              disabled={isLoading}
              aria-live="polite"
            >
              {isLoading ? "Please wait...." : "Login"}
            </button>
          </form>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
