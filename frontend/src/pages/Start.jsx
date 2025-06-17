import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/31161653/pexels-photo-31161653/free-photo-of-green-screwdriver-on-metallic-surface-close-up.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        {/* Logo */}
        <div className="flex justify-start pt-10 pl-10">
          <img className="w-24 h-24 rounded-full shadow-lg bg-white p-2" src="/image.png" alt="Sahulat Logo" />
        </div>

        {/* Card */}
        <div className="flex justify-center pb-12">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md text-center">
            <h2 className="text-3xl font-bold text-[#153a54] mb-4 tracking-tight">Get Started with Sahulat</h2>
            <p className="text-gray-600 mb-8">
              Your one-stop solution for hiring trusted service professionals.
            </p>
            <Link
              to="/UserLogin"
              className="block w-full bg-[#153a54] hover:bg-[#0e2233] text-white font-semibold py-3 rounded-lg text-lg transition"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;