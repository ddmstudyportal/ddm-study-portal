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

        <div className="max-w-7xl mx-auto px-6 py-14">

          <h1 className="text-4xl md:text-5xl font-bold">
            Download Study Material
          </h1>

          <p className="text-xl mt-4 text-blue-100">
            Class 6 to 10 Notes, PDFs and Study Materials
          </p>

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

        ) : notes.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Study Material Available
            </h2>

            <p className="text-gray-500 mt-3">
              New study materials will be available soon.
            </p>

          </div>

        ) : (

          <>

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-800">
                All Study Materials
              </h2>

              <p className="text-gray-500 mt-2">
                {notes.length} study materials available
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {notes.map((note) => (

                <div
                  key={note.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >

                  {/* Image */}

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

                    {/* Class + Subject */}

                    <div className="flex flex-wrap gap-2">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Class {note.class}
                      </span>

                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {note.subject}
                      </span>

                    </div>


                    {/* Title */}

                    <h3 className="text-xl font-bold text-gray-800 mt-4">
                      {note.title}
                    </h3>


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


                    {/* View */}

                    <button
                      onClick={() =>
                        router.push(
                          `/note/${note.id}`
                        )
                      }
                      className="mt-5 w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                      View & Download →
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </section>

    </main>
  );
}