"use client";

import React, { useState } from "react";
import { FiCalendar, FiMapPin, FiTrash2 } from "react-icons/fi";
import classNames from "classnames";

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

  // Get status styling
  const getStatusStyle = (status: Event["status"]) =>
    classNames(
      "text-xs px-2 py-1 rounded-full border",
      status === "published"
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-gray-100 text-gray-800 border-gray-300"
    );

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

      {/* Events Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Events Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-600 font-medium">Total Events</p>
            <p className="text-2xl font-bold text-blue-800">{events.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm text-green-600 font-medium">Published</p>
            <p className="text-2xl font-bold text-green-800">
              {events.filter((e) => e.status === "published").length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-sm text-yellow-600 font-medium">Drafts</p>
            <p className="text-2xl font-bold text-yellow-800">
              {events.filter((e) => e.status === "draft").length}
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={`${event.title}-${index}`}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {event.title}
              </h3>
              <span className={getStatusStyle(event.status)}>
                {event.status}
              </span>
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
