import React from 'react'

const WorkerDeatails = () => {
  return (
    <div>
        <div className="flex  items-center justify-between ">
          <div className="flex items-center justify-start gap-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              alt="User avatar"
            />
            <h4 className="text-lg font-medium ">Ahmed Khan</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Rs280.30</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center items-start gap-4">
          <div className="text-center">
            <i className="  text-3xl mb-2 font-thin    ri-time-line"></i>
            <h5 className="text-lg font-medium">10.5</h5>
            <p className="text-sm text-gray-600 ">Hours Worked</p>
          </div>

          <div className="text-center">
            <i className="  text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">5</h5>
            <p className="text-sm text-gray-600 ">Jobs Completed</p>
          </div>
        </div>
    </div>
  )
}

export default WorkerDeatails