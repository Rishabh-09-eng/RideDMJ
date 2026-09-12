"use client";

import schedule from "@/data/schedule";

export default function BookTicketPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const availableSlots = schedule.filter((slot) =>
    slot.operatingDays.includes(today)
  );

  const handleSlotSelect = (slot) => {
    console.log("Selected slot:", slot);
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

          {availableSlots.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-slate-600">
              No bus slots are available today.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotSelect(slot)}
                  className="rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-green-400 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">
                      {slot.busNumber}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Available
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold text-slate-900">
                    {slot.time}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
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