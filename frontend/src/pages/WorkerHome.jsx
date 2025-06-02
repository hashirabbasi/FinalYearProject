import React from 'react'
import { Link } from 'react-router-dom'

const WorkerHome = () => {
  return (
     <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <Link to="/Home" className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium  ri-logout-box-r-line"></i>
      </Link>
      </div>

         
    <div className='h-3/5' >
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
    </div>
    <div className='h-2/5 p-6 '>
    <div className='flex  items-center justify-between '>
      <div className='flex items-center justify-start gap-4'>

  <img
    className='h-10 w-10 rounded-full object-cover'
    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s'
    alt="User avatar"
  />
        <h4 className='text-lg font-medium '>Ahmed Khan</h4>
      </div>
      <div>
        <h4 className='text-xl font-semibold'>Rs280.30</h4>
        <p className='text-sm text-gray-600'>Earned</p>
      </div>
    </div>
      <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center items-start gap-4'>
         <div className='text-center'>
        <i className="  text-3xl mb-2 font-thin    ri-time-line"></i>
        <h5 className='text-lg font-medium'    >10.5</h5>
          <p className='text-sm text-gray-600 '   >Hours Worked</p>
      </div>

      <div className='text-center'>
        <i className="  text-3xl mb-2 font-thin ri-booklet-line"></i>
        <h5 className='text-lg font-medium' >5</h5>
        <p   className='text-sm text-gray-600 '>Jobs Completed</p>
        </div>    
      
      </div>
     
   
    </div>
    </div>
  )
}

export default WorkerHome