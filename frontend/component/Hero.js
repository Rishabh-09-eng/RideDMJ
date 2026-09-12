import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-125 w-full overflow-hidden sm:min-h-137.5 md:h-125">
      
      <Image
        src="/hero.jpeg"
        alt="RideDMJ transportation"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex min-h-125 flex-col justify-center px-5 py-12 text-white sm:px-8 md:min-h-125 md:px-12 lg:px-16">
        <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white/95 sm:text-4xl md:text-5xl">
          Travel Smarter with RideDMJ
        </h1>

        <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-200 sm:text-lg">
          Your campus transportation, made simple. Check bus schedules,
          manage bookings, and travel with ease.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-5 md:gap-8">
          <Link href="/busschedule" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600 sm:px-6"
            >
              Explore Bus Schedules
            </button>
          </Link>

          <Link href="/book-ticket" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600 sm:px-6"
            >
              Book Ticket
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;