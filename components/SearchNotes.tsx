"use client";

import { useState } from "react";

interface SearchNotesProps {
  onSearch: (searchText: string) => void;
}

export default function SearchNotes({
  onSearch,
}: SearchNotesProps) {
  const notes = [
    "Class 10 Mathematics",
    "Class 10 Science",
    "Class 10 English",
    "Class 9 Mathematics",
    "Class 9 Science",
    "Class 8 Social Science",
    "Computer Basics",
    "English Grammar",
    "Reasoning Notes",
    "General Knowledge",
  ];

  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(search.toLowerCase())
  );

  // =========================================
  // SEARCH
  // =========================================

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      return;
    }

    onSearch(value);
  };

  // =========================================
  // ENTER KEY
  // =========================================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // =========================================
  // SUGGESTION CLICK
  // =========================================

  const handleSuggestionClick = (
    note: string
  ) => {
    setSearch(note);
    onSearch(note);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8 w-full min-w-0">

      {/* =====================================
          TITLE
      ====================================== */}

      <h2 className="text-2xl font-bold text-blue-600 mb-5">
        Search Notes
      </h2>


      {/* =====================================
          SEARCH BOX
      ====================================== */}

      <div className="flex flex-col sm:flex-row gap-3">

        <input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="w-full min-w-0 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={!search.trim()}
          className="w-full sm:w-auto bg-blue-600 !text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          🔍 Search
        </button>

      </div>


      {/* =====================================
          SUGGESTIONS
      ====================================== */}

      <div className="mt-6">

        <p className="text-sm font-semibold text-gray-600 mb-3">
          Popular Searches
        </p>


        <div className="space-y-3">

          {filteredNotes.length > 0 ? (

            filteredNotes.map((note) => (

              <button
                key={note}
                type="button"
                onClick={() =>
                  handleSuggestionClick(note)
                }
                className="w-full text-left border border-gray-300 rounded-xl p-4 bg-white text-gray-900 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-all duration-200 font-medium"
              >
                {note}
              </button>

            ))

          ) : (

            <div className="border border-red-200 bg-red-50 rounded-xl p-4">

              <p className="text-red-600 font-medium">
                No Notes Found
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}