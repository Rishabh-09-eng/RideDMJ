import React from 'react'
import Link from 'next/link'

const footer = () => {
  return (
    <footer className='bg-gray-500 text-white/60 text-[14px] px-6 py-3'>
        <div className='text-white font-bold pb-4'>
            <h3>RideDMJ</h3>
            <p>Your digital bus ticketing platform for IIITDMJ.</p>
        </div>
        <div className='grid grid-cols-3 pb-4'>
            <div>
                <h4 className='text-white font-semibold'>Quick Links</h4>
                <ul className='flex flex-col'>
                    <Link href="/"><li>Home</li></Link>
                    <Link href="book-ticket"><li>Book Ticket</li></Link>
                    <Link href="about"><li>About</li></Link>
                </ul>
            </div>
            <div>
                <h4 className='text-white font-semibold'>Important</h4>
                <ul className='flex flex-col'>
                    <Link href="busschedule"><li>Bus Schedule</li></Link>
                    <Link href="booking-guidance"><li>Booking Guidance</li></Link>
                </ul>
            </div>
            <div>
                <h4 className='text-white font-semibold'>Connect</h4>
                <ul className='flex flex-col'>
                    <a
                      href="https://github.com/Rishabh-09-eng/RideDMJ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.iiitdmj.ac.in/downloads/time%20table%20Detailed.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact
                    </a>
                    
                </ul>
            </div>
        </div>
        <div className='text-white'>
            <p>Built with ❤️ by Team RideDMJ</p>
            © 2026 RideDMJ. All rights reserved.
        </div>
    </footer>
    
  )
}

export default footer
