export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mt-4 text-xl">
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">

        <div className="bg-white rounded-2xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-8">
            Send us a Message
          </h2>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-4 rounded-lg"
            />

            <textarea
              rows={6}
              placeholder="Message"
              className="w-full border p-4 rounded-lg"
            />

            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}