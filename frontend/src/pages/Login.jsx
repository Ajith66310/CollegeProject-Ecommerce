import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { token, setToken, navigate } = useContext(ShopContext);

  // If a token already exists, redirect the user away from the Login page immediately
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(`${currentState} successful!`);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onForgotPasswordHandler = async (event) => {
    event.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be 8+ chars, including a letter, number, and symbol");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`, {
        email,
        newPassword,
      });
      if (response.data.success) {
        toast.success("Password updated successfully");
        setShowForgotPassword(false);
        setCurrentState("Login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      {!showForgotPassword ? (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 shadow-sm rounded-lg"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-2">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          {currentState === "Sign Up" && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-800 outline-none"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-800 outline-none"
            required
          />

          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-800 pr-10 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p
              className="cursor-pointer hover:text-black transition-colors"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot your password?
            </p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:text-black transition-colors font-medium"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer hover:text-black transition-colors font-medium"
              >
                Login
              </p>
            )}
          </div>

          <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4 w-full sm:w-auto active:bg-gray-700 transition-colors">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      ) : (
        /* Forgot Password Form */
        <form
          onSubmit={onForgotPasswordHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 shadow-sm rounded-lg"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-2">
            <p className="prata-regular text-2xl">Reset Password</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Verify Email"
            className="w-full px-3 py-2 border border-gray-800 outline-none"
            required
          />

          <div className="relative w-full">
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-800 pr-10 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4 w-full">
            Reset Password
          </button>
          
          <p
            className="cursor-pointer text-sm mt-2 underline"
            onClick={() => setShowForgotPassword(false)}
          >
            Back to Login
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;