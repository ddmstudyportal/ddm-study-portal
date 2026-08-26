export default function Sidebar() {

  return (

    <aside className="w-72 bg-blue-700 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">

        DDM

      </h1>

      <nav>

        <ul className="space-y-5 text-lg">

          <li className="hover:text-yellow-300 cursor-pointer">
            🏠 Dashboard
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            👤 Profile
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            📚 My Courses
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            📄 Notes
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            📥 Downloads
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            📝 Assignments
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            📢 Announcements
          </li>

          <li className="hover:text-yellow-300 cursor-pointer">
            ⚙ Settings
          </li>

        </ul>

      </nav>

    </aside>

  );

}