"use client";

import {
  LayoutDashboard,
  User,
  BookOpen,
  FileText,
  Download,
  Star,
  Settings,
} from "lucide-react";

interface DashboardMenuProps {
  active: string;
  setActive: (menu: string) => void;
}

export default function DashboardMenu({
  active,
  setActive,
}: DashboardMenuProps) {
  const menus = [
    {
      icon: <LayoutDashboard size={22} />,
      title: "Dashboard",
    },
    {
      icon: <User size={22} />,
      title: "My Profile",
    },
    {
      icon: <BookOpen size={22} />,
      title: "My Courses",
    },
    {
      icon: <FileText size={22} />,
      title: "Notes",
    },
    {
      icon: <Download size={22} />,
      title: "Downloads",
    },
    {
      icon: <Star size={22} />,
      title: "Favorites",
    },
    {
      icon: <Settings size={22} />,
      title: "Settings",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      {/* Navigation Heading */}
      <h2 className="text-2xl font-bold mb-6 text-slate-900">
        Navigation
      </h2>

      <div className="space-y-3">

        {menus.map((item) => {
          const isActive = active === item.title;

          return (
            <button
              key={item.title}
              onClick={() => setActive(item.title)}
              type="button"
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition font-semibold ${
                isActive
                  ? "!bg-blue-600 !text-white hover:!bg-blue-700"
                  : "text-slate-900 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {/* Icon */}
              <span className={isActive ? "!text-white" : "text-slate-900"}>
                {item.icon}
              </span>

              {/* Menu Text */}
              <span className={isActive ? "!text-white" : "text-slate-900"}>
                {item.title}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}