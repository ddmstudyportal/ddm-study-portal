"use client";

import { useRouter } from "next/navigation";

export default function ClassSection() {

  const router = useRouter();

  const classes = [
    {
      id: "6",
      title: "Class 6",
      description: "Study material, notes and learning resources",
      icon: "📚",
    },
    {
      id: "7",
      title: "Class 7",
      description: "Study material, notes and learning resources",
      icon: "📖",
    },
    {
      id: "8",
      title: "Class 8",
      description: "Study material, notes and learning resources",
      icon: "📘",
    },
    {
      id: "9",
      title: "Class 9",
      description: "Study material, notes and learning resources",
      icon: "📕",
    },
    {
      id: "10",
      title: "Class 10",
      description: "Board preparation, notes and study material",
      icon: "🎓",
    },
  ];


  return (

    <section className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-5">


        {/* ==============================
            SECTION HEADER
        =============================== */}

        <div className="text-center mb-12">

          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
            Study Material
          </span>

          <h2 className="text-4xl font-extrabold text-gray-800 mt-2">
            Choose Your Class
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Select your class and explore notes, study material,
            PDFs and learning resources.
          </p>

        </div>


        {/* ==============================
            CLASS CARDS
        =============================== */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {classes.map((item) => (

            <button
              key={item.id}
              type="button"
              onClick={() => router.push(`/class/${item.id}`)}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left border border-gray-100"
            >


              {/* ICON */}

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl group-hover:bg-blue-600 transition">

                <span className="group-hover:scale-110 transition">
                  {item.icon}
                </span>

              </div>


              {/* CLASS */}

              <h3 className="text-2xl font-bold text-gray-800 mt-5 group-hover:text-blue-600 transition">

                {item.title}

              </h3>


              {/* DESCRIPTION */}

              <p className="text-gray-500 text-sm mt-3 leading-6">

                {item.description}

              </p>


              {/* BUTTON */}

              <div className="mt-5 text-blue-600 font-bold text-sm">

                Explore Notes →

              </div>

            </button>

          ))}

        </div>


      </div>

    </section>

  );

}