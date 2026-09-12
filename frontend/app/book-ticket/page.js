"use client";

import schedule from "@/data/schedule";
import { useRouter } from "next/navigation";

export default function BookTicketPage() {
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const availableSlots = schedule.filter((slot) =>
    slot.operatingDays.includes(today)
  );

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-8 text-center sm:text-left">
          <p className="text-sm font-semibold text-green-600 sm:text-base">
            Today is {today}
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Book Your Bus Ticket
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Select an available bus from Institute to Sadar.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
            Available Bus Slots
          </h2>

          {availableSlots.length === 0 ? (
            <div className="rounded-xl bg-white p-5 text-center shadow-sm sm:p-6 sm:text-left">
              <p className="text-sm text-slate-600 sm:text-base">
                No bus slots are available today.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => {
                    router.push(
                      `/confirm?bus=${encodeURIComponent(
                        slot.busNumber
                      )}&time=${encodeURIComponent(slot.time)}`
                    );
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-1 hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-500">
                      {slot.busNumber}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:mt-5 sm:text-3xl">
                    {slot.time}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 sm:text-base">
                    Institute → Sadar
                  </p>

                  <p className="mt-4 text-sm font-semibold text-green-600">
                    Click to book →
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}