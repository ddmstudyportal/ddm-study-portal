"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, Download } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const query = search.trim();

    if (!query) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-12 left-8 sm:left-16 grid grid-cols-4 gap-3 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          ))}
        </div>

        <div className="absolute top-16 right-8 sm:right-16 grid grid-cols-4 gap-3 opacity-80">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-yellow-300 rounded-full"
            />
          ))}
        </div>

        <div className="absolute -left-20 bottom-0 w-80 h-40 bg-blue-400/20 rounded-full blur-2xl" />

        <div className="absolute -right-20 bottom-0 w-80 h-40 bg-blue-300/20 rounded-full blur-2xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center">

        {/* Heading */}
        <h1 className="!text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Dream • Discover • Master
        </h1>

        {/* Subtitle */}
        <p className="mt-5 !text-white text-lg sm:text-xl md:text-2xl font-medium">
          Learn Smarter, Score Better
        </p>

        {/* SEARCH BOX */}
        <div className="max-w-4xl mx-auto mt-10 sm:mt-12">

          <div className="p-1 rounded-2xl bg-cyan-300/60 shadow-[0_0_25px_rgba(103,232,249,0.45)]">

            <div className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2">

              {/* Input */}
              <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4">

                <Search
                  size={25}
                  className="text-blue-600 shrink-0"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search Notes, Classes, Subjects..."
                  className="w-full px-4 py-4 bg-transparent text-gray-900 placeholder:text-gray-500 outline-none text-base sm:text-lg"
                />

              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                className="sm:w-36 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-md"
              >
                Search
              </button>

            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <button
            type="button"
            onClick={() => router.push("/classes")}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-7 py-4 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200"
          >
            <BookOpen size={21} />
            Explore Classes
          </button>

          <button
            type="button"
            onClick={() => router.push("/downloads")}
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold px-7 py-4 rounded-xl shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-200"
          >
            <Download size={21} />
            Download Notes
          </button>

        </div>

      </div>

    </section>
  );
}