"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const value = searchText.trim();

    if (!value) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h1 className="text-6xl font-bold">
          Dream • Discover • Master
        </h1>

        <p className="mt-6 text-2xl">
          Learn Smarter, Score Better
        </p>


        {/* Search Box */}

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search Notes, Subjects, Class..."
            className="w-full max-w-2xl p-5 rounded-xl text-black text-lg outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            🔍 Search
          </button>

        </div>


        {/* Buttons */}

        <div className="mt-8 flex flex-wrap justify-center gap-6">

          <button
            onClick={() => {
              document
                .getElementById("classes")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Explore Classes
          </button>


          <button
            onClick={() => {
              router.push("/search?q=");
            }}
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            📚 Browse Notes
          </button>

        </div>

      </div>

    </section>
  );
}