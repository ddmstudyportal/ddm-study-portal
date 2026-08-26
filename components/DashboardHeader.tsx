"use client";

import { Bell, Search, Moon } from "lucide-react";

export default function DashboardHeader() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

        {/* Left Side */}
        <div>

          <h1 className="text-3xl font-bold text-blue-600">
            Student Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back to DDM Study Portal
          </p>

          <p className="text-sm text-gray-400 mt-1">
            {today}
          </p>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Search Box */}
          <div className="relative hidden md:block">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Notification */}
          <button className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 transition">
            <Bell size={20} />
          </button>

          {/* Dark Mode (UI Only) */}
          <button className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 transition">
            <Moon size={20} />
          </button>

          {/* Student Info */}
          <div className="text-right">

            <h2 className="font-bold">
              Student
            </h2>

            <p className="text-green-600 text-sm">
              Online
            </p>

          </div>

          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            👤
          </div>

        </div>

      </div>

    </div>
  );
}