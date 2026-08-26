export default function WhyChoose() {
  const features = [
    "Free PDF Notes",
    "Latest Syllabus",
    "Previous Year Papers",
    "Mock Tests",
    "Video Lectures",
    "Doubt Support",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose DDM?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item) => (

            <div
              key={item}
              className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700">
                {item}
              </h3>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}