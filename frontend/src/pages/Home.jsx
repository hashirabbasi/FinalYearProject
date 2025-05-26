import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    //fix the background image and the height of the div
    <div className=' bg-cover bg-center bg-[url(https://images.pexels.com/photos/31161653/pexels-photo-31161653/free-photo-of-green-screwdriver-on-metallic-surface-close-up.jpeg?auto=compress&cs=tinysrgb&w=600)]   h-screen pt-8  flex justify-between flex-col w-full '>
        <img className='w-20 ml-8' src  = "image.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4 '>
            <h2 className='text-3xl font-bold'>Get Started with Sahulat</h2>
            <Link to="/UserLogin" className='flex items-center justify-center justify w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>

        </div>
    </div>
  )
}

export default Home