export default function FeaturedNotes() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10 text-slate-900">
          📚 Featured Notes
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900">
              Class 10 Mathematics
            </h3>

            <p className="text-slate-700 mt-2">
              PDF Notes
            </p>

            <button className="mt-5 bg-blue-600 !text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Download
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900">
              Class 9 Science
            </h3>

            <p className="text-slate-700 mt-2">
              PDF Notes
            </p>

            <button className="mt-5 bg-blue-600 !text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Download
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900">
              Class 8 English
            </h3>

            <p className="text-slate-700 mt-2">
              PDF Notes
            </p>

            <button className="mt-5 bg-blue-600 !text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Download
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}