"use client";

import { useRouter } from "next/navigation";
import schedule from "@/data/schedule";

export default function BookTicketPage() {
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const handleSlotSelect = (slot) => {
    const isAvailableToday = slot.operatingDays.includes(today);

    if (!isAvailableToday) {
      return;
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-semibold text-green-600">
            Today is {today}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Book Your Bus Ticket
          </h1>

          <p className="mt-3 text-slate-600">
            Select an available bus from Institute to Sadar.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            Available Bus Slots
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schedule.map((slot) => {
              const isAvailableToday =
                slot.operatingDays.includes(today);

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!isAvailableToday}
                  onClick={() => handleSlotSelect(slot)}
                  className={`rounded-xl border p-5 text-left transition ${
                    !isAvailableToday
                      ? "cursor-not-allowed border-slate-200 bg-slate-200 opacity-45"
                      : "border-slate-200 bg-white hover:-translate-y-1 hover:border-green-400 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      {slot.busNumber}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isAvailableToday
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-300 text-slate-600"
                      }`}
                    >
                      {isAvailableToday
                        ? "Available"
                        : "Not running"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold text-slate-900">
                    {slot.time}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Institute → Sadar
                  </p>

                  <p className="mt-4 text-sm font-semibold text-green-600">
                    {isAvailableToday
                      ? "Click to book →"
                      : "Unavailable today"}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}