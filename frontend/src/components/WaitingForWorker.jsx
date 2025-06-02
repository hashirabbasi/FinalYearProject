import React from 'react'

const WaitingForWorker = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.WaitingForWorker(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
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
    </div>
  )
}

export default WaitingForWorker