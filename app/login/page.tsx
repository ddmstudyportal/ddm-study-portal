"use client";

import Image from "next/image";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let userData: any;

      if (userSnap.exists()) {
        userData = userSnap.data();
      } else {
        userData = {
          uid: user.uid,
          email: user.email || email,
          role: "student",
          createdAt: new Date(),
        };

        await setDoc(userRef, userData);
      }

      if (userData.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

    } catch (error: any) {
      console.log("Login Error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
          setMessage("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setMessage("User not found.");
          break;

        case "auth/wrong-password":
          setMessage("Incorrect password.");
          break;

        case "auth/too-many-requests":
          setMessage("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setMessage("Network error. Please check your internet connection.");
          break;

        default:
          setMessage(error.message || "Login failed.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center px-4 sm:px-6 py-10">

      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-lg">

        {/* DDM Logo + Header */}
        <div className="text-center mb-8">

          <div className="flex justify-center mb-4">
            <Image
              src="/images/ddm-logo.png"
              alt="DDM Study Portal Logo"
              width={110}
              height={110}
              priority
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-blue-600">
            DDM
          </h1>

          <p className="text-gray-800 font-semibold mt-1">
            Dream • Discover • Master
          </p>

          <p className="text-gray-600 text-sm mt-1">
            Study Portal
          </p>

          <h2 className="text-2xl font-bold mt-6 text-gray-900">
            Login
          </h2>

        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {message && (
            <p className="text-center text-red-600 font-semibold">
              {message}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 !text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center mt-6 text-gray-800 font-medium">
          Don't have an account?

          <a
            href="/register"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Register
          </a>
        </p>

      </div>

    </main>
  );
}