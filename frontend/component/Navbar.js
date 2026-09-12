import React from 'react'
import Image from 'next/image'
import {UserRound} from 'lucide-react'

const Navbar = () => {
  return (
    <>
        <nav className='flex justify-between items-center px-8 py-4 gap-10'>
            <div className='flex justify-between items-center'>
                <Image className='' width={50} height={50} src="/logo.svg" alt="Logo" />
                <div>
                    <span className='text-black text-2xl'>Ride</span>
                    <span className='text-green-700 text-2xl'>DMJ</span>
                </div>
            </div>
            <ul className='flex gap-10'>
                <li className='font-bold'>Home</li>
                <li className='font-bold'>Bus Schedule</li>
                <li className='font-bold'>My Booking</li>
                <li className='font-bold'>Contact</li>
            </ul>
            <div>
                <UserRound
                  size={28}
                  className="text-gray-700 cursor-pointer"
                />
            </div>
        </nav>
    </>
  )
}

export default Navbar
