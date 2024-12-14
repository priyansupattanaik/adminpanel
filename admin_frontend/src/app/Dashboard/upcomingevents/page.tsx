"use client";

import { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiInfo } from "react-icons/fi";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.106:3001/api/events/add-event"
        ); // Update the endpoint to match your backend
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
      </div>

      {/* Events Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Events Overview
        </h2>
        <div>
          <p className="text-lg font-medium text-gray-600">
            Total Upcoming Events
          </p>
          <p className="text-3xl font-bold text-blue-600">{events.length}</p>
        </div>
      </div>

      {/* Event List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upcoming Events List
        </h2>
        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-32 h-32 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <FiCalendar className="mr-2" /> {event.date}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FiClock className="mr-2" /> {event.time}
                  </p>
                  <p className="text-gray-700 mt-2 flex items-start">
                    <FiInfo className="mr-2 mt-1" /> {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No events available.</p>
        )}
      </div>
    </div>
  );
}
