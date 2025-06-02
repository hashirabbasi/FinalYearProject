import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to="/Home" className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium  ri-home-2-line"></i>
      </Link>

         
    <div className='h-1/2' >
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
    </div>
    <div className='h-1/2 p-4 '>
    
      <div className="flex  items-center justify-between ">
   <img
          className="h-12"
          src="https://cdn-icons-png.flaticon.com/512/1839/1839365.png"
          alt="worker"
        />
        <div>
          <h2 className='text-lg font-medium'>Ahmed</h2>
          <h4 className='text-xl font-semibold -Mt-1 -mb-2'>Electrician</h4>
        </div>
      
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
      

        {/* Address Section */}
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 mb-4">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-small mt-1 text-gray-600">
                I-10/Markaz , Islamabad
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-600"></div>

        {/* Payment Section */}
        <div className="w-full">
          <div className="flex items-center gap-5 mb-4">
            <i className="text-lg ri-wallet-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">Rs. 800</h3>
              <p className="text-small mt-1 text-gray-600">
                Cash on service completion
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
    </div>
    </div>
  )
}

export default Riding