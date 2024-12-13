"use client";

import React, { useState } from "react";
import {
  FiBell,
  FiCheck,
  FiAlertCircle,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";

interface Notification {
  id: number;
  userName: string;
  eventName: string;
  suggestion: string;
  timestamp: Date;
  isRead: boolean;
  type?: string; // Add type as optional
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      userName: "John Doe",
      eventName: "React Native Workshop",
      suggestion: "Add a session on React Native performance optimization",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      isRead: false,
      type: "suggestion",
    },
    {
      id: 2,
      userName: "Jane Smith",
      eventName: "GraphQL Masterclass",
      suggestion: "Include more hands-on exercises for complex queries",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: false,
      type: "suggestion",
    },
    {
      id: 3,
      userName: "Alice Johnson",
      eventName: "Vue.js Conference",
      suggestion: "Add a panel discussion on Vue 3 composition API",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      type: "suggestion",
    },
  ]);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - date.getFullYear()) * 12 +
      (now.getMonth() - date.getMonth());

    if (diffInMonths === 0) {
      const diffInDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffInDays === 0) return "Today";
      if (diffInDays === 1) return "Yesterday";
      return `${diffInDays} days ago`;
    }

    if (diffInMonths === 1) return "1 month ago";
    return `${diffInMonths} months ago`;
  };

  // Updated to use type from Notification interface (optional)
  const getNotificationIcon = (type: string = "default") => {
    switch (type) {
      case "registration":
        return <FiUsers className="text-blue-500" />;
      case "warning":
        return <FiAlertCircle className="text-yellow-500" />;
      case "completion":
        return <FiCheck className="text-green-500" />;
      case "suggestion":
        return <FiMessageSquare className="text-purple-500" />;
      case "upcoming":
        return <FiCalendar className="text-indigo-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-md">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-b last:border-b-0 p-6 hover:bg-gray-50 transition-colors duration-150 ${
              !notification.isRead ? "bg-blue-50" : ""
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      New Suggestion for {notification.eventName}
                      {!notification.isRead && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {notification.suggestion}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Suggested by: {notification.userName}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No suggestions
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no event suggestions at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
