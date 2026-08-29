"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault();

    setMessage("");

    if (!name || !mobile || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields.");
      return;
    }

    if (mobile.length !== 10) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        mobile,
        email,
        createdAt: new Date(),
      });

      setMessage("Account created successfully!");

      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error: any) {

      setMessage(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center px-6 py-10">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            DDM
          </h1>

          <p className="text-gray-700 font-medium">
            Dream • Discover • Master
          </p>

          <h2 className="text-2xl font-bold mt-6 text-gray-900">
            Create Student Account
          </h2>

        </div>


        {/* Register Form */}

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Full Name */}

          <div>

            <label className="block mb-2 font-semibold text-gray-900">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Mobile Number */}

          <div>

            <label className="block mb-2 font-semibold text-gray-900">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Email */}

          <div>

            <label className="block mb-2 font-semibold text-gray-900">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Password */}

          <div>

            <label className="block mb-2 font-semibold text-gray-900">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Confirm Password */}

          <div>

            <label className="block mb-2 font-semibold text-gray-900">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>


          {/* Message */}

          {message && (

            <p
              className={`text-center font-semibold ${
                message.includes("successfully")
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>

          )}

        </form>


        {/* Login Link */}

        <p className="text-center mt-6 text-gray-800 font-medium">

          Already have an account?

          <a
            href="/login"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Login
          </a>

        </p>

      </div>

    </main>

  );
}