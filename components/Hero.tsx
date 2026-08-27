"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = searchText.trim();

    if (!value) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">

        {/* Heading */}

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Dream • Discover • Master
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-10">
          Learn Smarter, Score Better
        </p>


        {/* Search */}

        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto mb-8"
        >

          <div className="flex gap-2">

            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              placeholder="Search Notes, Classes, Subjects..."
              className="flex-1 px-5 py-4 rounded-xl text-gray-800 outline-none shadow-lg"
            />

            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold px-6 py-4 rounded-xl hover:bg-yellow-300 transition shadow-lg"
            >
              Search
            </button>

          </div>

        </form>


        {/* Buttons */}

        <div className="flex justify-center gap-4 flex-wrap">

          <button
            type="button"
            onClick={() => router.push("/classes")}
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Explore Classes
          </button>


          <button
            type="button"
            onClick={() => router.push("/downloads")}
            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            Download Notes
          </button>

        </div>

      </div>
    </section>
  );
}