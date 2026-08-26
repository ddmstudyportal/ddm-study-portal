export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            About DDM
          </h1>

          <p className="mt-4 text-xl">
            Dream • Discover • Master
          </p>

        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">

        <div className="bg-white rounded-2xl shadow-lg p-10">

          <h2 className="text-3xl font-bold mb-6">
            Who We Are
          </h2>

          <p className="text-lg text-gray-700 leading-8">
            DDM (Dream • Discover • Master) is an educational platform
            specially designed for students of Classes 6 to 10.
          </p>

          <p className="text-lg text-gray-700 mt-5 leading-8">
            Our goal is to provide high-quality Notes, Sample Papers,
            Previous Year Questions, Mock Tests and Study Materials
            completely free and in an easy-to-understand format.
          </p>

          <p className="text-lg text-gray-700 mt-5 leading-8">
            Learn Smarter, Score Better.
          </p>

        </div>

      </section>

    </main>
  );
}