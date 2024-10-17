import React, { useState, useContext } from "react"; // Import useContext
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import Logo from "../assets/UI_LOGO.png";
import API from "../api";
import { AuthContext } from "../token"; // Import AuthContext
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Fixed typo from 'seetError'
  const [isLoading, setIsLoading] = useState(false);
  // const [showLoginForm, setShowLoginForm] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get the login function from AuthContext

  // Login submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form input validation
    if (!email && !password) {
      setError("Input email and password to login.");
      return;
    }

    if (!email) {
      setError("Email is required for login.");
      return;
    } else if (!password) {
      setError("Password is required for login.");
      return;
    }

    const loginData = { email, password };

    try {
      setIsLoading(true);
      console.log("Submitting login details: ", loginData);
      const { data } = await API.post("/auth/login", loginData);
      if (data.token) {
        login(data.token);
        navigate("/user/dashboard");
      } else {
        setError("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login error: ", error);
      if (error.response) {
        setError(
          error.response?.data?.message ||
            "Server error. Please refresh the page."
        );
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Swipeable library config for swiping gesture
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
          <form noValidate className="login-form" onSubmit={handleSubmit}>
            {error && <p className="login-error">{error}</p>}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
