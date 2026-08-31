"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";

import { auth, db } from "../../lib/firebase";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export default function RegisterPage() {
  const router = useRouter();

  // =========================================
  // STATES
  // =========================================

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // =========================================
  // REGISTER
  // =========================================

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setMessage("");
    setSuccess(false);

    // =======================================
    // CLEAN DATA
    // =======================================

    const cleanName = name.trim();
    const cleanMobile = mobile.trim();
    const cleanEmail = email.trim().toLowerCase();

    // =======================================
    // REQUIRED FIELD VALIDATION
    // =======================================

    if (
      !cleanName ||
      !cleanMobile ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    // =======================================
    // MOBILE VALIDATION
    // =======================================

    if (!/^[0-9]{10}$/.test(cleanMobile)) {
      setMessage(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    // =======================================
    // EMAIL VALIDATION
    // =======================================

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      setMessage(
        "Please enter a valid email address."
      );
      return;
    }

    // =======================================
    // PASSWORD VALIDATION
    // =======================================

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    // =======================================
    // CONFIRM PASSWORD
    // =======================================

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // =======================================
    // START REGISTRATION
    // =======================================

    setLoading(true);

    try {
      // =====================================
      // CREATE FIREBASE AUTH ACCOUNT
      // =====================================

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

      const user = userCredential.user;

      // =====================================
      // SAVE USER PROFILE TO FIRESTORE
      // =====================================

      try {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: cleanName,
            mobile: cleanMobile,
            email: cleanEmail,
            role: "student",
            createdAt: serverTimestamp(),
          }
        );
      } catch {
        // ===================================
        // ROLLBACK AUTH USER
        // ===================================

        try {
          await deleteUser(user);
        } catch {
          // Rollback failed.
          // Original Firestore error is handled below.
        }

        throw new Error(
          "Account create ho gaya tha, lekin profile save nahi ho paayi. Please try again."
        );
      }

      // =====================================
      // SUCCESS
      // =====================================

      setSuccess(true);

      setMessage(
        "Account created successfully! Redirecting to Login..."
      );

      // Clear form
      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // =====================================
      // REDIRECT TO LOGIN
      // =====================================

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (error: any) {
      // =====================================
      // FIREBASE ERROR HANDLING
      // =====================================

      let errorMessage =
        "Account create nahi ho pa raha hai. Please try again.";

      switch (error?.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already registered. Please use another email or Login.";
          break;

        case "auth/invalid-email":
          errorMessage =
            "Please enter a valid email address.";
          break;

        case "auth/weak-password":
          errorMessage =
            "Password is too weak. Please use at least 6 characters.";
          break;

        case "auth/operation-not-allowed":
          errorMessage =
            "Email/Password registration Firebase me enabled nahi hai.";
          break;

        case "auth/network-request-failed":
          errorMessage =
            "Network problem. Please check your internet connection.";
          break;

        case "auth/too-many-requests":
          errorMessage =
            "Too many attempts. Please wait for some time and try again.";
          break;

        case "auth/admin-restricted-operation":
          errorMessage =
            "Registration is currently restricted by Firebase settings.";
          break;

        default:
          if (
            error?.message?.includes(
              "profile save nahi ho paayi"
            )
          ) {
            errorMessage =
              "Account create ho gaya tha, lekin profile save nahi ho paayi. Please try again.";
          }
          break;
      }

      setSuccess(false);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">

      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-lg">

        {/* ===================================
            HEADER
        =================================== */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            DDM
          </h1>

          <p className="text-gray-700 font-medium mt-1">
            Dream • Discover • Master
          </p>

          <h2 className="text-2xl font-bold mt-6 text-gray-900">
            Create Student Account
          </h2>

          <p className="text-gray-600 text-sm mt-2">
            Register to access DDM Study Portal
          </p>

        </div>

        {/* ===================================
            REGISTER FORM
        =================================== */}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* FULL NAME */}

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              disabled={loading}
              autoComplete="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* MOBILE */}

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Mobile Number
            </label>

            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                setMobile(value);
              }}
              disabled={loading}
              maxLength={10}
              autoComplete="tel"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />

            <p className="text-xs text-gray-500 mt-1">
              Enter exactly 10 digits
            </p>
          </div>

          {/* EMAIL */}

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              disabled={loading}
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />

            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 characters
            </p>
          </div>

          {/* CONFIRM PASSWORD */}

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              disabled={loading}
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 !text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          {/* MESSAGE */}

          {message && (
            <div
              className={`rounded-lg p-3 text-center font-semibold text-sm ${
                success
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

        </form>

        {/* ===================================
            LOGIN LINK
        =================================== */}

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