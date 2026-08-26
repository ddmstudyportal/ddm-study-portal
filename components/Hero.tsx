export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Dream • Discover • Master
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-10">
          Learn Smarter, Score Better
        </p>

        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search Notes, Classes, Subjects..."
            className="w-full px-5 py-4 rounded-xl text-gray-800 outline-none shadow-lg"
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap">

          <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
            Explore Classes
          </button>

          <button className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition">
            Download Notes
          </button>

        </div>

      </div>
    </section>
  );
}