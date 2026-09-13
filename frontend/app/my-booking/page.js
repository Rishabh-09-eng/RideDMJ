"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/api/bookings/my-bookings",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Could not fetch bookings.");
        }

        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          My Bookings
        </h1>

        {loading && (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-slate-600">Loading your bookings...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl bg-red-100 p-5 text-center text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && tickets.length === 0 && (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              No bookings found
            </h2>

            <p className="mt-2 text-slate-600">
              You have not made any bus bookings yet.
            </p>
          </div>
        )}

        {!loading && !error && tickets.length > 0 && (
          <div className="space-y-6">
            {tickets.map((ticket) => {
              const verifyUrl = ticket.ticket_code
                ? `http://localhost:8000/api/bookings/verify/${ticket.ticket_code}`
                : "";

              const qrUrl = verifyUrl
                ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    verifyUrl
                  )}`
                : null;

              return (
                <div
                  key={ticket.booking_id}
                  className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        Bus {ticket.bus_id}
                      </h2>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {ticket.status || "CONFIRMED"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600">
                      Time:{" "}
                      <span className="font-semibold text-slate-900">
                        {ticket.time}
                      </span>
                    </p>

                    <p className="text-sm text-slate-600">
                      Route:{" "}
                      <span className="font-semibold text-slate-900">
                        {ticket.direction?.replace(/_/g, " ") ||
                          "Institute → Sadar"}
                      </span>
                    </p>

                    {ticket.ticket_code && (
                      <p className="inline-block rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                        Ticket Code: {ticket.ticket_code}
                      </p>
                    )}
                  </div>

                  {ticket.status === "CONFIRMED" && qrUrl && (
                    <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrUrl}
                        alt="Ticket QR Code"
                        className="h-36 w-36"
                      />

                      <p className="mt-2 text-xs text-slate-500">
                        Show this QR code to the conductor
                      </p>
                    </div>
                  )}

                  {ticket.status === "USED" && (
                    <div className="rounded-xl bg-slate-100 px-5 py-4 text-center">
                      <p className="text-sm font-semibold text-slate-500">
                        Ticket Used
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}