"use client";

import { useEffect, useState } from "react";

import {
  BookOpen,
  Users,
  GraduationCap,
  Download,
} from "lucide-react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export default function StatsSection() {

  const [totalMaterials, setTotalMaterials] =
    useState(0);

  const [totalClasses, setTotalClasses] =
    useState(0);

  const [totalDownloads, setTotalDownloads] =
    useState(0);

  const [loading, setLoading] =
    useState(true);


  // =========================================
  // LOAD REAL STATISTICS FROM FIREBASE
  // =========================================

  useEffect(() => {

    const loadStats = async () => {

      try {

        const snapshot = await getDocs(
          collection(db, "notes")
        );

        const notes = snapshot.docs.map(
          (noteDoc) => noteDoc.data()
        );


        // TOTAL MATERIALS

        setTotalMaterials(
          notes.length
        );


        // UNIQUE CLASSES

        const uniqueClasses =
          new Set(
            notes
              .map((note: any) =>
                String(note.class || "")
              )
              .filter(Boolean)
          );

        setTotalClasses(
          uniqueClasses.size
        );


        // TOTAL DOWNLOADS

        const downloads =
          notes.reduce(
            (
              total: number,
              note: any
            ) => {

              return (
                total +
                Number(
                  note.downloads || 0
                )
              );

            },
            0
          );

        setTotalDownloads(
          downloads
        );

      } catch (error) {

        console.error(
          "Stats loading error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadStats();

  }, []);


  // =========================================
  // FORMAT NUMBERS
  // =========================================

  const formatNumber = (
    number: number
  ) => {

    if (number >= 1000000) {

      return (
        (number / 1000000)
          .toFixed(1)
          .replace(".0", "") +
        "M+"
      );

    }

    if (number >= 1000) {

      return (
        (number / 1000)
          .toFixed(1)
          .replace(".0", "") +
        "K+"
      );

    }

    return `${number}+`;

  };


  // =========================================
  // STATS DATA
  // =========================================

  const stats = [

    {
      number: loading
        ? "..."
        : formatNumber(
            totalMaterials
          ),

      title: "Study Materials",

      description:
        "Notes & PDFs available",

      icon: BookOpen,
    },


    {
      number: "1000+",

      title: "Happy Students",

      description:
        "Growing learning community",

      icon: Users,
    },


    {
      number: loading
        ? "..."
        : `${totalClasses}+`,

      title: "Classes",

      description:
        "Class 6 to 10 resources",

      icon: GraduationCap,
    },


    {
      number: loading
        ? "..."
        : formatNumber(
            totalDownloads
          ),

      title: "Downloads",

      description:
        "Resources downloaded",

      icon: Download,
    },

  ];


  // =========================================
  // UI
  // =========================================

  return (

    <section className="bg-slate-50 py-14 sm:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => {

            const Icon =
              stat.icon;

            return (

              <div
                key={stat.title}
                className="bg-white rounded-2xl p-7 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >

                {/* ICON */}

                <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

                  <Icon
                    size={32}
                    className="text-blue-600"
                  />

                </div>


                {/* NUMBER */}

                <h3 className="text-4xl font-extrabold text-blue-600 mt-5">

                  {stat.number}

                </h3>


                {/* TITLE */}

                <p className="text-xl font-bold text-gray-900 mt-2">

                  {stat.title}

                </p>


                {/* DESCRIPTION */}

                <p className="text-gray-600 mt-2">

                  {stat.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );
}