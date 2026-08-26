"use client";

import { useState } from "react";

export default function SearchNotes() {

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
    "General Knowledge"
  ];

  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-blue-600 mb-5">
        Search Notes
      </h2>

      <input
        type="text"
        placeholder="Search Notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6 space-y-3">

        {filteredNotes.length > 0 ? (

          filteredNotes.map((note, index) => (

            <div
              key={index}
              className="border rounded-xl p-4 hover:bg-blue-50 transition"
            >
              {note}
            </div>

          ))

        ) : (

          <p className="text-red-500">
            No Notes Found
          </p>

        )}

      </div>

    </div>
  );
}