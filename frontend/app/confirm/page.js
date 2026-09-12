"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Script from "next/script";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const busNumber = searchParams.get("bus");
  const time = searchParams.get("time");

  const handlePayment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Could not create payment");
        return;
      }

      const cashfree = window.Cashfree({
        mode: "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
      />

      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-8">
          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Confirm Booking
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Please check your booking details
            </p>
          </div>

          {/* Booking Details */}
          <div className="mt-6 space-y-4 rounded-xl bg-slate-50 p-4 sm:mt-8 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500 sm:text-base">
                Bus
              </span>

              <span className="break-words text-right text-sm font-semibold text-slate-900 sm:text-base">
                {busNumber || "Not selected"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500 sm:text-base">
                Time
              </span>

              <span className="break-words text-right text-sm font-semibold text-slate-900 sm:text-base">
                {time || "Not selected"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500 sm:text-base">
                Route
              </span>

              <span className="text-right text-sm font-semibold text-slate-900 sm:text-base">
                Institute → Sadar
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
              <span className="font-semibold text-slate-700">
                Total
              </span>

              <span className="text-xl font-bold text-green-600 sm:text-2xl">
                ₹20
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            {loading ? "Opening Payment..." : "Pay ₹20"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:text-base"
          >
            Go Back
          </button>
        </div>
      </main>
    </>
  );
};

export default Page;