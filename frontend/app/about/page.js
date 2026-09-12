export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">
                <p className="text-sm font-semibold text-green-600 sm:text-base">
                    About RideDMJ
                </p>

                <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
                    Making campus travel easier
                </h1>

                <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                    RideDMJ is a digital bus ticketing platform designed for
                    IIITDM Jabalpur. It helps students view bus schedules,
                    select available bus slots, and book their daily bus
                    tickets through a simple and convenient interface.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    Our goal is to make the institute bus booking process more
                    organized, transparent, and accessible for students while
                    reducing manual effort.
                </p>

                <div className="mt-7 rounded-xl bg-green-50 p-4 sm:mt-8 sm:p-5">
                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        Our Mission
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                        To provide a reliable and user-friendly digital
                        solution for managing institute bus ticket bookings.
                    </p>
                </div>

                <p className="mt-7 text-sm text-slate-500 sm:mt-8">
                    Built with ❤️ by Team RideDMJ.
                </p>
            </div>
        </main>
    );
}