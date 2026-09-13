"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  UserRound,
  ChevronDown,
  Menu,
  X,
  ScanLine,
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add this value in frontend/.env.local:
  // NEXT_PUBLIC_ADMIN_NAME=yourusername
  const adminName = process.env.NEXT_PUBLIC_ADMIN_NAME
    ?.trim()
    .toLowerCase();

  // Extracts the part before @ from the logged-in email
  const loggedInUsername = user?.email
    ?.split("@")[0]
    ?.trim()
    .toLowerCase();

  const isAdmin =
    Boolean(user) &&
    Boolean(adminName) &&
    loggedInUsername === adminName;

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.removeItem("token");

    setUser(null);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);

    router.push("/login");
    router.refresh();
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-50 flex items-center justify-between bg-[#334155] px-4 py-3 sm:px-6 md:px-8">
      {/* Logo */}
      <Link href="/" onClick={closeMobileMenu}>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt="RideDMJ Logo"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />

          <div>
            <span className="text-xl text-white sm:text-2xl">
              Ride
            </span>
            <span className="text-xl text-green-400 sm:text-2xl">
              DMJ
            </span>
          </div>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden items-center gap-6 md:flex lg:gap-10">
        <li>
          <Link
            href="/"
            className="font-bold text-white transition hover:text-green-400"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/busschedule"
            className="font-bold text-white transition hover:text-green-400"
          >
            Bus Schedule
          </Link>
        </li>

        <li>
          <Link
            href="/my-booking"
            className="font-bold text-white transition hover:text-green-400"
          >
            My Booking
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            className="font-bold text-white transition hover:text-green-400"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Desktop User Section */}
      <div className="hidden md:block">
        {user ? (
          <div className="relative">
            <div className="flex items-center gap-3">
              {/* Admin-only Scan Button */}
              {isAdmin && (
                <Link
                  href="/scan"
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <ScanLine className="h-5 w-5" />
                  Scan
                </Link>
              )}

              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Open profile menu"
                aria-expanded={isDropdownOpen}
                className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <UserRound className="h-6 w-6" />

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 z-50 w-56 rounded-xl bg-white p-4 shadow-lg">
                <p className="text-sm text-slate-500">
                  Roll Number
                </p>

                <p className="mt-1 break-all font-semibold text-slate-900">
                  {user.email?.split("@")[0]}
                </p>

                <div className="my-3 border-t border-slate-200" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg px-4 py-2 text-left font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-600 sm:px-5 sm:text-base"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="rounded-lg p-2 text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 md:hidden"
      >
        {isMenuOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <Menu className="h-7 w-7" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-[#334155] px-6 py-5 shadow-lg md:hidden">
          <ul className="flex flex-col gap-5">
            <li>
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block font-bold text-white transition hover:text-green-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/busschedule"
                onClick={closeMobileMenu}
                className="block font-bold text-white transition hover:text-green-400"
              >
                Bus Schedule
              </Link>
            </li>

            <li>
              <Link
                href="/my-booking"
                onClick={closeMobileMenu}
                className="block font-bold text-white transition hover:text-green-400"
              >
                My Booking
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block font-bold text-white transition hover:text-green-400"
              >
                Contact
              </Link>
            </li>

            {/* Mobile User Section */}
            <li className="border-t border-slate-500 pt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-white">
                    <UserRound className="h-5 w-5" />

                    <span className="break-all text-sm">
                      {user.email?.split("@")[0]}
                    </span>
                  </div>

                  {/* Mobile Admin-only Scan Button */}
                  {isAdmin && (
                    <Link
                      href="/scan"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-center font-semibold text-white transition hover:bg-green-600"
                    >
                      <ScanLine className="h-5 w-5" />
                      Scan Ticket
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-500 px-4 py-2 text-left font-semibold text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block rounded-lg bg-green-500 px-4 py-2 text-center font-semibold text-white transition hover:bg-green-600"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;