"use client";

import React, { useState } from "react";
import { FiCalendar, FiMapPin, FiTrash2 } from "react-icons/fi";

// Event Interface
interface Event {
  title: string;
  date: string;
  location: string;
  status: "published" | "draft";
}

const CompletedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "React Native Workshop",
      date: "February 15th, 2024 at 10:00",
      location: "Tech Hub",
      status: "published",
    },
    {
      title: "Mobile App Design Meetup",
      date: "March 1st, 2024 at 14:00",
      location: "Design Center",
      status: "published",
    },
    {
      title: "App Launch Party",
      date: "January 10th, 2024 at 18:00",
      location: "Innovation Hub",
      status: "published",
    },
    {
      title: "Draft Event",
      date: "December 4th, 2024 at 14:20",
      location: "Draft Location",
      status: "draft",
    },
  ]);

  // Delete handler
  const handleDelete = (title: string) => {
    setEvents(events.filter((event) => event.title !== title));
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Completed Events</h1>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events
          .filter((event) => event.status === "published") // Only show published events
          .map((event, index) => (
            <div
              key={`${event.title}-${index}`}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.title}
                </h3>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" />
                  {event.date}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FiMapPin className="mr-2 text-gray-400" />
                  {event.location}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(event.title)}
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-2 transition duration-200"
                  aria-label={`Delete ${event.title}`}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompletedEvents;
