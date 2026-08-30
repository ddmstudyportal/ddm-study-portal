"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const classes = [
  {
    number: 6,
    title: "Class 6",
    description: "NCERT Books for Class 6 students",
  },
  {
    number: 7,
    title: "Class 7",
    description: "NCERT Books for Class 7 students",
  },
  {
    number: 8,
    title: "Class 8",
    description: "NCERT Books for Class 8 students",
  },
  {
    number: 9,
    title: "Class 9",
    description: "NCERT Books for Class 9 students",
  },
  {
    number: 10,
    title: "Class 10",
    description: "NCERT Books for Class 10 students",
  },
];

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Science",
];

export default function NCERTBooksPage() {
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gray-100">

      {/* =========================
          HEADER
      ========================== */}

      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            {/* Logo */}

            <div>
              <button
                onClick={() => router.push("/")}
                className="text-3xl font-bold text-blue-600"
              >
                DDM
              </button>

              <p className="text-gray-700 font-medium text-sm">
                Dream • Discover • Master
              </p>
            </div>


            {/* Home Button */}

            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 !text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Home
            </button>

          </div>

        </div>

      </header>


      {/* =========================
          HERO
      ========================== */}

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

          <button
            onClick={() => router.back()}
            className="bg-white/20 !text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/30 transition mb-6"
          >
            ← Back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold">
            NCERT Books
          </h1>

          <p className="text-lg md:text-xl mt-4 text-white">
            Class 6 to 10 NCERT Books and Study Material
          </p>

          <div className="mt-6 inline-block bg-white/20 px-5 py-3 rounded-full !text-white font-semibold">
            📚 Classes 6 – 10
          </div>

        </div>

      </section>


      {/* =========================
          CONTENT
      ========================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        <div className="mb-10">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Select Your Class
          </h2>

          <p className="text-gray-600 mt-2">
            Apni class select karke NCERT Books dekhiye.
          </p>

        </div>


        {/* =========================
            CLASS CARDS
        ========================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {classes.map((item) => (

            <button
              key={item.number}
              onClick={() =>
                setSelectedClass(
                  selectedClass === item.number
                    ? null
                    : item.number
                )
              }
              className={`text-left bg-white rounded-2xl shadow-lg p-6 border-2 transition hover:-translate-y-1 hover:shadow-2xl ${
                selectedClass === item.number
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            >

              <div className="text-4xl mb-4">
                📚
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {item.description}
              </p>

              <div className="mt-5">

                <span className="inline-block bg-blue-600 !text-white px-4 py-2 rounded-lg font-semibold">
                  View Books
                </span>

              </div>

            </button>

          ))}

        </div>


        {/* =========================
            SUBJECTS
        ========================== */}

        {selectedClass && (

          <div className="mt-12">

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Class {selectedClass} NCERT Books
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Select a subject to view its NCERT Books.
                  </p>

                </div>

                <button
                  onClick={() => setSelectedClass(null)}
                  className="bg-gray-200 !text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Change Class
                </button>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {subjects.map((subject) => (

                  <div
                    key={subject}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition bg-gray-50"
                  >

                    <div className="text-3xl mb-3">
                      📖
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                      {subject}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Class {selectedClass} {subject} NCERT Book
                    </p>

                    <button
                      onClick={() => {
                        alert(
                          `Class ${selectedClass} ${subject} NCERT Book will be added here.`
                        );
                      }}
                      className="mt-4 w-full bg-blue-600 !text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Open Book →
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}


        {/* =========================
            INFORMATION
        ========================== */}

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            About NCERT Books
          </h2>

          <p className="text-gray-700 mt-3 leading-7">
            DDM Study Portal par Class 6 se Class 10 tak ke students
            ke liye NCERT Books ko organised format mein available
            karaya jayega.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

            <div className="bg-blue-50 rounded-xl p-5">

              <div className="text-3xl">
                📚
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                NCERT Books
              </h3>

              <p className="text-gray-600 mt-2">
                Class-wise aur subject-wise books.
              </p>

            </div>


            <div className="bg-green-50 rounded-xl p-5">

              <div className="text-3xl">
                📖
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                Easy Access
              </h3>

              <p className="text-gray-600 mt-2">
                Students ko material easily find karne mein help.
              </p>

            </div>


            <div className="bg-purple-50 rounded-xl p-5">

              <div className="text-3xl">
                📥
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                View & Download
              </h3>

              <p className="text-gray-600 mt-2">
                Books ko view aur download karne ki facility.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================== */}

      <footer className="bg-gray-900 text-white py-8">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-2xl font-bold !text-white">
            DDM
          </h2>

          <p className="mt-2 !text-gray-300">
            Dream • Discover • Master
          </p>

          <p className="mt-4 text-sm !text-gray-400">
            Learn Smarter, Score Better
          </p>

        </div>

      </footer>

    </main>
  );
}