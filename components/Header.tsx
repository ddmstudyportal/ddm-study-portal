"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col"
            onClick={closeMenu}
          >
            <span className="text-3xl font-bold text-blue-600">
              DDM
            </span>

            <span className="text-sm font-medium text-gray-700">
              Dream • Discover • Master
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-gray-800 font-semibold">

            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link href="/classes" className="hover:text-blue-600 transition">
              Classes
            </Link>

            <Link href="/subjects" className="hover:text-blue-600 transition">
              Subjects
            </Link>

            <Link href="/downloads" className="hover:text-blue-600 transition">
              Downloads
            </Link>

            <Link href="/about" className="hover:text-blue-600 transition">
              About
            </Link>

            <Link href="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>

          </nav>

          {/* Desktop Login */}
          <Link
            href="/login"
            className="hidden lg:block bg-blue-600 !text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-900 text-3xl font-bold p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="lg:hidden mt-4 border-t border-gray-200 pt-4 pb-2">

            <div className="flex flex-col gap-1 text-gray-900 font-semibold">

              <Link
                href="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Home
              </Link>

              <Link
                href="/classes"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Classes
              </Link>

              <Link
                href="/subjects"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Subjects
              </Link>

              <Link
                href="/downloads"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Downloads
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Contact
              </Link>

              {/* Mobile Login */}
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-2 bg-blue-600 !text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </Link>

            </div>

          </nav>
        )}

      </div>

    </header>
  );
}