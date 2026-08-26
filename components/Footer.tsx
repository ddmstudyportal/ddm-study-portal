import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

            <h2 className="text-4xl font-bold text-blue-400">
              DDM
            </h2>

            <p className="mt-3 text-gray-300">
              Dream • Discover • Master
            </p>

            <p className="mt-3 text-gray-400 leading-7">
              Learn Smarter, Score Better.
              Free Notes, Sample Papers, Previous Year Questions,
              Mock Tests and Study Materials for Classes 6 to 10.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/downloads"
                  className="hover:text-blue-400 transition"
                >
                  Downloads
                </Link>
              </li>

            </ul>

          </div>

          {/* Classes */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Classes
            </h3>

            <ul className="space-y-3">

              <li><Link href="#" className="hover:text-blue-400 transition">Class 6</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Class 7</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Class 8</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Class 9</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Class 10</Link></li>

            </ul>

          </div>

          {/* Subjects */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Subjects
            </h3>

            <ul className="space-y-3">

              <li><Link href="#" className="hover:text-blue-400 transition">Mathematics</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Science</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">English</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Hindi</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Social Science</Link></li>

            </ul>

          </div>

        </div>

        {/* Contact Section */}

        <div className="border-t border-gray-700 mt-12 pt-10">

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <h3 className="text-xl font-semibold mb-4">
                Contact Us
              </h3>

              <p className="text-gray-300">
                📧 info@ddmstudy.in
              </p>

              <p className="text-gray-300 mt-2">
                📞 +91 9876543210
              </p>

              <p className="text-gray-300 mt-2">
                📍 India
              </p>

            </div>

            <div>

              <h3 className="text-xl font-semibold mb-4">
                Follow Us
              </h3>

              <div className="flex gap-4">

                <a
                  href="#"
                  className="hover:text-blue-400"
                >
                  Facebook
                </a>

                <a
                  href="#"
                  className="hover:text-blue-400"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="hover:text-blue-400"
                >
                  YouTube
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Copyright */}

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">

          <p className="text-gray-400">
            © 2026 DDM (Dream • Discover • Master). All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}