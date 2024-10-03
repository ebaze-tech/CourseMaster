import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bg from "../Components/Bg";
import Logo from "../assets/UI_LOGO.png";
import API from "../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error state
        setError("");

        // Validate inputs
        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        const loginData = { email, password };

        try {
            setIsLoading(true); // Start loading
            console.log("Submitting login details: ", loginData);
            const { data } = await API.post("/auth/login", loginData);
            console.log("Login successful, token:", data.token);
            localStorage.setItem("token", data.token);
            navigate("/user/dashboard");
        } catch (error) {
            console.error("Login error: ", error);
            setError(error.response?.data?.message || "Invalid email or password.");
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="relative w-full h-screen">
            {/* Background Swiper Component */}
            <Bg className="absolute inset-0 z-0" />

            {/* Login Form Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-12 bg-gray-700 bg-opacity-75">
                <div className="flex flex-row rounded-[1.8rem] bg-[#DCEDFF] items-center border-black border-r-2 justify-center">
                    <div className="flex flex-col w-5/6 items-center justify-center text-center">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-1/2 h-auto mb-6"
                        />
                        <h1 className="pt-6 text-[2em]">UI Test Platform</h1>
                    </div>
                    <div className="flex flex-col h-[30rem] items-center w-5/6 bg-white border-l-2 border-black rounded-r-[1.8rem] p-8 shadow-lg">
                        <h1 className="text-center text-[2rem]">Login</h1>
                        <p className="text-[1.2rem] text-left">
                            Login using your student mail and matric number as
                            the password.
                        </p>
                        <form className="mt-4 p-4" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 h-[3.2rem] border rounded-[0.8rem] border-gray-300"
                                aria-label="Email" // Accessibility improvement
                                required // Ensures that the input is required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 mt-10 h-[3.2rem] rounded-[0.8rem] border border-gray-300"
                                aria-label="Password" // Accessibility improvement
                                required // Ensures that the input is required
                            />
                            <button
                                type="submit"
                                className={`w-full bg-[#65b0ff] text-white p-2 rounded-[0.8rem] mt-10 h-[3.2rem] text-[1.5rem] hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading} // Disable button while loading
                            >
                                {isLoading ? "Logging in..." : "Login"} {/* Update button text based on loading state */}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
