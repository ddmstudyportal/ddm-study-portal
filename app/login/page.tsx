"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
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

      // Firebase Authentication Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Firestore se User Data
      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {

        setMessage("User data not found.");

        return;

      }

      const userData = userSnap.data();

      // Role Check
      if (userData.role === "admin") {

        router.push("/admin");

      } else {

        router.push("/dashboard");

      }

    } catch (error: any) {

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

        default:
          setMessage(error.message);

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center px-6 py-10">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            DDM
          </h1>

          <p className="text-gray-500">
            Dream • Discover • Master
          </p>

          <h2 className="text-2xl font-bold mt-6">
            Login
          </h2>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {message && (

            <p className="text-center text-red-600 font-medium">
              {message}
            </p>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <a
            href="/register"
            className="text-blue-600 ml-2 hover:underline"
          >
            Register
          </a>

        </p>

      </div>

    </main>

  );

}