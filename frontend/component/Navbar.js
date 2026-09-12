"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from "@/utils/supabase/client";
import {UserRound, ChevronDown} from 'lucide-react'

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const supabase = createClient();

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
    },     []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    setUser(null);
    setIsDropdownOpen(false);
}

  
  return (
    <>
        <nav className='flex justify-between items-center px-8 py-4 gap-10 bg-[#334155]'>
            <Link href="/"><div className='flex justify-between items-center'>
                <Image className='' width={50} height={50} src="/logo.svg" alt="Logo" />
                <div>
                    <span className='text-white text-2xl'>Ride</span>
                    <span className='text-green-400 text-2xl'>DMJ</span>
                </div>
            </div></Link>
            <ul className='flex gap-10'>
                <Link href="/"><li className='text-white font-bold'>Home</li></Link>
                <Link href="/busschedule"><li className='text-white font-bold'>Bus Schedule</li></Link>
                <Link href=""><li className='text-white font-bold'>My Booking</li></Link>
                <Link href=""><li className='text-white font-bold'>Contact</li></Link>
            </ul>
            <div className="relative">
  {user ? (
    <>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-slate-700"
      >
        <UserRound className="h-6 w-6" />

        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-xl bg-white p-4 shadow-lg">
          <p className="text-sm text-slate-500">
            Roll Number
          </p>

          <p className="mt-1 font-semibold text-slate-900">
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
    </>
  ) : (
    <Link
      href="/login"
      className="rounded-lg bg-green-500 px-5 py-2 font-semibold text-white transition hover:bg-green-600"
    >
      Login
    </Link>
  )}
</div>
        </nav>
    </>
  )
}

export default Navbar
