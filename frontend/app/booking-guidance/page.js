import React from 'react'

const page = () => {
  return (
    <section className='border border-be-gray-400 w-[40%] h-[60%] mx-auto my-auto rounded-xl p-3'>
        <h1 className='text-center font-bold '>Booking Guidance</h1>

        <ul className='mt-6 text-slate-600'>
            <li className='text-center'>Use an official institute email to log in.</li>
            <li className='text-center'>select an available bus slot.</li>
            <li className='text-center'>An student can book only one ticket per day.</li>
            <li className='text-center'>Complete the payment process to confirm your booking.</li>
            <li className='text-center'>Show your confirmed ticket when boarding the bus.</li>
        </ul>
    </section>
  )
}

export default page
