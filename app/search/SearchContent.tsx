"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const searchNotes = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "notes")
        );

        const allNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const searchValue =
          searchText.toLowerCase();

        const filteredNotes = allNotes.filter(
          (note: any) => {
            const title =
              String(note.title || "").toLowerCase();

            const subject =
              String(note.subject || "").toLowerCase();

            const studentClass =
              String(note.class || "").toLowerCase();

            const description =
              String(note.description || "").toLowerCase();

            return (
              title.includes(searchValue) ||
              subject.includes(searchValue) ||
              studentClass.includes(searchValue) ||
              description.includes(searchValue)
            );
          }
        );

        setNotes(filteredNotes);
      } catch (error) {
        console.error(
          "Search error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    searchNotes();
  }, [searchText]);

  return (
    <main className="min-h-screen bg-gray-100">

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

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <button
            onClick={() => router.back()}
            className="bg-white/20 px-5 py-3 rounded-lg hover:bg-white/30 mb-6"
          >
            ← Back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold">
            Search Results
          </h1>

          <p className="text-xl mt-4 text-blue-100">
            Search:{" "}
            <span className="font-bold text-white">
              {searchText || "All"}
            </span>
          </p>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">

        {loading ? (

          <div className="text-center py-20">
            <div className="text-2xl font-semibold text-gray-600">
              Searching Study Materials...
            </div>
          </div>

        ) : notes.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              🔍
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Results Found
            </h2>

            <p className="text-gray-500 mt-3">
              "{searchText}" ke liye koi study
              material nahi mila.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              ← Back to Home
            </button>

          </div>

        ) : (

          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {notes.length} Study Material Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {notes.map((note) => (

                <div
                  key={note.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition"
                >

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

                    <div className="flex flex-wrap gap-2">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Class {note.class}
                      </span>

                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {note.subject}
                      </span>

                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mt-4">
                      {note.title}
                    </h2>

                    <p className="text-gray-500 mt-2 line-clamp-3">
                      {note.description ||
                        "Study material for students."}
                    </p>

                    <p className="text-sm text-gray-500 mt-4">
                      📥 Downloads:{" "}
                      <span className="font-semibold">
                        {note.downloads || 0}
                      </span>
                    </p>

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
          </>

        )}

      </section>

    </main>
  );
}