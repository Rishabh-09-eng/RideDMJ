"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setTickets(data.tickets || []);
        }
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          My Tickets
        </h1>

        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-slate-500">Loading your tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-slate-600">You don't have any bookings yet.</p>
          </div>
        ) : (
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
                  className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row"
                >
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <span className="text-xl font-bold text-slate-900">
                        Bus {ticket.bus_id}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ticket.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : ticket.status === "USED"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600">
                      🕒 Time: <span className="font-medium text-slate-900">{ticket.time}</span>
                    </p>
                    <p className="text-sm text-slate-600">
                      📍 Route:{" "}
                      <span className="font-medium text-slate-900">
                        {ticket.direction?.replace(/_/g, " ") || "Institute → Sadar"}
                      </span>
                    </p>
                    {ticket.ticket_code && (
                      <p className="inline-block rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                        Code: {ticket.ticket_code}
                      </p>
                    )}
                  </div>

                  {/* QR Code */}
                  {ticket.status === "CONFIRMED" && qrUrl ? (
                    <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrUrl}
                        alt="Ticket QR Code"
                        className="h-36 w-36"
                      />
                      <span className="mt-2 text-xs text-slate-500">
                        Show to conductor to scan
                      </span>
                    </div>
                  ) : ticket.status === "USED" ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-center">
                      <p className="text-sm font-semibold text-slate-500">
                        Ticket Used
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
