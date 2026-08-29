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

export default function ClassPage() {

  const router = useRouter();

  const params = useParams();

  const classId = params?.id as string;

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSubject, setSelectedSubject] = useState("All");


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
          where("class", "==", classId)
        );

        const snapshot = await getDocs(notesQuery);

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setNotes(data);

      } catch (error) {

        console.error(error);

        setError(
          "Study material load nahi ho pa raha hai."
        );

      } finally {

        setLoading(false);

      }

    };

    if (classId) {
      loadNotes();
    }

  }, [classId]);


  // =========================================
  // GET UNIQUE SUBJECTS
  // =========================================

  const subjects = [
    "All",
    ...Array.from(
      new Set(
        notes
          .map((note) => note.subject)
          .filter(Boolean)
      )
    ),
  ];


  // =========================================
  // FILTER NOTES
  // =========================================

  const filteredNotes =
    selectedSubject === "All"
      ? notes
      : notes.filter(
          (note) => note.subject === selectedSubject
        );


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <main className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="text-center">

          <div className="text-5xl mb-4">
            📚
          </div>

          <h2 className="text-2xl font-bold text-blue-600">
            Loading Study Material...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait
          </p>

        </div>

      </main>

    );

  }


  return (

    <main className="min-h-screen bg-gray-100">


      {/* =====================================
          HEADER
      ====================================== */}

      <header className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-5 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-extrabold text-blue-600">
                DDM
              </h1>

              <p className="text-sm text-gray-500">
                Dream • Discover • Master
              </p>

            </div>


            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
            >
              Home
            </button>

          </div>

        </div>

      </header>


      {/* =====================================
          HERO
      ====================================== */}

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-5 py-12">

          <button
            onClick={() => router.back()}
            className="mb-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold"
          >
            ← Back
          </button>


          <h2 className="text-4xl md:text-5xl font-extrabold !text-white">
            Class {classId}
          </h2>


          <p className="mt-3 text-lg !text-white font-medium">
            Study Notes & Learning Material
          </p>


          <div className="mt-6 inline-block bg-white/20 text-white px-5 py-2 rounded-full font-semibold">
            📚 {notes.length} Study Material
          </div>

        </div>

      </section>


      {/* =====================================
          MAIN
      ====================================== */}

      <section className="max-w-7xl mx-auto px-5 py-12">


        {/* ERROR */}

        {error && (

          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-5 text-center mb-8">

            {error}

          </div>

        )}


        {/* =====================================
            SUBJECT FILTER
        ====================================== */}

        {notes.length > 0 && (

          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <h3 className="text-xl font-bold text-gray-800">
                  Choose Subject
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Subject ke according study material dekhiye.
                </p>

              </div>


              <div className="flex flex-wrap gap-3">

                {subjects.map((subject) => (

                  <button
                    key={subject}
                    onClick={() =>
                      setSelectedSubject(subject)
                    }
                    className={
                      selectedSubject === subject
                        ? "bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow"
                        : "bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-100 hover:text-blue-700"
                    }
                  >

                    {subject === "All"
                      ? "📚 All"
                      : `📖 ${subject}`}

                  </button>

                ))}

              </div>

            </div>

          </div>

        )}


        {/* =====================================
            NO NOTES
        ====================================== */}

        {!error && notes.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Study Material Available
            </h2>

            <p className="text-gray-500 mt-3">
              Is class ke liye abhi study material upload nahi kiya gaya hai.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              ← Back to Home
            </button>

          </div>

        )}


        {/* =====================================
            FILTERED RESULT
        ====================================== */}

        {notes.length > 0 && filteredNotes.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No Notes Found
            </h2>

            <p className="text-gray-500 mt-2">
              Is subject ke liye abhi koi note available nahi hai.
            </p>

          </div>

        )}


        {/* =====================================
            NOTES GRID
        ====================================== */}

        {filteredNotes.length > 0 && (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredNotes.map((note) => (

              <article
                key={note.id}
                onClick={() => router.push(`/note/${note.id}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >


                {/* COVER IMAGE */}

                {note.imageUrl ? (

                  <img
                    src={note.imageUrl}
                    alt={note.title || "Study Material"}
                    className="w-full h-52 object-cover"
                  />

                ) : (

                  <div className="w-full h-52 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">

                    <div className="text-center text-white">

                      <div className="text-6xl">
                        📚
                      </div>

                      <p className="mt-2 font-semibold">
                        DDM Study Material
                      </p>

                    </div>

                  </div>

                )}


                {/* CONTENT */}

                <div className="p-6">


                  {/* SUBJECT */}

                  {note.subject && (

                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">

                      {note.subject}

                    </span>

                  )}


                  {/* TITLE */}

                  <h3 className="text-xl font-bold text-gray-800 mt-4">

                    {note.title}

                  </h3>


                  {/* CLASS */}

                  <p className="text-sm text-gray-500 mt-2">

                    Class {note.class}

                  </p>


                  {/* DESCRIPTION */}

                  {note.description && (

                    <p className="text-gray-600 text-sm leading-6 mt-4">

                      {note.description}

                    </p>

                  )}


                  {/* PDF */}

                  {note.pdfUrl && (

                    <a
                      href={note.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                    >

                      📖 Open PDF

                    </a>

                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="bg-gray-900 text-white mt-10">

        <div className="max-w-7xl mx-auto px-5 py-8 text-center">

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
            © {new Date().getFullYear()} DDM Study Portal
          </p>

        </div>

      </footer>

    </main>

  );

}