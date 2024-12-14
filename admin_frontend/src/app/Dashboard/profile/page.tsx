"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { FiLogOut } from "react-icons/fi";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    // Log out the user (you can clear session data here if necessary)
    console.log("User logged out");

    // Redirect to login page
    router.push("/"); // Make sure this path matches your login page route
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-4">
            <div>
              {/* Displaying the static "admin" username */}
              <h2 className="text-2xl font-bold text-gray-900">Admin</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FiLogOut className="w-4 h-4 mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
}
