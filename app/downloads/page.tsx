"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

export default function DownloadsPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] =
    useState("All");

  const [selectedClass, setSelectedClass] =
    useState("All");

  const [selectedSubject, setSelectedSubject] =
    useState("All");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "notes")
        );

        const allNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(allNotes);
      } catch (error) {
        console.error(
          "Downloads page error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  // =========================================
  // MATERIAL TYPES
  // =========================================

  const materialTypes = [
    {
      name: "All",
      label: "📂 All Materials",
    },
    {
      name: "NCERT Books",
      label: "📖 NCERT Books",
    },
    {
      name: "NCERT Solutions",
      label: "✅ NCERT Solutions",
    },
    {
      name: "Extra Questions",
      label: "📝 Extra Questions",
    },
    {
      name: "CBSE Sample Papers",
      label: "📄 CBSE Sample Papers",
    },
    {
      name: "Previous Year Papers",
      label: "📚 Previous Year Papers",
    },
    {
      name: "Study Notes",
      label: "📘 Study Notes",
    },
  ];

  // =========================================
  // CLASSES
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
  // SUBJECTS
  // =========================================

  const subjects = [
    "All",
    "Mathematics",
    "Science",
    "English",
    "Social Science",
    "Hindi",
  ];

  // =========================================
  // FILTER MATERIALS
  // =========================================

  const filteredNotes = notes.filter((note) => {
    const noteType =
      note.materialType || note.type || "Study Notes";

    const typeMatch =
      selectedType === "All" ||
      noteType === selectedType;

    const classMatch =
      selectedClass === "All" ||
      String(note.class) ===
        String(selectedClass);

    const subjectMatch =
      selectedSubject === "All" ||
      note.subject === selectedSubject;

    return (
      typeMatch &&
      classMatch &&
      subjectMatch
    );
  });

  return (
    <main className="min-h-screen bg-gray-100">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>

            <h1 className="text-3xl font-bold text-blue-600">
              DDM
            </h1>

            <p className="text-gray-700 font-medium">
              Dream • Discover • Master
            </p>

          </div>

          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 !text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Home
          </button>

        </div>

      </header>


      {/* =====================================
          HERO
      ====================================== */}

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

          <h1 className="text-4xl md:text-5xl font-bold !text-white">
            Download Study Material
          </h1>

          <p className="text-lg md:text-xl mt-4 !text-white">
            Class 6 to 10 Notes, NCERT Books,
            Solutions, Papers & More
          </p>

        </div>

      </section>


      {/* =====================================
          FILTER SECTION
      ====================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">

        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7">

          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            📚 Study Material Categories
          </h2>


          {/* MATERIAL TYPE */}

          <div className="flex flex-wrap gap-3">

            {materialTypes.map((type) => (

              <button
                key={type.name}
                onClick={() =>
                  setSelectedType(type.name)
                }
                className={`px-4 py-3 rounded-lg font-semibold transition ${
                  selectedType === type.name
                    ? "bg-blue-600 !text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {type.label}
              </button>

            ))}

          </div>


          {/* CLASS FILTER */}

          <div className="mt-7">

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🎓 Select Class
            </h3>

            <div className="flex flex-wrap gap-3">

              {classes.map((className) => (

                <button
                  key={className}
                  onClick={() =>
                    setSelectedClass(className)
                  }
                  className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                    selectedClass === className
                      ? "bg-purple-600 !text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-purple-50"
                  }`}
                >
                  {className === "All"
                    ? "All Classes"
                    : `Class ${className}`}
                </button>

              ))}

            </div>

          </div>


          {/* SUBJECT FILTER */}

          <div className="mt-7">

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📖 Select Subject
            </h3>

            <div className="flex flex-wrap gap-3">

              {subjects.map((subject) => (

                <button
                  key={subject}
                  onClick={() =>
                    setSelectedSubject(subject)
                  }
                  className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                    selectedSubject === subject
                      ? "bg-green-600 !text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-green-50"
                  }`}
                >
                  {subject === "All"
                    ? "All Subjects"
                    : subject}
                </button>

              ))}

            </div>

          </div>


          {/* RESET */}

          {(selectedType !== "All" ||
            selectedClass !== "All" ||
            selectedSubject !== "All") && (

            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedClass("All");
                setSelectedSubject("All");
              }}
              className="mt-6 bg-gray-700 !text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              🔄 Reset Filters
            </button>

          )}

        </div>

      </section>


      {/* =====================================
          NOTES SECTION
      ====================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {loading ? (

          <div className="text-center py-20">

            <div className="text-2xl font-semibold text-gray-600">
              Loading Study Materials...
            </div>

          </div>

        ) : filteredNotes.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              No Study Material Found
            </h2>

            <p className="text-gray-600 mt-3">
              Is filter ke according abhi
              study material available nahi hai.
            </p>

            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedClass("All");
                setSelectedSubject("All");
              }}
              className="mt-6 bg-blue-600 !text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Show All Materials
            </button>

          </div>

        ) : (

          <>

            {/* RESULT COUNT */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-900">
                Study Materials
              </h2>

              <p className="text-gray-600 mt-2">
                {filteredNotes.length} study materials available
              </p>

            </div>


            {/* CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredNotes.map((note) => {

                const noteType =
                  note.materialType || note.type || "Study Notes";

                return (

                  <div
                    key={note.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition"
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

                      <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">

                        <span className="text-6xl">
                          📚
                        </span>

                      </div>

                    )}


                    <div className="p-6">

                      {/* TYPE */}

                      <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold mb-3">
                        {noteType}
                      </span>


                      {/* CLASS + SUBJECT */}

                      <div className="flex flex-wrap gap-2">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Class {note.class}
                        </span>

                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {note.subject}
                        </span>

                      </div>


                      {/* TITLE */}

                      <h3 className="text-xl font-bold text-gray-900 mt-4">
                        {note.title}
                      </h3>


                      {/* DESCRIPTION */}

                      <p className="text-gray-600 mt-2 line-clamp-3">
                        {note.description ||
                          "Study material for students."}
                      </p>


                      {/* DOWNLOAD COUNT */}

                      <p className="text-sm text-gray-600 mt-4">
                        📥 Downloads:{" "}
                        <span className="font-semibold text-gray-800">
                          {note.downloads || 0}
                        </span>
                      </p>


                      {/* VIEW BUTTON */}

                      <button
                        onClick={() =>
                          router.push(
                            `/note/${note.id}`
                          )
                        }
                        className="mt-5 w-full bg-blue-600 !text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        View & Download →
                      </button>

                    </div>

                  </div>

                );
              })}

            </div>

          </>

        )}

      </section>

    </main>
  );
}