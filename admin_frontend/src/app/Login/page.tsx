"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import logo from "../../assets/siwalogo.png"; // Path to your logo

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Next.js router for navigation

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple input validation
    if (!username || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      // Clear previous error messages
      setErrorMessage("");

      // Log the data before sending it
      console.log("Sending data:", { username, password });

      // Send login request to the server
      const response = await axios.post("http://192.168.29.106:3001/", {
        username,
        password,
      });

      console.log("Response:", response); // Check the full response for debugging

      // If login is successful, store the token (or any user info you need)
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);

        // Clear the input fields
        setUsername("");
        setPassword("");

        // Redirect to the dashboard page
        router.push("/Dashboard/upcomingevents");
      }
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        setErrorMessage(
          `Error: ${error.response.data.message || "Something went wrong."}`
        );
      } else if (error.message) {
        setErrorMessage(`Network error: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" width={160} height={160} />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
