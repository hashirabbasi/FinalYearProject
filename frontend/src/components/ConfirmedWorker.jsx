import React from "react";

const ConfirmedWorker = ({ setConfirmedWorkerPanel, setWorkerFound }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => setConfirmedWorkerPanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-3 text-center">Confirm your Service</h3>

      <div className="flex flex-col gap-4 justify-between items-center">
        <img
          className="h-20"
          src="https://cdn-icons-png.flaticon.com/512/1839/1839365.png"
          alt="worker"
        />

        <div className="w-full mt-5 px-4">
          {/* Address */}
          <div className="flex items-center gap-5 mb-4">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">I-10/Markaz, Islamabad</p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-4"></div>

          {/* Payment */}
          <div className="flex items-center gap-5 mb-4">
            <i className="text-lg ri-wallet-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">Rs. 800</h3>
              <p className="text-sm mt-1 text-gray-600">Cash on service completion</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setWorkerFound(true);
          setConfirmedWorkerPanel(false);
        }}
        className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmedWorker;
