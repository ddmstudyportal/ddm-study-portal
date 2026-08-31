"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function SubjectPage() {
  const router = useRouter();
  const params = useParams();

  const subjectId = params?.id as string;

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedMedium, setSelectedMedium] = useState("All");

  // =========================================
  // SUBJECT NAME
  // =========================================

  const subjectNames: Record<string, string> = {
    mathematics: "Mathematics",
    science: "Science",
    english: "English",
    hindi: "Hindi",
    "social-science": "Social Science",
    socialscience: "Social Science",
  };

  const subjectName =
    subjectNames[subjectId?.toLowerCase()] ||
    subjectId
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  // =========================================
  // LOAD NOTES
  // =========================================

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const notesQuery = query(
          collection(db, "notes"),
          where("subject", "==", subjectName)
        );

        const snapshot = await getDocs(notesQuery);

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setNotes(data);
      } catch (error) {
        console.error("Subject page error:", error);

        setError(
          "Study material load nahi ho pa raha hai."
        );
      } finally {
        setLoading(false);
      }
    };

    if (subjectName) {
      loadNotes();
    }
  }, [subjectName]);

  // =========================================
  // CLASS FILTER
  // =========================================

  const classes = [
    "All",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  // =========================================
  // MEDIUM FILTER
  // =========================================

  const mediums = [
    "All",
    "English",
    "Hindi",
    "Bilingual",
  ];

  // =========================================
  // FILTER NOTES
  // =========================================

  const filteredNotes = notes.filter((note) => {
    const noteClass = String(note.class || "");

    const noteMedium = String(
      note.medium || ""
    ).trim();

    const classMatch =
      selectedClass === "All" ||
      noteClass === selectedClass;

    const mediumMatch =
      selectedMedium === "All" ||
      noteMedium.toLowerCase() ===
        selectedMedium.toLowerCase();

    return classMatch && mediumMatch;
  });

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="text-5xl mb-4">
            📚
          </div>

          <h2 className="text-2xl font-bold text-blue-600">
            Loading Study Material...
          </h2>

          <p className="text-gray-600 mt-2">
            Please wait
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            {/* LOGO */}

            <div>
              <h1 className="text-3xl font-extrabold text-blue-600">
                DDM
              </h1>

              <p className="text-sm text-gray-700 font-medium">
                Dream • Discover • Master
              </p>
            </div>

            {/* HOME BUTTON */}

            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 !text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-95 transition"
            >
              🏠 Home
            </button>

          </div>

        </div>

      </header>


      {/* =====================================
          HERO
      ====================================== */}

      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">

          {/* BACK BUTTON */}

          <button
            onClick={() => router.back()}
            className="mb-7 bg-white !text-blue-700 px-5 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 active:scale-95 transition"
          >
            ← Back
          </button>


          {/* SUBJECT TITLE */}

          <h2 className="text-4xl md:text-5xl font-extrabold !text-white break-words">
            {subjectName}
          </h2>

          <p className="mt-3 text-lg md:text-xl !text-white font-medium">
            Study Notes & Learning Material
          </p>


          {/* MATERIAL COUNT */}

          <div className="mt-6 inline-flex items-center bg-white !text-blue-700 px-5 py-3 rounded-full font-bold shadow-lg">
            📚 {notes.length} Study Material
          </div>

        </div>

      </section>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">


        {/* ERROR */}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-5 text-center mb-8 font-semibold">
            {error}
          </div>
        )}


        {/* =====================================
            FILTER SECTION
        ====================================== */}

        {notes.length > 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7 mb-10">

            {/* ===============================
                CLASS FILTER
            ================================ */}

            <div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                🎓 Filter By Class
              </h3>

              <div className="flex flex-wrap gap-3">

                {classes.map((className) => (

                  <button
                    key={className}
                    onClick={() =>
                      setSelectedClass(className)
                    }
                    className={`px-5 py-3 rounded-lg font-bold border-2 transition active:scale-95 ${
                      selectedClass === className
                        ? "bg-blue-600 !text-white border-blue-600 shadow-md"
                        : "bg-white !text-gray-900 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:!text-blue-700"
                    }`}
                  >
                    {className === "All"
                      ? "📚 All Classes"
                      : `Class ${className}`}
                  </button>

                ))}

              </div>

            </div>


            {/* ===============================
                MEDIUM FILTER
            ================================ */}

            <div className="mt-8 pt-7 border-t border-gray-200">

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                🌐 Filter By Medium
              </h3>

              <p className="text-gray-600 mb-4">
                Apni preferred language / medium select kijiye.
              </p>


              <div className="flex flex-wrap gap-3">

                {mediums.map((medium) => (

                  <button
                    key={medium}
                    onClick={() =>
                      setSelectedMedium(medium)
                    }
                    className={`px-5 py-3 rounded-lg font-bold border-2 transition active:scale-95 ${
                      selectedMedium === medium
                        ? "bg-green-600 !text-white border-green-600 shadow-md"
                        : "bg-white !text-gray-900 border-gray-300 hover:bg-green-50 hover:border-green-400 hover:!text-green-700"
                    }`}
                  >

                    {medium === "All" && "🌐 All Mediums"}
                    {medium === "English" && "🇬🇧 English"}
                    {medium === "Hindi" && "🇮🇳 Hindi"}
                    {medium === "Bilingual" && "🔄 Bilingual"}

                  </button>

                ))}

              </div>

            </div>


            {/* ===============================
                ACTIVE FILTERS
            ================================ */}

            {(selectedClass !== "All" ||
              selectedMedium !== "All") && (

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">

                <div className="text-sm font-semibold text-gray-700">

                  Showing:

                  <span className="ml-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {selectedClass === "All"
                      ? "All Classes"
                      : `Class ${selectedClass}`}
                  </span>

                  <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {selectedMedium === "All"
                      ? "All Mediums"
                      : selectedMedium}
                  </span>

                </div>


                <button
                  onClick={() => {
                    setSelectedClass("All");
                    setSelectedMedium("All");
                  }}
                  className="bg-gray-800 !text-white px-5 py-2.5 rounded-lg font-bold hover:bg-gray-900 shadow-md transition active:scale-95"
                >
                  🔄 Reset Filters
                </button>

              </div>

            )}

          </div>

        )}


        {/* =====================================
            NO MATERIAL
        ====================================== */}

        {!error && notes.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              No Study Material Available
            </h2>

            <p className="text-gray-600 mt-3">
              Is subject ke liye abhi study material upload nahi kiya gaya hai.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-7 bg-blue-600 !text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
            >
              ← Back to Home
            </button>

          </div>

        )}


        {/* =====================================
            FILTER RESULT EMPTY
        ====================================== */}

        {notes.length > 0 &&
          filteredNotes.length === 0 && (

            <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14 text-center">

              <div className="text-6xl mb-5">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                No Notes Found
              </h2>

              <p className="text-gray-600 mt-3">
                Is class aur medium ke liye koi study material available nahi hai.
              </p>

              <button
                onClick={() => {
                  setSelectedClass("All");
                  setSelectedMedium("All");
                }}
                className="mt-6 bg-blue-600 !text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
              >
                Show All Materials
              </button>

            </div>

          )}


        {/* =====================================
            NOTES GRID
        ====================================== */}

        {filteredNotes.length > 0 && (

          <>

            {/* RESULT COUNT */}

            <div className="mb-8">

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {subjectName} Study Materials
              </h2>

              <p className="text-gray-600 mt-2">
                {filteredNotes.length} study materials available
              </p>

            </div>


            {/* CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

              {filteredNotes.map((note) => (

                <article
                  key={note.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >

                  {/* IMAGE */}

                  {note.imageUrl ? (

                    <img
                      src={note.imageUrl}
                      alt={
                        note.title ||
                        "Study Material"
                      }
                      className="w-full h-48 object-cover"
                    />

                  ) : (

                    <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">

                      <div className="text-center">

                        <div className="text-6xl">
                          📚
                        </div>

                        <p className="!text-white font-bold mt-2">
                          DDM Study Material
                        </p>

                      </div>

                    </div>

                  )}


                  {/* CONTENT */}

                  <div className="p-6">

                    {/* SUBJECT */}

                    <span className="inline-block bg-blue-100 !text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                      📖 {note.subject}
                    </span>


                    {/* MATERIAL TYPE */}

                    {note.materialType && (

                      <span className="inline-block ml-2 bg-green-100 !text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        {note.materialType}
                      </span>

                    )}


                    {/* MEDIUM */}

                    {note.medium && (

                      <span className="inline-block mt-2 bg-orange-100 !text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                        🌐 {note.medium}
                      </span>

                    )}


                    {/* TITLE */}

                    <h3 className="text-xl font-bold text-gray-900 mt-4">
                      {note.title}
                    </h3>


                    {/* CLASS */}

                    <p className="text-sm text-gray-600 mt-2 font-semibold">
                      🎓 Class {note.class}
                    </p>


                    {/* DESCRIPTION */}

                    {note.description && (

                      <p className="text-gray-600 text-sm leading-6 mt-4 line-clamp-3">
                        {note.description}
                      </p>

                    )}


                    {/* VIEW BUTTON */}

                    <button
                      onClick={() =>
                        router.push(
                          `/note/${note.id}`
                        )
                      }
                      className="mt-6 w-full bg-blue-600 !text-white py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition"
                    >
                      📖 View & Download →
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </>

        )}

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="bg-gray-900 mt-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-9 text-center">

          <h3 className="text-2xl font-bold text-blue-400">
            DDM
          </h3>

          <p className="text-gray-300 mt-2">
            Dream • Discover • Master
          </p>

          <p className="text-gray-400 text-sm mt-4">
            Learn Smarter, Score Better
          </p>

          <p className="text-gray-500 text-xs mt-5">
            © {new Date().getFullYear()} DDM Study Portal
          </p>

        </div>

      </footer>

    </main>
  );
}