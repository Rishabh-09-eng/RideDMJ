
"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your bookings.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/booking_info/my-bookings",
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

        setBookings(data);
      } catch (err) {
        console.error("Booking fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          My Bookings
        </h1>

        {loading && (
          <p className="mt-8 text-center text-slate-600">
            Loading your bookings...
          </p>
        )}

        {!loading && error && (
          <div className="mx-auto mt-8 max-w-lg rounded-xl bg-red-100 p-5 text-center text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="mx-auto mt-8 max-w-lg rounded-xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              No bookings found
            </h2>

            <p className="mt-2 text-slate-600">
              You have not made any bus bookings yet.
            </p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-slate-900">
                    Bus {booking.bus_id}
                  </h2>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {booking.booking_status || "Booked"}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Date</span>
                    <span className="font-semibold">{booking.date}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Time</span>
                    <span className="font-semibold">{booking.time}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Direction</span>
                    <span className="text-right font-semibold">
                      {booking.direction}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Booking ID</span>
                    <span className="font-semibold">
                      {booking.booking_id}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Trip ID</span>
                    <span className="font-semibold">
                      {booking.trip_id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;