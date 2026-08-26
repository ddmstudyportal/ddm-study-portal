import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-3xl font-bold text-blue-600">
            DDM
          </span>

          <span className="text-sm text-gray-500">
            Dream • Discover • Master
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-gray-700 font-medium">

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

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>

      </div>
    </header>
  );
}