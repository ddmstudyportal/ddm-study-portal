"use client";

type Props = {
  active: string;
  student: any;
};

export default function DashboardContent({
  active,
  student,
}: Props) {

  switch (active) {

    case "Dashboard":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Welcome {student?.name}
          </h1>

          <p className="mt-3 text-gray-500">
            Welcome to your DDM Student Dashboard.
          </p>
        </div>
      );

    case "My Profile":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Student Profile
          </h2>

          <p><b>Name:</b> {student?.name}</p>

          <p className="mt-3">
            <b>Email:</b> {student?.email}
          </p>

          <p className="mt-3">
            <b>Mobile:</b> {student?.mobile}
          </p>

        </div>
      );

    case "My Courses":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">
            My Courses
          </h2>

          <p className="mt-4 text-gray-500">
            No Courses Enrolled Yet.
          </p>
        </div>
      );

    case "Notes":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">
            Notes
          </h2>

          <p className="mt-4 text-gray-500">
            Notes will appear here.
          </p>
        </div>
      );

    case "Downloads":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">
            Downloads
          </h2>

          <p className="mt-4 text-gray-500">
            Download history will appear here.
          </p>
        </div>
      );

    case "Favorites":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">
            Favorites
          </h2>

          <p className="mt-4 text-gray-500">
            Favorite Notes will appear here.
          </p>
        </div>
      );

    case "Settings":
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">
            Settings
          </h2>

          <p className="mt-4 text-gray-500">
            Account Settings will appear here.
          </p>
        </div>
      );

    default:
      return null;
  }

}