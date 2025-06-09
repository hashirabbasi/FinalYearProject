import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmWorkPopUp = (props) => {
  const [Otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // You can handle OTP validation here if needed
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => props.setConfirmWorkPopUpPanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-3 text-center">
        Confirm This Work
      </h3>

      <div className="flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="User avatar"
          />
          <h2 className="text-lg font-medium">Ahmed Khan</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5 px-4">
          <div className="flex items-center gap-5 mb-4">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">
                I-10/Markaz, Islamabad
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-4"></div>

          <div className="flex items-center gap-5 mb-4">
            <i className="text-lg ri-wallet-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">Rs. 800</h3>
              <p className="text-sm mt-1 text-gray-600">
                Cash on service completion
              </p>
            </div>
          </div>
        </div>

        {/* OTP Form */}
        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              value={Otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="w-full border-2 bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg"
            />

            <Link
              to="/Worker-Servicing"
              onClick={() => {
                props.setWorkPopUpPanel(false);
                props.setConfirmWorkPopUpPanel(false);
              }}
              className="w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg"
            >
              Confirm
            </Link>

            <button
              type="button"
              onClick={() => {
                props.setConfirmWorkPopUpPanel(false);
                props.setWorkPopUpPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-white font-semibold p-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWorkPopUp;
