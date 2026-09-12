import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {UserRound} from 'lucide-react'

const Navbar = () => {
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
                <Link href=""><li className='text-white font-bold'>Bus Schedule</li></Link>
                <Link href=""><li className='text-white font-bold'>My Booking</li></Link>
                <Link href=""><li className='text-white font-bold'>Contact</li></Link>
            </ul>
            <div>
                <UserRound
                  size={28}
                  className="text-white cursor-pointer"
                />
            </div>
        </nav>
    </>
  )
}

export default Navbar
