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
  const [materialType, setMaterialType] = useState("Study Notes");
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [message, setMessage] = useState("");

  // ==============================
  // MATERIAL TYPES
  // ==============================

  const materialTypes = [
    "Study Notes",
    "NCERT Books",
    "NCERT Solutions",
    "Extra Questions",
    "CBSE Sample Papers",
    "Previous Year Papers",
  ];

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
      setMessage("Unable to load materials.");
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

          const userSnapshot = await getDoc(userRef);

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
    setMaterialType("Study Notes");
    setDescription("");
    setPdfUrl("");
    setImageUrl("");
    setMessage("");
  };

  // ==============================
  // ADD MATERIAL
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

          materialType: materialType,

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
        "Material Added Successfully ✅"
      );
    } catch (error) {
      console.log(
        "Add Material Error:",
        error
      );

      setMessage(
        "Something went wrong while adding the material."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // UPDATE MATERIAL
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

          materialType: materialType,

          description: description.trim(),

          pdfUrl: pdfUrl.trim(),

          imageUrl: imageUrl || "",
        }
      );

      await loadNotes();

      resetForm();

      setMessage(
        "Material Updated Successfully ✅"
      );
    } catch (error) {
      console.log(
        "Update Material Error:",
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
  // DELETE MATERIAL
  // ==============================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = confirm(
      "Are you sure you want to delete this material?"
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
        "Material Deleted Successfully ✅"
      );
    } catch (error) {
      console.log(
        "Delete Error:",
        error
      );

      setMessage(
        "Unable to delete material."
      );
    }
  };

  // ==============================
  // EDIT MATERIAL
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

    setMaterialType(
      note.materialType ||
        "Study Notes"
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
      "Editing material..."
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

        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
              Admin Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              DDM Study Portal
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 !text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Logout
          </button>

        </div>


        {/* ==============================
            ADD / UPDATE MATERIAL
        ============================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingId
              ? "Update Study Material"
              : "Add New Study Material"}
          </h2>


          <div className="grid md:grid-cols-2 gap-5">

            {/* TITLE */}

            <div>
              <label className="font-semibold text-gray-900 block mb-2">
                Material Title
              </label>

              <input
                type="text"
                placeholder="Example: Class 10 Maths Chapter 1"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="border border-gray-300 text-gray-900 placeholder:text-gray-500 bg-white rounded-lg p-3 w-full"
              />
            </div>


            {/* CLASS */}

            <div>
              <label className="font-semibold text-gray-900 block mb-2">
                Class
              </label>

              <select
                value={studentClass}
                onChange={(e) =>
                  setStudentClass(
                    e.target.value
                  )
                }
                className="border border-gray-300 text-gray-900 bg-white rounded-lg p-3 w-full"
              >
                <option value="">
                  Select Class
                </option>

                <option value="6">
                  Class 6
                </option>

                <option value="7">
                  Class 7
                </option>

                <option value="8">
                  Class 8
                </option>

                <option value="9">
                  Class 9
                </option>

                <option value="10">
                  Class 10
                </option>
              </select>
            </div>


            {/* SUBJECT */}

            <div>
              <label className="font-semibold text-gray-900 block mb-2">
                Subject
              </label>

              <select
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
                }
                className="border border-gray-300 text-gray-900 bg-white rounded-lg p-3 w-full"
              >
                <option value="">
                  Select Subject
                </option>

                <option value="Mathematics">
                  Mathematics
                </option>

                <option value="Science">
                  Science
                </option>

                <option value="English">
                  English
                </option>

                <option value="Hindi">
                  Hindi
                </option>

                <option value="Social Science">
                  Social Science
                </option>
              </select>
            </div>


            {/* MATERIAL TYPE */}

            <div>
              <label className="font-semibold text-gray-900 block mb-2">
                Material Type
              </label>

              <select
                value={materialType}
                onChange={(e) =>
                  setMaterialType(
                    e.target.value
                  )
                }
                className="border border-gray-300 text-gray-900 bg-white rounded-lg p-3 w-full"
              >
                {materialTypes.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>


            {/* PDF UPLOAD */}

            <div>
              <label className="font-semibold text-gray-900 block mb-2">
                Study PDF
              </label>

              <CldUploadWidget
                uploadPreset="ddm_upload"
                options={{
                  resourceType: "raw",
                  clientAllowedFormats: ["pdf"],
                  maxFileSize: 20000000,
                }}
                onSuccess={(
                  result: any
                ) => {
                  const url =
                    result?.info
                      ?.secure_url;

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
                    className="bg-purple-600 !text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    📄 Upload PDF
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


            {/* COVER IMAGE */}

            <div>
              <label className="font-semibold text-gray-900 block mb-2">
                Cover Image
              </label>

              <CldUploadWidget
                uploadPreset="ddm_upload"
                onSuccess={(
                  result: any
                ) => {
                  const url =
                    result?.info
                      ?.secure_url;

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
                    className="bg-green-600 !text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    🖼️ Upload Cover Image
                  </button>
                )}
              </CldUploadWidget>

              {imageUrl && (
                <div className="mt-4">

                  <p className="text-sm text-gray-600 mb-2">
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

              <label className="font-semibold text-gray-900 block mb-2">
                Description
              </label>

              <textarea
                placeholder="Write material description..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="border border-gray-300 text-gray-900 placeholder:text-gray-500 bg-white rounded-lg p-3 w-full h-32"
              />

            </div>

          </div>


          {/* SAVE BUTTON */}

          <button
            onClick={
              editingId
                ? handleUpdate
                : handleAddNote
            }
            disabled={saving}
            className="mt-6 w-full bg-blue-600 !text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Material"
              : "Add Material"}
          </button>


          {/* CANCEL */}

          {editingId && (
            <button
              onClick={resetForm}
              disabled={saving}
              className="mt-3 w-full bg-gray-500 !text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
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
            ALL MATERIALS
        ============================== */}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-10">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Study Materials ({notes.length})
          </h2>


          <div className="space-y-5">

            {notes.length === 0 ? (

              <p className="text-gray-500">
                No Study Materials Found
              </p>

            ) : (

              notes.map((note) => (

                <div
                  key={note.id}
                  className="border border-gray-200 rounded-xl p-5"
                >

                  <div className="flex flex-col md:flex-row justify-between gap-5">


                    {/* INFORMATION */}

                    <div className="flex gap-4">

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

                        <h3 className="font-bold text-lg text-gray-900">
                          {note.title}
                        </h3>


                        <div className="flex flex-wrap gap-2 mt-2">

                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Class {note.class}
                          </span>

                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {note.subject}
                          </span>

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {note.materialType || "Study Notes"}
                          </span>

                        </div>


                        <p className="text-gray-600 mt-3">
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
                        className="bg-yellow-500 !text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
                      >
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(
                            note.id
                          )
                        }
                        className="bg-red-600 !text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
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