"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookTicketPage() {
    const router = useRouter();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:8000/api/trips/"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.detail || "Failed to fetch bus trips"
                    );
                }

                setTrips(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching trips:", error);
                setError("Unable to load bus slots. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const handleSelectTrip = (trip) => {
        router.push(
            `/confirm?tripId=${encodeURIComponent(
                trip.t_id
            )}&bus=${encodeURIComponent(
                trip.t_bus_id
            )}&time=${encodeURIComponent(
                trip.t_time
            )}&direction=${encodeURIComponent(
                trip.t_direction || ""
            )}`
        );
    };

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 text-center sm:text-left">
                    <p className="text-sm font-semibold text-green-600 sm:text-base">
                        RideDMJ
                    </p>

                    <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Book Your Bus Ticket
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                        Select an available bus slot for your journey.
                    </p>
                </div>

                {loading && (
                    <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                        <p className="text-slate-600">
                            Loading available bus slots...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl bg-red-50 p-6 text-center">
                        <p className="text-sm text-red-700 sm:text-base">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && trips.length === 0 && (
                    <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                        <p className="text-slate-600">
                            No bus slots are available today.
                        </p>
                    </div>
                )}

                {!loading && !error && trips.length > 0 && (
                    <section>
                        <h2 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                            Available Bus Slots
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                            {trips.map((trip) => {
                                const availableSeats =
                                    trip.t_available_seats ?? 0;

                                const isFull = availableSeats <= 0;

                                return (
                                    <div
                                        key={trip.t_id}
                                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span className="text-sm font-semibold text-slate-500">
                                                Bus {trip.t_bus_id}
                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    isFull
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {isFull
                                                    ? "Full"
                                                    : "Available"}
                                            </span>
                                        </div>

                                        <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:mt-5 sm:text-3xl">
                                            {String(trip.t_time)}
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-600 sm:text-base">
                                            {trip.t_direction}
                                        </p>

                                        <p className="mt-4 text-sm text-slate-600">
                                            <span className="font-semibold text-slate-800">
                                                Available seats:
                                            </span>{" "}
                                            {availableSeats}
                                        </p>

                                        <button
                                            type="button"
                                            disabled={isFull}
                                            onClick={() =>
                                                handleSelectTrip(trip)
                                            }
                                            className="mt-5 w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 sm:text-base"
                                        >
                                            {isFull
                                                ? "Bus Full"
                                                : "Select Trip"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}