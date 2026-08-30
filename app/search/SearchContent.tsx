"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchText =
    searchParams.get("q")?.trim() || "";

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedClass, setSelectedClass] =
    useState("All");

  const [selectedSubject, setSelectedSubject] =
    useState("All");

  const [selectedType, setSelectedType] =
    useState("All");

  // =========================================
  // MATERIAL TYPES
  // =========================================

  const materialTypes = [
    "All",
    "Study Notes",
    "NCERT Books",
    "NCERT Solutions",
    "Extra Questions",
    "CBSE Sample Papers",
    "Previous Year Papers",
  ];

  // =========================================
  // SUBJECTS
  // =========================================

  const subjects = [
    "All",
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Science",
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
  // LOAD MATERIALS
  // =========================================

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);

        const snapshot = await getDocs(
          collection(db, "notes")
        );

        const allNotes = snapshot.docs.map(
          (noteDoc) => ({
            id: noteDoc.id,
            ...noteDoc.data(),
          })
        );

        setNotes(allNotes);
      } catch (error) {
        console.error(
          "Search error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  // =========================================
  // FILTER SEARCH RESULTS
  // =========================================

  const filteredNotes = useMemo(() => {
    const searchValue =
      searchText.toLowerCase();

    return notes.filter((note: any) => {
      const title = String(
        note.title || ""
      ).toLowerCase();

      const subject = String(
        note.subject || ""
      ).toLowerCase();

      const studentClass = String(
        note.class || ""
      ).toLowerCase();

      const description = String(
        note.description || ""
      ).toLowerCase();

      // IMPORTANT:
      // New materials use materialType.
      // Old materials without materialType
      // are treated as Study Notes.

      const materialType =
        String(
          note.materialType ||
            "Study Notes"
        );

      const searchMatch =
        !searchValue ||
        title.includes(searchValue) ||
        subject.includes(searchValue) ||
        studentClass.includes(searchValue) ||
        description.includes(searchValue) ||
        materialType
          .toLowerCase()
          .includes(searchValue);

      const classMatch =
        selectedClass === "All" ||
        studentClass ===
          selectedClass.toLowerCase();

      const subjectMatch =
        selectedSubject === "All" ||
        subject ===
          selectedSubject.toLowerCase();

      const typeMatch =
        selectedType === "All" ||
        materialType === selectedType;

      return (
        searchMatch &&
        classMatch &&
        subjectMatch &&
        typeMatch
      );
    });
  }, [
    notes,
    searchText,
    selectedClass,
    selectedSubject,
    selectedType,
  ]);

  // =========================================
  // RESET FILTERS
  // =========================================

  const resetFilters = () => {
    setSelectedClass("All");
    setSelectedSubject("All");
    setSelectedType("All");
  };

  // =========================================
  // MAIN PAGE
  // =========================================

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
            onClick={() =>
              router.push("/")
            }
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          <button
            onClick={() =>
              router.back()
            }
            className="mb-6 bg-white/20 hover:bg-white/30 !text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            ← Back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold !text-white">
            Search Study Material
          </h1>

          <p className="text-lg md:text-xl mt-4 !text-white">

            Search by title, class, subject
            or material type.

          </p>

          {searchText && (

            <div className="mt-6 inline-block bg-white/20 px-5 py-3 rounded-xl">

              🔎 Search:
              <span className="font-bold ml-2">
                {searchText}
              </span>

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          FILTERS
      ====================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">

        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔍 Filter Study Materials
          </h2>


          {/* CLASS */}

          <div>

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🎓 Class
            </h3>

            <div className="flex flex-wrap gap-3">

              {classes.map(
                (className) => (

                  <button
                    key={className}
                    onClick={() =>
                      setSelectedClass(
                        className
                      )
                    }
                    className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                      selectedClass ===
                      className
                        ? "bg-blue-600 !text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >

                    {className ===
                    "All"
                      ? "All Classes"
                      : `Class ${className}`}

                  </button>

                )
              )}

            </div>

          </div>


          {/* SUBJECT */}

          <div className="mt-7">

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📖 Subject
            </h3>

            <div className="flex flex-wrap gap-3">

              {subjects.map(
                (subject) => (

                  <button
                    key={subject}
                    onClick={() =>
                      setSelectedSubject(
                        subject
                      )
                    }
                    className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                      selectedSubject ===
                      subject
                        ? "bg-purple-600 !text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >

                    {subject ===
                    "All"
                      ? "All Subjects"
                      : subject}

                  </button>

                )
              )}

            </div>

          </div>


          {/* MATERIAL TYPE */}

          <div className="mt-7">

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📚 Material Type
            </h3>

            <div className="flex flex-wrap gap-3">

              {materialTypes.map(
                (type) => (

                  <button
                    key={type}
                    onClick={() =>
                      setSelectedType(
                        type
                      )
                    }
                    className={`px-4 py-2.5 rounded-lg font-semibold transition ${
                      selectedType ===
                      type
                        ? "bg-green-600 !text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >

                    {type ===
                    "All"
                      ? "📂 All Materials"
                      : type}

                  </button>

                )
              )}

            </div>

          </div>


          {/* RESET */}

          {(selectedClass !==
            "All" ||
            selectedSubject !==
            "All" ||
            selectedType !==
            "All") && (

            <button
              onClick={
                resetFilters
              }
              className="mt-7 bg-gray-700 !text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              🔄 Reset Filters
            </button>

          )}

        </div>

      </section>


      {/* =====================================
          RESULTS
      ====================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {loading ? (

          <div className="text-center py-20">

            <div className="text-2xl font-semibold text-gray-600">
              Searching Study Materials...
            </div>

          </div>

        ) : filteredNotes.length ===
          0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12 text-center">

            <div className="text-6xl mb-5">
              🔍
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              No Results Found
            </h2>

            <p className="text-gray-600 mt-3">

              {searchText
                ? `"${searchText}" ke liye koi study material nahi mila.`
                : "Selected filters ke according koi material nahi mila."}

            </p>

            <button
              onClick={
                resetFilters
              }
              className="mt-6 bg-blue-600 !text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Show All Materials
            </button>

          </div>

        ) : (

          <>

            {/* RESULT HEADER */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-900">
                📚 Search Results
              </h2>

              <p className="text-gray-600 mt-2">
                {filteredNotes.length} study material
                {filteredNotes.length !==
                1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>


            {/* CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredNotes.map(
                (note) => {

                  const noteType =
                    note.materialType ||
                    "Study Notes";

                  return (

                    <article
                      key={note.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                    >

                      {/* IMAGE */}

                      {note.imageUrl ? (

                        <img
                          src={
                            note.imageUrl
                          }
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


                      {/* CONTENT */}

                      <div className="p-6">

                        {/* TYPE */}

                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-3">

                          {noteType}

                        </span>


                        {/* CLASS + SUBJECT */}

                        <div className="flex flex-wrap gap-2">

                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Class{" "}
                            {note.class}
                          </span>

                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {
                              note.subject
                            }
                          </span>

                        </div>


                        {/* TITLE */}

                        <h2 className="text-xl font-bold text-gray-900 mt-4">
                          {
                            note.title
                          }
                        </h2>


                        {/* DESCRIPTION */}

                        <p className="text-gray-600 mt-2 line-clamp-3">

                          {note.description ||
                            "Study material for students."}

                        </p>


                        {/* DOWNLOADS */}

                        <p className="text-sm text-gray-600 mt-4">

                          📥 Downloads:{" "}

                          <span className="font-semibold text-gray-800">
                            {
                              note.downloads ||
                              0
                            }
                          </span>

                        </p>


                        {/* BUTTON */}

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

                    </article>

                  );
                }
              )}

            </div>

          </>

        )}

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="bg-gray-900 text-white mt-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">

          <h3 className="text-2xl font-bold text-blue-400">
            DDM
          </h3>

          <p className="text-gray-400 mt-2">
            Dream • Discover • Master
          </p>

          <p className="text-gray-500 text-sm mt-4">
            Learn Smarter, Score Better
          </p>

          <p className="text-gray-600 text-xs mt-5">
            ©{" "}
            {new Date().getFullYear()}{" "}
            DDM Study Portal
          </p>

        </div>

      </footer>

    </main>
  );
}