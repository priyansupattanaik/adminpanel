"use client";

import { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiPlusCircle,
  FiBell,
  FiUser,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/siwalogo.png";

// Navigation data
const nav = [
  {
    id: 1,
    title: "Upcoming Events",
    paths: ["/Dashboard/upcomingevents", "/", "/Dashboard" ], // Multiple paths
    icon: <FiCalendar size={24} />,
  },
  {
    id: 2,
    title: "Completed Events",
    paths: ["/Dashboard/completedevents"], // Single path (still an array)
    icon: <FiCheckCircle size={24} />,
  },
  {
    id: 3,
    title: "Add Events",
    paths: ["/Dashboard/addevents"], // Single path
    icon: <FiPlusCircle size={24} />,
  },
  {
    id: 4,
    title: "Notifications",
    paths: ["/Dashboard/notifications"], // Single path
    icon: <FiBell size={24} />,
  },
  {
    id: 5,
    title: "Profile",
    paths: ["/Dashboard/profile"], // Single path
    icon: <FiUser size={24} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#F9FAFB] h-screen fixed top-0 left-0 w-64 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="flex justify-center items-center p-4">
        {/* Logo */}
        <Image src={logo} alt="Logo" width={160} height={160} />
      </div>

      {/* Sidebar Navigation */}
      <nav className="text-slate-500 space-y-2 px-4">
        {nav.map((item) => {
          // Check if the current pathname matches any of the paths for this item
          const isActive = item.paths.some((path) => pathname === path);

          return (
            <Link key={item.id} href={item.paths[0]} passHref>
              <button
                className={`flex items-center space-x-4 w-full text-left p-3 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 hover:text-blue-500"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
