interface StudentProfileProps {
  student: {
    name: string;
    email: string;
    mobile: string;
    uid: string;
    createdAt?: any;
  };
}

export default function StudentProfile({
  student,
}: StudentProfileProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-blue-600">
          Student Profile
        </h2>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Full Name</p>
          <h3 className="font-bold text-xl">
            {student.name}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h3 className="font-bold">
            {student.email}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Mobile Number</p>
          <h3 className="font-bold">
            {student.mobile}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">User ID</p>
          <h3 className="text-sm break-all">
            {student.uid}
          </h3>
        </div>

      </div>

    </div>
  );
}