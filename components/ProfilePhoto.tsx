"use client";

"use client";

import { useState } from "react";
import { storage, db, auth } from "@/lib/firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { doc, updateDoc } from "firebase/firestore";

export default function ProfilePhoto() {const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  if (!e.target.files?.[0]) return;

  try {

    setUploading(true);

    const file = e.target.files[0];

    const user = auth.currentUser;

    if (!user) return;

    const storageRef = ref(
      storage,
      `profilePhotos/${user.uid}`
    );

    await uploadBytes(storageRef, file);

    const downloadURL =
      await getDownloadURL(storageRef);

    await updateDoc(
      doc(db, "users", user.uid),
      {
        photoURL: downloadURL,
      }
    );

    alert("Photo Uploaded Successfully!");

  } catch (error) {

    console.log(error);

    alert("Upload Failed");

  } finally {

    setUploading(false);

  }

};

    return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Profile Photo
      </h2>

      <div className="flex flex-col items-center">

        <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-6xl">

          👤

        </div>

        <label className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700">

  {uploading ? "Uploading..." : "Upload Photo"}

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={handleUpload}
  />

</label>

      </div>

    </div>
  );
}