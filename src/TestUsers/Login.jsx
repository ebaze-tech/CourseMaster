import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // Import the swipeable library
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Bg from "../Components/Bg";
import Logo from "../assets/UI_LOGO.png";
import API from "../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const navigate = useNavigate();

    // Submit handler for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Input both email and password.");
            return;
        }

        const loginData = { email, password };

        try {
            setIsLoading(true);
            console.log("Submitting login details: ", loginData);
            const { data } = await API.post("/auth/login", loginData);
            console.log("Login successful, token:", data.token);
            localStorage.setItem("token", data.token);
            navigate("/user/dashboard");
        } catch (error) {
            console.error("Login error: ", error);
            setError(error.response?.data?.message || "Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    // Swipeable configuration for swipe up gesture
    const handlers = useSwipeable({
        onSwipedUp: () => setShowLoginForm(true), // When the user swipes up, show the login form
        preventDefaultTouchmoveEvent: true, // Prevent default behavior like page scrolling
        trackMouse: true, // Allow swipe detection for mouse events as well (optional)
    });

    return (
        <div className="relative w-full h-screen sm:w-full sm:h-screen">
            {/* Background Swiper Component */}
            <Bg className="absolute inset-0 z-0" />

            {/* Swipe Area - Apply swipeable handlers */}
            <div {...handlers} className="sm sm:absolute inset-0 z-10 flex flex-col items-center justify-center p-12 bg-opacity-75 font-Outfit sm:max-w-[100vw] sm:h-screen">
                <div className="flex flex-col sm:flex-row sm:bg-inherit rounded-[1.8rem] bg-[#DCEDFF] border-black border-2 sm:border-0 items-center justify-center">
                    <div className="flex flex-col w-5/6 items-center justify-center text-center sm:h-[40rem] sm:w-[35rem] sm:bg-white/30 sm:backdrop-blur-md sm:border-black sm:border-2 sm:border-white/20 sm:rounded-lg sm:p-6 sm:shadow-lg sm:mt-[20rem]">
                        <img src={Logo} alt="Logo" className="w-1/2 h-auto mb-6 sm:w-2/3" />
                        <h1 className="pt-6 text-[2em] sm:text-[2.5rem]">UI Test Platform</h1>
                    </div>

                    {/* Swipe Up Intro Animation */}
                    {!showLoginForm && (
                        <div className=" sm:flex-col sm:absolute sm:bottom-0 sm:w-[35rem] sm:h-[20vh] sm:flex sm:items-center sm:justify-center sm:bg-[#d9d9d9] sm:rounded-t-[1.8rem] sm:p-6 sm:shadow-lg sm:text-black">
                            <div className="sm:items-center sm:flex sm:flex-col sm:w-2xl"> {<ArrowUpwardIcon />}</div><p className="text-[1.9rem]">Swipe Up</p>
                            <h2 className="sm:text-[3.5rem] sm:text-center">Login</h2>
                        </div>
                    )}
                </div>
                {/* Only show login form after the swipe up gesture */}
                <div>
                    {showLoginForm && (
                        <div className="flex flex-col sm:mt-4 sm:h-auto h-full sm:w-full sm:rounded-l-[3rem] sm:rounded-r-[3rem] items-center w-5/6 bg-white/30 border-l-2 border-black rounded-r-[1.8rem] p-8 drop-shadow-2xl">
                            <p className="sm:w-[10rem] sm:border-t-[0.3rem] sm:border-black sm:mx-auto sm:my-4"></p>
                            <h1 className="text-center text-[2rem] sm:text-[2.6rem]">Login</h1>
                            <p className="text-[1.2rem] text-center sm:text-[1.8rem] mt-3">
                                Login using your student mail and matric number as the password.
                            </p>
                            <form noValidate className="mt-12 p-4" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red items-center justify-center text-white px-4 py-3 rounded mb-6 w-full text-center sm:text-[1.4rem] sm:h-[5.5rem]">
                                        {error}
                                    </div>
                                )}
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 sm:py-8 h-[3.2rem] border text-[1.rem] rounded-[0.8rem] border-gray-300 drop-shadow-xl"
                                    aria-label="Email"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 mt-10 sm:py-8 h-[3.2rem] text-[1.5rem] rounded-[0.8rem] border border-gray-300 drop-shadow-xl"
                                    aria-label="Password"
                                    required
                                />
                                <button
                                    type="submit"
                                    role="button"
                                    className={`w-full bg-[#65b0ff] items-center justify-center sm:h-24 sm:mt-8 sm:px-0 sm:items-center sm:justify-center sm:text-[2.0rem] text-black p-0.5 rounded-[0.8rem] mt-2.5 h-8 drop-shadow-xl text-[1.5rem] font-semibold tracking-wide text-center
  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a90e2] hover:shadow-lg transition-all duration-300'}`}
                                    disabled={isLoading}
                                    aria-live="polite"
                                >
                                    {isLoading ? (
                                        "Please wait..."
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
