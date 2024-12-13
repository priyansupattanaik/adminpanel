"use client";

import { useState } from "react";
import { FiCalendar, FiClock, FiInfo } from "react-icons/fi";

// Example events data with image URLs (you can replace these with actual image URLs)
const eventsData = [
  {
    id: 1,
    name: "Event 1",
    date: "2024-12-20",
    time: "10:00 AM",
    description: "This is a description of Event 1.",
    image: "https://via.placeholder.com/320x320?text=Event+1", // Placeholder image
  },
  {
    id: 2,
    name: "Event 2",
    date: "2024-12-22",
    time: "2:00 PM",
    description: "This is a description of Event 2.",
    image: "https://via.placeholder.com/320x320?text=Event+2", // Placeholder image
  },
  {
    id: 3,
    name: "Event 3",
    date: "2024-12-25",
    time: "4:00 PM",
    description: "This is a description of Event 3.",
    image: "https://via.placeholder.com/320x320?text=Event+3", // Placeholder image
  },
];

export default function UpcomingEvents() {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
      </div>

      {/* Upcoming Events Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Events Overview
        </h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium text-gray-600">
              Total Upcoming Events
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {eventsData.length}
            </p>
          </div>
          {/* You can add more overview statistics here */}
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upcoming Events List
        </h2>
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="border-b pb-4 last:border-b-0 flex items-center space-x-4"
              >
                {/* Event Image */}
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <FiCalendar className="mr-2" /> {event.date}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FiClock className="mr-2" /> {event.time}
                    </p>
                    <p className="text-gray-700 flex items-start mt-2">
                      <FiInfo className="mr-2 mt-1" /> {event.description}
                    </p>
                  </div>
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
