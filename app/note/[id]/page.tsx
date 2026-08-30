"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function NoteDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  // Load Note
  // ---------------------------------------

  useEffect(() => {
    const loadNote = async () => {
      if (!id) {
        return;
      }

      try {
        const noteRef = doc(db, "notes", id);

        const snapshot = await getDoc(noteRef);

        if (snapshot.exists()) {
          setNote({
            id: snapshot.id,
            ...snapshot.data(),
          });
        } else {
          setNote(null);
        }
      } catch (error) {
        console.error("Error loading note:", error);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  // ---------------------------------------
  // Download PDF
  // ---------------------------------------

  const handleDownload = async () => {
    if (!note?.id || !note?.pdfUrl) {
      return;
    }

    try {
      const noteRef = doc(db, "notes", note.id);

      await updateDoc(noteRef, {
        downloads: increment(1),
      });
    } catch (error) {
      console.error(
        "Download count update failed:",
        error
      );
    }

    window.open(
      note.pdfUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">
          Loading Note...
        </div>
      </main>
    );
  }

  // ---------------------------------------
  // Note Not Found
  // ---------------------------------------

  if (!note) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">

          <div className="text-6xl mb-5">
            📚
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Note Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            Yeh study material abhi available nahi hai.
          </p>

          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            ← Go Back
          </button>

        </div>
      </main>
    );
  }

  // ---------------------------------------
  // Main Page
  // ---------------------------------------

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="bg-white shadow-sm">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

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


      {/* Main */}

      <section className="max-w-5xl mx-auto px-6 py-10">

        {/* Back Button */}

        <button
          onClick={() => router.back()}
          className="mb-6 bg-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </button>


        {/* Note Card */}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Cover Image */}

          {note.imageUrl && (
            <div className="w-full">

              <img
                src={note.imageUrl}
                alt={note.title || "Study Material"}
                className="w-full max-h-[450px] object-cover"
              />

            </div>
          )}


          {/* Content */}

          <div className="p-8">

            {/* Class + Subject */}

            <div className="flex flex-wrap gap-3 mb-5">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                Class {note.class}
              </span>

              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                {note.subject}
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                {note.materialType || "Study Notes"}
              </span>

            </div>


            {/* Title */}

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {note.title}
            </h1>


            {/* Description */}

            <div className="mb-8">

              <h2 className="text-xl font-bold text-gray-800 mb-3">
                About this Study Material
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                {note.description ||
                  "Study material for students."}
              </p>

            </div>


            {/* PDF Section */}

            <div className="border rounded-2xl p-6 bg-gray-50">

              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                📄 Study PDF
              </h2>


              {note.pdfUrl ? (

                <div className="flex flex-wrap gap-4">

                  {/* View PDF */}

                  <a
                    href={note.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    📖 View PDF
                  </a>


                  {/* Download PDF */}

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                  >
                    ⬇ Download PDF
                  </button>

                </div>

              ) : (

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

                  <p className="text-yellow-700 font-semibold">
                    📄 PDF अभी उपलब्ध नहीं है।
                  </p>

                </div>

              )}

            </div>


            {/* Download Count */}

            <div className="mt-6 text-gray-500">

              📥 Downloads:{" "}
              <span className="font-semibold text-gray-700">
                {note.downloads || 0}
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}