"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Captcha, { generateCaptchaCode } from "@/component/Captcha";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptchaCode);
  const [captchaError, setCaptchaError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCaptchaError("");

    if (!email.endsWith("@iiitdmj.ac.in")) {
      alert("Please use college's email address");
      return;
    }

    // Verify CAPTCHA before login
    if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setCaptchaError("Incorrect CAPTCHA code. Please try again.");
      handleRefreshCaptcha();
      return;
    }

    try {
      setSubmitting(true);
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        handleRefreshCaptcha();
        return;
      }

      const token = data.session.access_token;
      localStorage.setItem("token", token);

      router.push("/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-8">

        <div className="mb-7 text-center sm:mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Login to your RideDMJ account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700 sm:text-base"
            >
              College Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="yourname@iiitdmj.ac.in"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 sm:px-4 sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700 sm:text-base"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 sm:px-4 sm:text-base"
            />
          </div>

          <Captcha
            captchaCode={captchaCode}
            onRefresh={handleRefreshCaptcha}
            userInput={captchaInput}
            onUserInputChange={(e) => {
              setCaptchaInput(e.target.value);
              if (captchaError) setCaptchaError("");
            }}
            error={captchaError}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 sm:text-base"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm leading-relaxed text-slate-600">
          New to RideDMJ?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-600 transition hover:text-green-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;