import Link from "next/link";

const subjects = [
  {
    title: "Mathematics",
    slug: "mathematics",
    icon: "📘",
    color: "bg-blue-500",
  },
  {
    title: "Science",
    slug: "science",
    icon: "🔬",
    color: "bg-green-500",
  },
  {
    title: "English",
    slug: "english",
    icon: "🇬🇧",
    color: "bg-purple-500",
  },
  {
    title: "Social Science",
    slug: "social-science",
    icon: "🌍",
    color: "bg-orange-500",
  },
  {
    title: "Hindi",
    slug: "hindi",
    icon: "🇮🇳",
    color: "bg-red-500",
  },
];

export default function SubjectSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Our Subjects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {subjects.map((subject) => (

            <div
              key={subject.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8 text-center"
            >

              <div
                className={`${subject.color} text-white text-5xl rounded-full w-24 h-24 mx-auto flex items-center justify-center`}
              >
                {subject.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {subject.title}
              </h3>

              <Link
                href={`/subject/${subject.slug}`}
                className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Open
              </Link>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}