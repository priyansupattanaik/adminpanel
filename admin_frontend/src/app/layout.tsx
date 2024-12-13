"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Sidebar from "@/layouts/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route path

  // Check if the current route is the login page
  const isLoginPage = pathname === "/Login";

  return (
    <html lang="en">
      <body className="flex">
        {/* Conditionally render Sidebar only if not on the login page */}
        {!isLoginPage && <Sidebar />}
        <div className={`flex-1 ${!isLoginPage ? "ml-20 md:ml-64" : ""}`}>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
