import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="bg-blue-600 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl sm:text-5xl font-bold !text-white">
            Contact Us
          </h1>

          <p className="mt-4 text-lg sm:text-xl !text-white">
            We'd love to hear from you.
          </p>

        </div>
      </section>

      {/* =========================================
          CONTACT SECTION
      ========================================= */}

      <section className="max-w-6xl mx-auto py-12 sm:py-16 px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* =====================================
              CONTACT INFORMATION
          ===================================== */}

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-700 leading-7 mb-8">
              Have a question, suggestion or feedback about DDM Study
              Portal? Feel free to contact us using the details below.
            </p>

            <div className="space-y-6">

              {/* EMAIL */}
              <div className="flex items-start gap-4">

                <div className="text-2xl">
                  📧
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Email
                  </h3>

                  <a
                    href="mailto:info.ddmstudyportal@gmail.com"
                    className="text-blue-600 font-semibold hover:underline break-all"
                  >
                    info.ddmstudyportal@gmail.com
                  </a>
                </div>

              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">

                <div className="text-2xl">
                  📞
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Phone
                  </h3>

                  <a
                    href="tel:+917982661287"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    +91 7982661287
                  </a>
                </div>

              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-4">

                <div className="text-2xl">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Location
                  </h3>

                  <p className="text-gray-700 font-medium">
                    India
                  </p>
                </div>

              </div>

              {/* SOCIAL MEDIA */}
              <div className="pt-4 border-t border-gray-200">

                <h3 className="font-bold text-gray-900 mb-4">
                  Follow DDM Study Portal
                </h3>

                <div className="flex flex-wrap gap-4">

                  {/* FACEBOOK */}
                  <a
                    href="https://www.facebook.com/share/1KSTb6xYwK/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 !text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    👍 Facebook
                  </a>

                  {/* INSTAGRAM */}
                  <a
                    href="https://www.instagram.com/ddm_study_portal?stkn=MTExOXJoZ2liMWxheQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 !text-white px-5 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
                  >
                    📸 Instagram
                  </a>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================
              MESSAGE FORM
          ===================================== */}

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send us a Message
            </h2>

            <form className="space-y-6">

              {/* NAME */}
              <div>

                <label className="block mb-2 font-semibold text-gray-900">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 p-4 rounded-lg text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block mb-2 font-semibold text-gray-900">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 p-4 rounded-lg text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="block mb-2 font-semibold text-gray-900">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message"
                  className="w-full border border-gray-300 p-4 rounded-lg text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* SEND */}
              <button
                type="submit"
                className="w-full bg-blue-600 !text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

        {/* =========================================
            QUICK CONTACT
        ========================================= */}

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">

          <p className="text-gray-800 font-medium">
            For study material related queries, contact us at
          </p>

          <a
            href="mailto:info.ddmstudyportal@gmail.com"
            className="inline-block mt-2 text-blue-700 font-bold hover:underline break-all"
          >
            info.ddmstudyportal@gmail.com
          </a>

        </div>

      </section>

    </main>
  );
}