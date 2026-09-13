import React from 'react'

import { cookies } from "next/headers";
import AdminLogin from "@/component/admin/AdminLogin";
import LogoutButton from "@/component/admin/LogoutButton";

const page = async () => {
  const cookieStore = await cookies();

    const isAdmin = cookieStore.get("admin");

    if (!isAdmin) {
        return (
            <section className="min-h-screen bg-[#171714] text-white flex items-center justify-center px-6 md:px-16 py-12">
                <AdminLogin />
            </section>
        );
    }

  return (
    <section className='min-h-screen bg-[#171714] text-white '>
      <div className='flex justify-between items-center'>
        <h2 className='text-center font-bold text-2xl md:text-3xl py-16 px-6 md:px-16'>ADMIN DASHBOARD</h2>
        <LogoutButton/>
      </div>

    </section>
  )
}

export default page
