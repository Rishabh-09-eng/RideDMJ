"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const tripId = searchParams.get("tripId");
  const busNumber = searchParams.get("bus");
  const time = searchParams.get("time");
  const direction = searchParams.get("direction");
  const busId = busNumber?.replace("Bus ", "");

  const handlePayment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      // 1. Create booking and payment session
      const response = await fetch(`${API_URL}/api/trips/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trip_id: tripId ? Number(tripId) : undefined,
          bus_id: busId ? Number(busId) : undefined,
          bus_slot: time || undefined,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail = data.detail;
        const message =
          typeof detail === "string"
            ? detail
            : detail?.message ||
              detail?.error ||
              `Could not create booking (status ${response.status})`;
        alert(message);
        return;
      }

      if (!data.payment?.payment_session_id) {
        alert("Payment session could not be initialized.");
        return;
      }

      // 2. Open Cashfree Checkout Modal
      const cashfree = window.Cashfree({
        mode: "sandbox",
      });

      cashfree
        .checkout({
          paymentSessionId: data.payment.payment_session_id,
          redirectTarget: "_modal",
        })
        .then(async (result) => {
          if (result.error) {
            console.warn("Checkout modal closed or error:", result.error);
          }

          // 3. Verify Payment Status with Backend
          try {
            const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                order_id: data.payment.order_id,
                trip_id: data.trip_id,
              }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));

            if (verifyRes.ok && verifyData.success) {
              alert("Payment successful! Booking confirmed.");
              router.push("/my-booking");
            } else {
              alert(verifyData.message || "Payment not completed.");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("Unable to verify payment status.");
          }
        });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while initiating booking.");
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

      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Confirm Your Booking
          </h1>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Bus</span>
              <span className="font-semibold text-slate-900">
                {busNumber || "Not selected"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Departure</span>
              <span className="font-semibold text-slate-900">
                {time || "Not selected"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Route</span>
              <span className="text-right font-semibold text-slate-900">
                {direction
                  ? direction.replace(/_/g, " ")
                  : "Institute → Sadar"}
              </span>
            </div>

            <div className="flex justify-between gap-4 border-t pt-4">
              <span className="text-slate-500">Ticket price</span>
              <span className="font-bold text-green-600">₹20</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Opening Payment..." : "Pay ₹20"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Go Back
          </button>
        </div>
      </main>
    </>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-100">
          <p className="text-slate-600">Loading booking details...</p>
        </main>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}