export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="font-semibold text-green-600">About RideDMJ</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Making campus travel easier
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          RideDMJ is a digital bus ticketing platform designed for
          IIITDM Jabalpur. It helps students view bus schedules,
          select available bus slots, and book their daily bus tickets
          through a simple and convenient interface.
        </p>

        <p className="mt-4 text-slate-600">
          Our goal is to make the institute bus booking process more
          organized, transparent, and accessible for students while
          reducing manual effort.
        </p>

        <div className="mt-8 rounded-xl bg-green-50 p-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Our Mission
          </h2>

          <p className="mt-2 text-slate-600">
            To provide a reliable and user-friendly digital solution
            for managing institute bus ticket bookings.
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Built with ❤️ by Team RideDMJ.
        </p>
      </div>
    </main>
  );
}