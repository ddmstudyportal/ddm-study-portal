"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export default function FeaturedNotes() {
  const router = useRouter();

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOAD LATEST MATERIALS FROM FIREBASE
  // =========================================

  useEffect(() => {
    const loadFeaturedNotes = async () => {
      try {
        const notesQuery = query(
          collection(db, "notes"),
          orderBy("createdAt", "desc"),
          limit(6)
        );

        const snapshot = await getDocs(notesQuery);

        const data = snapshot.docs.map(
          (noteDoc) => ({
            id: noteDoc.id,
            ...noteDoc.data(),
          })
        );

        setNotes(data);
      } catch (error) {
        console.error(
          "Featured Notes Error:",
          error
        );

        // Fallback: agar createdAt sorting
        // mein problem aaye
        try {
          const snapshot = await getDocs(
            collection(db, "notes")
          );

          const data = snapshot.docs
            .map((noteDoc) => ({
              id: noteDoc.id,
              ...noteDoc.data(),
            }))
            .slice(0, 6);

          setNotes(data);
        } catch (fallbackError) {
          console.error(
            "Fallback Error:",
            fallbackError
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedNotes();
  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-4xl font-bold text-center mb-10 text-slate-900">
            📚 Latest Study Materials
          </h2>

          <div className="text-center py-10">

            <div className="text-lg font-semibold text-gray-600">
              Loading Study Materials...
            </div>

          </div>

        </div>
      </section>
    );
  }

  // =========================================
  // NO MATERIAL
  // =========================================

  if (notes.length === 0) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-4xl font-bold text-center mb-10 text-slate-900">
            📚 Latest Study Materials
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="text-5xl mb-4">
              📖
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Study Materials Coming Soon
            </h3>

            <p className="text-gray-600 mt-3">
              New notes and PDFs will be available here soon.
            </p>

          </div>

        </div>
      </section>
    );
  }

  // =========================================
  // MAIN SECTION
  // =========================================

  return (
    <section className="py-16 bg-gray-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}

        <div className="text-center mb-10">

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            📚 Latest Study Materials
          </h2>

          <p className="text-gray-600 mt-3 text-lg">
            Latest Notes, PDFs & Learning Materials
          </p>

        </div>


        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {notes.map((note) => {

            const materialType =
              note.materialType ||
              "Study Notes";

            return (

              <article
                key={note.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >

                {/* COVER IMAGE */}

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

                    <div className="text-center text-white">

                      <div className="text-6xl">
                        📚
                      </div>

                      <p className="font-semibold mt-2">
                        DDM Study Material
                      </p>

                    </div>

                  </div>

                )}


                {/* CONTENT */}

                <div className="p-6">

                  {/* MATERIAL TYPE */}

                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {materialType}
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

                  <h3 className="text-xl font-bold text-gray-900 mt-4 line-clamp-2">
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
          })}

        </div>


        {/* VIEW ALL */}

        <div className="text-center mt-10">

          <button
            onClick={() =>
              router.push("/downloads")
            }
            className="bg-gray-900 !text-white px-7 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            📚 View All Study Materials →
          </button>

        </div>

      </div>

    </section>
  );
}