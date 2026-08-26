"use client";

import { BookOpen, Users, Download, School } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <BookOpen size={45} />,
      number: "5000+",
      title: "PDF Notes",
    },
    {
      icon: <Users size={45} />,
      number: "10000+",
      title: "Students",
    },
    {
      icon: <School size={45} />,
      number: "25+",
      title: "Classes",
    },
    {
      icon: <Download size={45} />,
      number: "100000+",
      title: "Downloads",
    },
  ];

  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.title}
              className="bg-blue-500 rounded-2xl p-8 text-center shadow-lg hover:scale-105 duration-300"
            >

              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold">
                {item.number}
              </h2>

              <p className="mt-3 text-lg">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}