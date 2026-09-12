import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-125 w-full">
      <Image
        src="/hero.jpeg"
        alt="RideDMJ transportation"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white">
        <h1 className="text-5xl font-bold text-white/90">
          Travel Smarter with RideDMJ
        </h1>

        <p className="mt-4 max-w-lg text-lg text-gray-400">
          Your campus transportation, made simple.
          Check bus schedules, manage bookings, and travel with ease.
        </p>

        <div className="flex gap-10">
            <Link href="/busschedule"><button className="cursor-pointer mt-6 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600">
              Explore Bus Schedules
            </button></Link>
            <Link href="/book-ticket"><button className="cursor-pointer mt-6 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600">
              Book Ticket
            </button></Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;