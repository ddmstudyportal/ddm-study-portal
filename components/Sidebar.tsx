import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      {/* =========================
          DESKTOP SIDEBAR
      ========================== */}
      <aside className="hidden lg:block w-72 shrink-0 bg-blue-700 text-white min-h-screen p-6">

        <h1 className="text-3xl font-bold mb-10">
          DDM
        </h1>

        <nav>
          <ul className="space-y-5 text-lg">

            <li>
              <Link
                href="/dashboard"
                className="block hover:text-yellow-300 transition"
              >
                🏠 Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block hover:text-yellow-300 transition"
              >
                👤 Profile
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block hover:text-yellow-300 transition"
              >
                📚 My Courses
              </Link>
            </li>

            <li>
              <Link
                href="/downloads"
                className="block hover:text-yellow-300 transition"
              >
                📄 Notes
              </Link>
            </li>

            <li>
              <Link
                href="/downloads"
                className="block hover:text-yellow-300 transition"
              >
                📥 Downloads
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block hover:text-yellow-300 transition"
              >
                📝 Assignments
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block hover:text-yellow-300 transition"
              >
                📢 Announcements
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block hover:text-yellow-300 transition"
              >
                ⚙ Settings
              </Link>
            </li>

          </ul>
        </nav>
      </aside>


      {/* =========================
          MOBILE NAVIGATION
      ========================== */}
      <div className="lg:hidden w-full bg-blue-700 text-white p-4">

        <div className="flex items-center justify-between mb-4">

          <h1 className="text-2xl font-bold">
            DDM
          </h1>

          <span className="text-sm text-blue-100">
            Student Portal
          </span>

        </div>

        <nav className="overflow-x-auto">

          <div className="flex gap-3 min-w-max">

            <Link
              href="/dashboard"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              🏠 Dashboard
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              👤 Profile
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              📚 Courses
            </Link>

            <Link
              href="/downloads"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              📄 Notes
            </Link>

            <Link
              href="/downloads"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              📥 Downloads
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              📝 Assignments
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              📢 Announcements
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500"
            >
              ⚙ Settings
            </Link>

          </div>

        </nav>
      </div>
    </>
  );
}