"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardStats from "../../components/DashboardStats";
import StudentProfile from "../../components/StudentProfile";
import ProfilePhoto from "../../components/ProfilePhoto";
import DashboardMenu from "../../components/DashboardMenu";
import DashboardContent from "../../components/DashboardContent";
import SearchNotes from "../../components/SearchNotes";
import NotesList from "../../components/NotesList";

export default function DashboardPage() {
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">

        <DashboardHeader />

        <DashboardStats />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left Side */}
          <div>
            <DashboardMenu
              active={activeMenu}
              setActive={setActiveMenu}
            />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-2">
            <DashboardContent
              active={activeMenu}
              student={student}
            />

            <SearchNotes />

            <div className="mt-8">
            <NotesList />
          </div>

          </div>

        </div>

        <ProfilePhoto />

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

      </div>

    </main>
  );
}