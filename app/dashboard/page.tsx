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

  // =========================================
  // AUTHENTICATION
  // =========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          router.push("/login");
          return;
        }

        try {
          const docRef = doc(
            db,
            "users",
            user.uid
          );

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setStudent(docSnap.data());
          }
        } catch (error) {
          console.error(
            "Dashboard user error:",
            error
          );
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [router]);

  // =========================================
  // SEARCH HANDLER
  // =========================================

  const handleSearch = (searchText: string) => {
    const value = searchText.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    router.push(
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold text-gray-800">
          Loading...
        </div>
      </main>
    );
  }

  // =========================================
  // DASHBOARD
  // =========================================

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-gray-100 overflow-x-hidden">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <Sidebar />


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div className="flex-1 min-w-0 w-full p-4 sm:p-6 lg:p-10 overflow-x-hidden">

        {/* Dashboard Header */}

        <div className="w-full min-w-0">
          <DashboardHeader />
        </div>


        {/* Dashboard Statistics */}

        <div className="w-full min-w-0 mt-6">
          <DashboardStats />
        </div>


        {/* =====================================
            DASHBOARD BODY
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8 min-w-0 w-full">


          {/* ===================================
              LEFT SIDE
          ==================================== */}

          <div className="min-w-0 w-full">

            <DashboardMenu
              active={activeMenu}
              setActive={setActiveMenu}
            />

          </div>


          {/* ===================================
              RIGHT SIDE
          ==================================== */}

          <div className="lg:col-span-2 min-w-0 w-full">


            {/* Dashboard Content */}

            <div className="w-full min-w-0 overflow-hidden">

              <DashboardContent
                active={activeMenu}
                student={student}
              />

            </div>


            {/* =================================
                SEARCH NOTES
            ================================== */}

            <div className="w-full min-w-0 mt-6">

              <SearchNotes
                onSearch={handleSearch}
              />

            </div>


            {/* =================================
                NOTES LIST
            ================================== */}

            <div className="mt-6 lg:mt-8 min-w-0 w-full">

              <NotesList />

            </div>

          </div>

        </div>


        {/* =====================================
            PROFILE PHOTO
        ====================================== */}

        <div className="w-full min-w-0 mt-8">

          <ProfilePhoto />

        </div>


        {/* =====================================
            LOGOUT
        ====================================== */}

        <div className="mt-8 pb-6">

          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-600 !text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </main>
  );
}