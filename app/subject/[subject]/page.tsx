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
  const params = useParams();
  const router = useRouter();

  const subject = params?.subject as string;

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("All");

  const subjectName = subject
    ?.split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  useEffect(() => {
    const loadNotes = async () => {
      if (!subject) return;

      try {
        const notesRef = collection(db, "notes");

        const q = query(
          notesRef,
          where("subject", "==", subjectName)
        );

        const snapshot = await getDocs(q);

        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(notesData);
      } catch (error) {
        console.error(
          "Error loading subject notes:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [subject, subjectName]);

  const filteredNotes =
    selectedClass === "All"
      ? notes
      : notes.filter(
          (note) =>
            String(note.class) ===
            String(selectedClass)
        );

  return (
    <main className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* ================= HEADER ================= */}

      <header className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Logo */}

            <div>
              <h1 className="text-3xl font-extrabold text-blue-700">
                DDM
              </h1>

              <p className="text-sm font-medium text-gray-700">
                Dream • Discover • Master
              </p>
            </div>

            {/* Home Button */}

            <button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              Home
            </button>

          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">

            <button
              onClick={() => router.back()}
              className="bg-white text-blue-700 font-bold px-5 py-3 rounded-lg mb-7 hover:bg-gray-100 transition shadow-md"
            >
              ← Back
            </button>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold !text-white break-words">
              {subjectName}
            </h1>

            <p className="text-base sm:text-lg md:text-xl mt-4 !text-white font-medium">
              Study Notes & Learning Material
            </p>

            <div className="mt-6 inline-flex items-center bg-white text-blue-800 px-5 py-3 rounded-full font-bold shadow-md">
              📚 {filteredNotes.length} Study Material
            </div>

          </div>

        </section>


      {/* ================= CLASS FILTER ================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">

          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-5">
            🎓 Filter By Class
          </h2>

          <div className="flex flex-wrap gap-3">

            {/* All Classes */}

            <button
              onClick={() => setSelectedClass("All")}
              className={`px-4 sm:px-5 py-3 rounded-lg font-bold transition ${
                selectedClass === "All"
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All Classes
            </button>


            {/* Classes */}

            {[6, 7, 8, 9, 10].map(
              (classNumber) => (

                <button
                  key={classNumber}
                  onClick={() =>
                    setSelectedClass(
                      String(classNumber)
                    )
                  }
                  className={`px-4 sm:px-5 py-3 rounded-lg font-bold transition ${
                    selectedClass ===
                    String(classNumber)
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Class {classNumber}
                </button>

              )
            )}

          </div>

        </div>

      </section>


      {/* ================= NOTES ================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Loading */}

        {loading ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 sm:p-16 text-center">

            <div className="text-xl sm:text-2xl font-bold text-gray-800">
              Loading Study Materials...
            </div>

            <p className="text-gray-700 mt-3">
              Please wait...
            </p>

          </div>

        ) : filteredNotes.length === 0 ? (

          /* No Notes */

          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">

            <div className="text-5xl sm:text-6xl mb-5">
              📚
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              No Study Material Available
            </h2>

            <p className="text-gray-700 mt-3 leading-7">
              {selectedClass === "All"
                ? "Is subject ke liye abhi study material upload nahi kiya gaya hai."
                : `Class ${selectedClass} ke liye abhi study material available nahi hai.`}
            </p>

            <button
              onClick={() =>
                setSelectedClass("All")
              }
              className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              Show All Materials
            </button>

          </div>

        ) : (

          /* Notes Grid */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {filteredNotes.map((note) => (

              <div
                key={note.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-w-0"
              >

                {/* Cover Image */}

                {note.imageUrl && (
                  <img
                    src={note.imageUrl}
                    alt={
                      note.title ||
                      "Study Material"
                    }
                    className="w-full h-48 object-cover"
                  />
                )}


                {/* Card Content */}

                <div className="p-5 sm:p-6">

                  {/* Class + Subject */}

                  <div className="flex flex-wrap gap-2">

                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      Class {note.class}
                    </span>

                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                      {note.subject}
                    </span>

                  </div>


                  {/* Title */}

                  <h2 className="text-xl font-extrabold text-gray-900 mt-4 break-words">
                    {note.title}
                  </h2>


                  {/* Description */}

                  <p className="text-gray-700 mt-2 line-clamp-3 leading-6 break-words">
                    {note.description ||
                      "Study material for students."}
                  </p>


                  {/* Downloads */}

                  <p className="text-sm text-gray-700 mt-4 font-medium">
                    📥 Downloads:{" "}
                    <span className="font-extrabold text-gray-900">
                      {note.downloads || 0}
                    </span>
                  </p>


                  {/* View Button */}

                  <button
                    onClick={() =>
                      router.push(
                        `/note/${note.id}`
                      )
                    }
                    className="mt-5 w-full bg-blue-700 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
                  >
                    View Note →
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}