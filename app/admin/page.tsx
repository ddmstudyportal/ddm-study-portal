"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { db, auth } from "../../lib/firebase";
import { CldUploadWidget } from "next-cloudinary";

export default function AdminPage() {

  const router = useRouter();

  // ==============================
  // STATES
  // ==============================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [notes, setNotes] = useState<any[]>([]);

  const [editingId, setEditingId] = useState("");

  const [title, setTitle] = useState("");

  const [studentClass, setStudentClass] = useState("");

  const [subject, setSubject] = useState("");

  const [description, setDescription] = useState("");

  const [pdfUrl, setPdfUrl] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [message, setMessage] = useState("");


  // ==============================
  // LOAD NOTES
  // ==============================

  const loadNotes = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "notes")
      );

      const data = snapshot.docs.map((noteDoc) => ({
        id: noteDoc.id,
        ...noteDoc.data(),
      }));

      setNotes(data);

    } catch (error) {

      console.log("Load Notes Error:", error);

      setMessage("Unable to load notes.");

    }

  };


  // ==============================
  // AUTHENTICATION
  // ==============================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {

        if (!user) {

          router.replace("/login");

          return;

        }

        try {

          const userRef = doc(
            db,
            "users",
            user.uid
          );

          const userSnapshot = await getDoc(
            userRef
          );

          if (!userSnapshot.exists()) {

            router.replace("/login");

            return;

          }

          const userData = userSnapshot.data();

          if (userData.role !== "admin") {

            alert("Access Denied");

            router.replace("/dashboard");

            return;

          }

          await loadNotes();

          setLoading(false);

        } catch (error) {

          console.log(
            "Authentication Error:",
            error
          );

          setMessage(
            "Authentication error."
          );

          setLoading(false);

        }

      }
    );

    return () => unsubscribe();

  }, [router]);


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = async () => {

    try {

      await signOut(auth);

      router.replace("/login");

    } catch (error) {

      console.log(
        "Logout Error:",
        error
      );

    }

  };


  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {

    setEditingId("");

    setTitle("");

    setStudentClass("");

    setSubject("");

    setDescription("");

    setPdfUrl("");

    setImageUrl("");

    setMessage("");

  };


  // ==============================
  // ADD NOTE
  // ==============================

  const handleAddNote = async () => {

    if (
      !title.trim() ||
      !studentClass.trim() ||
      !subject.trim() ||
      !description.trim() ||
      !pdfUrl.trim()
    ) {

      setMessage(
        "Please fill all required fields."
      );

      return;

    }

    try {

      setSaving(true);

      setMessage("");

      await addDoc(
        collection(db, "notes"),
        {

          title: title.trim(),

          class: studentClass.trim(),

          subject: subject.trim(),

          description: description.trim(),

          pdfUrl: pdfUrl.trim(),

          imageUrl: imageUrl || "",

          downloads: 0,

          createdAt: new Date(),

        }
      );

      await loadNotes();

      resetForm();

      setMessage(
        "Note Added Successfully ✅"
      );

    } catch (error) {

      console.log(
        "Add Note Error:",
        error
      );

      setMessage(
        "Something went wrong while adding the note."
      );

    } finally {

      setSaving(false);

    }

  };


  // ==============================
  // UPDATE NOTE
  // ==============================

  const handleUpdate = async () => {

    if (!editingId) {

      return;

    }

    if (
      !title.trim() ||
      !studentClass.trim() ||
      !subject.trim() ||
      !description.trim() ||
      !pdfUrl.trim()
    ) {

      setMessage(
        "Please fill all required fields."
      );

      return;

    }

    try {

      setSaving(true);

      setMessage("");

      await updateDoc(
        doc(db, "notes", editingId),
        {

          title: title.trim(),

          class: studentClass.trim(),

          subject: subject.trim(),

          description: description.trim(),

          pdfUrl: pdfUrl.trim(),

          imageUrl: imageUrl || "",

        }
      );

      await loadNotes();

      resetForm();

      setMessage(
        "Note Updated Successfully ✅"
      );

    } catch (error) {

      console.log(
        "Update Note Error:",
        error
      );

      setMessage(
        "Something went wrong while updating."
      );

    } finally {

      setSaving(false);

    }

  };


  // ==============================
  // DELETE NOTE
  // ==============================

  const handleDelete = async (
    id: string
  ) => {

    const confirmed = confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {

      return;

    }

    try {

      await deleteDoc(
        doc(db, "notes", id)
      );

      await loadNotes();

      setMessage(
        "Note Deleted Successfully ✅"
      );

    } catch (error) {

      console.log(
        "Delete Error:",
        error
      );

      setMessage(
        "Unable to delete note."
      );

    }

  };


  // ==============================
  // EDIT NOTE
  // ==============================

  const handleEdit = (note: any) => {

    setEditingId(note.id);

    setTitle(note.title || "");

    setStudentClass(
      note.class || ""
    );

    setSubject(
      note.subject || ""
    );

    setDescription(
      note.description || ""
    );

    setPdfUrl(
      note.pdfUrl || ""
    );

    setImageUrl(
      note.imageUrl || ""
    );

    setMessage(
      "Editing note..."
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ==============================
  // LOADING SCREEN
  // ==============================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-3xl font-bold text-blue-600">

          Loading Admin Dashboard...

        </div>

      </div>

    );

  }


  // ==============================
  // ADMIN DASHBOARD
  // ==============================

  return (

    <main className="min-h-screen bg-gray-100 p-4 md:p-10">

      <div className="max-w-6xl mx-auto">


        {/* ==============================
            HEADER
        ============================== */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">

              Admin Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

              DDM Study Portal

            </p>

          </div>


          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >

            Logout

          </button>

        </div>


        {/* ==============================
            ADD / UPDATE NOTE
        ============================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

          <h2 className="text-2xl font-bold mb-6">

            {editingId
              ? "Update Note"
              : "Add New Note"}

          </h2>


          {/* FORM */}

          <div className="grid md:grid-cols-2 gap-5">


            {/* TITLE */}

            <div>

              <label className="font-semibold block mb-2">

                Note Title

              </label>

              <input
                type="text"
                placeholder="Example: Class 10 Maths Chapter 1"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="border rounded-lg p-3 w-full"
              />

            </div>


            {/* CLASS */}

            <div>

              <label className="font-semibold block mb-2">

                Class

              </label>

              <input
                type="text"
                placeholder="Example: 10"
                value={studentClass}
                onChange={(e) =>
                  setStudentClass(
                    e.target.value
                  )
                }
                className="border rounded-lg p-3 w-full"
              />

            </div>


            {/* SUBJECT */}

            <div>

              <label className="font-semibold block mb-2">

                Subject

              </label>

              <input
                type="text"
                placeholder="Example: Mathematics"
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
                }
                className="border rounded-lg p-3 w-full"
              />

            </div>


            {/* ==============================
                PDF UPLOAD
            ============================== */}

            <div>

              <label className="font-semibold block mb-2">
                Study PDF
              </label>

              <CldUploadWidget
                uploadPreset="ddm_upload"
                options={{
                  resourceType: "raw",
                  clientAllowedFormats: ["pdf"],
                  maxFileSize: 20000000,
                }}
                onSuccess={(result: any) => {
                  const url = result?.info?.secure_url;

                  if (url) {
                    setPdfUrl(url);

                    setMessage(
                      "PDF uploaded successfully ✅"
                    );
                  }
                }}
              >

                {({ open }) => (

                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition"
                  >

                    📄 Upload Study PDF

                  </button>

                )}

              </CldUploadWidget>


              {pdfUrl && (

                <div className="mt-3">

                  <p className="text-sm text-green-600 font-semibold">

                    PDF uploaded successfully ✅

                  </p>

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >

                    Open Uploaded PDF

                  </a>

                </div>

              )}

            </div>
    


            {/* ==============================
                COVER IMAGE
            ============================== */}

            <div className="md:col-span-2 mt-3">

              <label className="font-semibold block mb-2">

                Cover Image

              </label>


              <CldUploadWidget

                uploadPreset="ddm_upload"

                onSuccess={(result: any) => {

                  const url =
                    result?.info?.secure_url;

                  if (url) {

                    setImageUrl(url);

                    setMessage(
                      "Cover image uploaded successfully ✅"
                    );

                  }

                }}

              >

                {({ open }) => (

                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
                  >

                    🖼️ Upload Cover Image

                  </button>

                )}

              </CldUploadWidget>


              {imageUrl && (

                <div className="mt-4">

                  <p className="text-sm text-gray-500 mb-2">

                    Selected Cover Image:

                  </p>


                  <img
                    src={imageUrl}
                    alt="Cover"
                    className="h-40 w-64 object-cover rounded-lg border shadow"
                  />

                </div>

              )}

            </div>


            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="font-semibold block mb-2">

                Description

              </label>

              <textarea
                placeholder="Write note description..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="border rounded-lg p-3 w-full h-32"
              />

            </div>

          </div>


          {/* ==============================
              SAVE BUTTON
          ============================== */}

          <button
            onClick={
              editingId
                ? handleUpdate
                : handleAddNote
            }
            disabled={saving}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >

            {saving
              ? "Saving..."
              : editingId
              ? "Update Note"
              : "Add Note"}

          </button>


          {/* CANCEL EDIT */}

          {editingId && (

            <button
              onClick={resetForm}
              disabled={saving}
              className="mt-3 w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
            >

              Cancel Edit

            </button>

          )}


          {/* MESSAGE */}

          {message && (

            <p className="mt-4 font-semibold text-blue-600">

              {message}

            </p>

          )}

        </div>


        {/* ==============================
            ALL NOTES
        ============================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">

            All Notes ({notes.length})

          </h2>


          <div className="space-y-5">


            {notes.length === 0 ? (

              <p className="text-gray-500">

                No Notes Found

              </p>

            ) : (

              notes.map((note) => (

                <div
                  key={note.id}
                  className="border rounded-xl p-5"
                >

                  <div className="flex flex-col md:flex-row justify-between gap-5">


                    {/* NOTE INFORMATION */}

                    <div className="flex gap-4">


                      {/* COVER IMAGE */}

                      {note.imageUrl ? (

                        <img
                          src={note.imageUrl}
                          alt={note.title}
                          className="w-28 h-20 object-cover rounded-lg border"
                        />

                      ) : (

                        <div className="w-28 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">

                          No Image

                        </div>

                      )}


                      <div>

                        <h3 className="font-bold text-lg">

                          {note.title}

                        </h3>


                        <p className="text-gray-500 mt-1">

                          Class {note.class} |{" "}

                          {note.subject}

                        </p>


                        <p className="text-gray-600 mt-2">

                          {note.description}

                        </p>

                        <p className="text-sm text-gray-500 mt-3">
                          📥 Downloads:{" "}
                          <span className="font-semibold text-gray-700">
                            {note.downloads || 0}
                          </span>
                        </p>

                      </div>

                    </div>


                    {/* BUTTONS */}

                    <div className="flex gap-3 items-start">


                      <button
                        onClick={() =>
                          handleEdit(note)
                        }
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >

                        Edit

                      </button>


                      <button
                        onClick={() =>
                          handleDelete(
                            note.id
                          )
                        }
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </main>

  );

}