"use client";

import { useEffect, useState } from "react";
import {
  collection,
 getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function NotesList() {
  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(data);
        setFilteredNotes(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchNotes();
  }, []);

      const handleDownload = async (note: any) => {
      try {
        await updateDoc(doc(db, "notes", note.id), {
          downloads: increment(1),
        });

        window.open(note.pdfUrl, "_blank");

        setFilteredNotes((prev) =>
          prev.map((item) =>
            item.id === note.id
              ? {
                  ...item,
                  downloads: (item.downloads || 0) + 1,
                }
              : item
          )
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    let data = [...notes];

    if (search !== "") {
      data = data.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedClass !== "All") {
      data = data.filter(
        (note) => note.class === selectedClass
      );
    }

    if (selectedSubject !== "All") {
      data = data.filter(
        (note) => note.subject === selectedSubject
      );
    }

    setFilteredNotes(data);

  }, [search, selectedClass, selectedSubject, notes]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading Notes...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Study Notes
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3"
        />

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option>All</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option>All</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Social Science</option>
        </select>

      </div>

      <div className="grid gap-5">

        {filteredNotes.length === 0 && (
          <div className="text-center text-gray-500">
            No Notes Found
          </div>
        )}

        {filteredNotes.map((note) => (

          <div
            key={note.id}
            className="border rounded-xl p-5 hover:shadow-lg transition"
          >

            <h3 className="text-xl font-bold">
              {note.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {note.description}
            </p>

            <div className="flex gap-5 mt-4 text-sm text-gray-500">

              <span>
                Class : {note.class}
              </span>

              <span>
                Subject : {note.subject}
              </span>

            </div>

            <button
              onClick={() => handleDownload(note)}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Download PDF
            </button>

            <p className="mt-3 text-gray-500">
              Downloads : {note.downloads || 0}
            </p>
     
          </div>

        ))}

      </div>

    </div>
  );
}