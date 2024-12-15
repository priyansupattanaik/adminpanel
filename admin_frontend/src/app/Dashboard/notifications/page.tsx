"use client";

import React, { useState, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";

interface Suggestion {
  id: number;
  name: string;
  suggestion: string;
  timestamp: string; // Timestamp from the database
}

export default function Notifications() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch suggestions from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        console.log("Fetching suggestions..."); // Log to check if fetch is called
        const response = await fetch(
          "http://192.168.29.106:5001/api/suggestions"
        ); // Replace with actual API URL

        if (!response.ok) {
          throw new Error(
            `Failed to fetch suggestions: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Fetched suggestions:", data); // Log fetched data to verify format
        setSuggestions(data);
      } catch (err: any) {
        console.error("Error fetching suggestions:", err); // Log the error
        setError("Failed to fetch suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  // Format the timestamp to a readable time (relative time)
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner or message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if fetch fails
  }

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Suggestions</h1>
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="bg-white rounded-lg shadow-md">
        {suggestions.length === 0 ? (
          <div className="text-center py-12">
            <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No suggestions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no suggestions at the moment.
            </p>
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="border-b last:border-b-0 p-6 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {suggestion.name}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Suggestion: {suggestion.suggestion}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(suggestion.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
