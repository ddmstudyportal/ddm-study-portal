import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* DDM */}
          <div>
            <h2 className="text-3xl font-bold !text-white mb-4">
              DDM
            </h2>

            <p className="text-lg font-semibold !text-white mb-3">
              Dream • Discover • Master
            </p>

            <p className="leading-7 !text-gray-200">
              Learn Smarter, Score Better. Free Notes, Sample Papers,
              Previous Year Questions, Mock Tests and Study Materials
              for Classes 6 to 10.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold !text-white mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Contact
              </Link>

              <Link
                href="/downloads"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Downloads
              </Link>
            </div>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-xl font-bold !text-white mb-5">
              Classes
            </h3>

            <div className="space-y-3">
              <Link
                href="/class/6"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Class 6
              </Link>

              <Link
                href="/class/7"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Class 7
              </Link>

              <Link
                href="/class/8"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Class 8
              </Link>

              <Link
                href="/class/9"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Class 9
              </Link>

              <Link
                href="/class/10"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Class 10
              </Link>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-xl font-bold !text-white mb-5">
              Subjects
            </h3>

            <div className="space-y-3">
              <Link
                href="/subject/mathematics"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Mathematics
              </Link>

              <Link
                href="/subject/science"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Science
              </Link>

              <Link
                href="/subject/english"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                English
              </Link>

              <Link
                href="/subject/hindi"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Hindi
              </Link>

              <Link
                href="/subject/social-science"
                className="block !text-gray-200 hover:!text-blue-400 transition"
              >
                Social Science
              </Link>
            </div>
          </div>

        </div>

        {/* Contact & Social */}
        <div className="border-t border-gray-700 mt-12 pt-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Contact Information */}
            <div className="space-y-4">

              <p className="text-lg !text-white">
                📧{" "}
                <span className="font-semibold !text-white">
                  info@ddmstudy.in
                </span>
              </p>

              <p className="text-lg !text-white">
                📞{" "}
                <span className="font-semibold !text-white">
                  +91 9876543210
                </span>
              </p>

              <p className="text-lg !text-white">
                📍{" "}
                <span className="font-semibold !text-white">
                  India
                </span>
              </p>

            </div>

            {/* Social Links */}
            <div className="flex flex-wrap md:justify-end items-start gap-6">

              <a
                href="#"
                className="text-lg font-bold !text-white hover:!text-blue-400 transition"
              >
                Facebook
              </a>

              <a
                href="#"
                className="text-lg font-bold !text-white hover:!text-pink-400 transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-lg font-bold !text-white hover:!text-red-400 transition"
              >
                YouTube
              </a>

            </div>

          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">

          <p className="text-base font-medium !text-gray-300">
            © 2026 DDM (Dream • Discover • Master). All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}