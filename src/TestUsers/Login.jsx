import React from "react";
import Bg from "../Components/Bg";
import Logo from "../assets/UI_LOGO.png";

const Login = () => {
    return (
        <div className="relative w-full h-screen">
            {/* Background Swiper Component */}
            <Bg className="absolute inset-0 z-0" />

            {/* Login Form Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-12 bg-gray-700  bg-opacity-75">
                <div className="flex flex-row rounded-[1.8rem] bg-[#DCEDFF]  items-center border-black border-r-2 justify-center ">
                    <div className="flex flex-col w-5/6 items-center justify-center text-center">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-1/2 h-1/2 mb-6 items-center justify-center"
                        />
                        <h1 className="pt-6 text-[2em] text-center items-center justify-center">
                            UI Test Platform
                        </h1>{" "}
                    </div>
                    <div className="flex flex-col h-[30rem] items-center w-5/6 bg-white border-l-2 border-black rounded-r-[1.8rem]  p-8  shadow-lg">
                        <h1 className="text-center text-[2rem]">Login</h1>
                        <p className="text-[1.2rem] items-center justify-center text-left">
                            Login using your student mail as the username and matric number as
                            the password
                        </p>
                        <form className="mt-4 p-4 items-center justify-center">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full p-2 h-[3.2rem] border rounded-[0.8rem] border-gray-300 "
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className=" w-full p-2 mt-10 h-[3.2rem] rounded-[0.8rem] border border-gray-300 "
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#65b0ff] text-white p-2 rounded-[0.8rem] mt-10 h-[3.2rem] text-center items-center justify-center text-[1.5rem]  hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
