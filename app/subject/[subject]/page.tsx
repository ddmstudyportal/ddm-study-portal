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

  const subjectName =
    subject
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
            String(note.class) === String(selectedClass)
        );

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              DDM
            </h1>

            <p className="text-gray-500">
              Dream • Discover • Master
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Home
          </button>

        </div>

      </header>


      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <button
            onClick={() => router.back()}
            className="bg-white/20 px-5 py-3 rounded-lg hover:bg-white/30 mb-8"
          >
            ← Back
          </button>

          <h1 className="text-5xl font-bold">
            {subjectName}
          </h1>

          <p className="text-xl mt-4 text-blue-100">
            Study Notes & Learning Material
          </p>

          <div className="mt-6 inline-block bg-white/20 px-5 py-3 rounded-full">
            📚 {filteredNotes.length} Study Material
          </div>

        </div>

      </section>


      {/* Class Filter */}
      <section className="max-w-7xl mx-auto px-6 pt-10">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            🎓 Filter By Class
          </h2>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setSelectedClass("All")}
              className={`px-5 py-3 rounded-lg font-semibold transition ${
                selectedClass === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Classes
            </button>


            {[6, 7, 8, 9, 10].map((classNumber) => (

              <button
                key={classNumber}
                onClick={() =>
                  setSelectedClass(String(classNumber))
                }
                className={`px-5 py-3 rounded-lg font-semibold transition ${
                  selectedClass === String(classNumber)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Class {classNumber}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* Notes */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {loading ? (

          <div className="text-center py-20">

            <div className="text-2xl font-semibold text-gray-600">
              Loading Study Materials...
            </div>

          </div>

        ) : filteredNotes.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Study Material Available
            </h2>

            <p className="text-gray-500 mt-3">
              {selectedClass === "All"
                ? "Is subject ke liye abhi study material upload nahi kiya gaya hai."
                : `Class ${selectedClass} ke liye abhi study material available nahi hai.`}
            </p>

            <button
              onClick={() => setSelectedClass("All")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Show All Materials
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredNotes.map((note) => (

              <div
                key={note.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition"
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


                <div className="p-6">

                  {/* Class */}
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Class {note.class}
                  </span>


                  {/* Subject */}
                  <span className="inline-block ml-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {note.subject}
                  </span>


                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mt-4">
                    {note.title}
                  </h2>


                  {/* Description */}
                  <p className="text-gray-500 mt-2 line-clamp-3">
                    {note.description ||
                      "Study material for students."}
                  </p>


                  {/* Downloads */}
                  <p className="text-sm text-gray-500 mt-4">
                    📥 Downloads:{" "}
                    <span className="font-semibold">
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
                    className="mt-5 w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
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