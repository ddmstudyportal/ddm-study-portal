import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      {/* =========================
          DESKTOP SIDEBAR
      ========================== */}
      <aside className="hidden lg:block w-72 shrink-0 bg-blue-700 text-white min-h-screen p-6">

        {/* DDM Logo */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            DDM
          </h1>

          <p className="text-sm text-white mt-1">
            Dream • Discover • Master
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <h2 className="text-xl font-bold text-white mb-5">
            Navigation
          </h2>

          <ul className="space-y-3 text-lg">

            <li>
              <Link
                href="/dashboard"
                className="block text-white bg-blue-600 px-4 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition font-semibold"
              >
                🏠 Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                👤 Profile
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                📚 My Courses
              </Link>
            </li>

            <li>
              <Link
                href="/downloads"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                📄 Notes
              </Link>
            </li>

            <li>
              <Link
                href="/downloads"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                📥 Downloads
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                📝 Assignments
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                📢 Announcements
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
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

        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4">

          <div>
            <h1 className="text-2xl font-bold text-white">
              DDM
            </h1>

            <p className="text-xs text-white">
              Dream • Discover • Master
            </p>
          </div>

          <span className="text-sm text-white font-semibold">
            Student Portal
          </span>

        </div>


        {/* Mobile Navigation */}
        <nav className="overflow-x-auto">

          <div className="flex gap-3 min-w-max">

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              🏠 Dashboard
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              👤 Profile
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              📚 Courses
            </Link>

            <Link
              href="/downloads"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              📄 Notes
            </Link>

            <Link
              href="/downloads"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              📥 Downloads
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              📝 Assignments
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              📢 Announcements
            </Link>

            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-500 hover:text-white font-semibold"
            >
              ⚙ Settings
            </Link>

          </div>

        </nav>
      </div>
    </>
  );
}