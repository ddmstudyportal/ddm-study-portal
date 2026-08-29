import {
  BookOpen,
  Users,
  GraduationCap,
  Download,
} from "lucide-react";

const stats = [
  {
    number: "5000+",
    title: "Study Materials",
    description: "High quality notes & PDFs",
    icon: BookOpen,
  },
  {
    number: "10000+",
    title: "Happy Students",
    description: "Trusted by thousands",
    icon: Users,
  },
  {
    number: "25+",
    title: "Classes",
    description: "Learning resources",
    icon: GraduationCap,
  },
  {
    number: "100000+",
    title: "Downloads",
    description: "Resources downloaded",
    icon: Download,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl p-7 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon
                    size={32}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="text-4xl font-extrabold text-blue-600 mt-5">
                  {stat.number}
                </h3>

                <p className="text-xl font-bold text-gray-900 mt-2">
                  {stat.title}
                </p>

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