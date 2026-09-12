import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-500 px-5 py-8 text-sm text-white/70 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-white/20 pb-6">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            RideDMJ
          </h3>

          <p className="mt-2 max-w-md leading-relaxed">
            Your digital bus ticketing platform for IIITDMJ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 border-b border-white/20 pb-8 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <h4 className="mb-3 font-semibold text-white">
              Quick Links
            </h4>

            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-green-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/book-ticket"
                  className="transition hover:text-green-300"
                >
                  Book Ticket
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-green-300"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">
              Important
            </h4>

            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/busschedule"
                  className="transition hover:text-green-300"
                >
                  Bus Schedule
                </Link>
              </li>

              <li>
                <Link
                  href="/booking-guidance"
                  className="transition hover:text-green-300"
                >
                  Booking Guidance
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">
              Connect
            </h4>

            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://github.com/Rishabh-09-eng/RideDMJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all transition hover:text-green-300"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://www.iiitdmj.ac.in/downloads/time%20table%20Detailed.pdf"
                  className="break-all transition hover:text-green-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs sm:text-sm">
          <p className="text-white">
            Built with ❤️ by Team RideDMJ
          </p>

          <p>© 2026 RideDMJ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;