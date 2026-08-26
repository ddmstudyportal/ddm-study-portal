import Link from "next/link";

const classes = [
  { id: 6, color: "bg-red-500" },
  { id: 7, color: "bg-orange-500" },
  { id: 8, color: "bg-green-500" },
  { id: 9, color: "bg-purple-500" },
  { id: 10, color: "bg-blue-600" },
];

export default function ClassesGrid() {
  return (
    <section
      id="classes"
      className="py-20 bg-white"
    >

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          📚 Choose Your Class
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {classes.map((item) => (

            <Link
              key={item.id}
              href={`/class/${item.id}`}
              className="group"
            >

              <div
                className={`${item.color} rounded-2xl shadow-xl p-8 text-center text-white hover:scale-105 duration-300`}
              >

                <h3 className="text-5xl font-bold">
                  {item.id}
                </h3>

                <p className="mt-4 text-xl">
                  Class {item.id}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}