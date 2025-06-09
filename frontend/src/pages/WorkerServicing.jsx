import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import FinishWork from './FinishWork';
import 'remixicon/fonts/remixicon.css';

gsap.registerPlugin(useGSAP);

const WorkerServicing = () => {
  const [FinishWorkPanel, setFinishWorkPanel] = useState(false);
  const finishWorkPanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(finishWorkPanelRef.current, {
      y: FinishWorkPanel ? 0 : '100%',
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [FinishWorkPanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logout Button */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-end z-20">
        <Link
          to="/Worker-Home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Image Section */}
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

      {/* Bottom Info Section */}
      <div className="h-1/5 bg-yellow-400 px-6 py-4 flex items-center justify-between relative">
        {/* Slide Panel Toggle */}
        <div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => setFinishWorkPanel(true)}
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </div>

        <h4 className="text-xl font-semibold">4 KM away</h4>

        <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg">
          Complete Ride
        </button>
      </div>

      {/* Slide-up Panel */}
      <div
        ref={finishWorkPanelRef}
        className="fixed bottom-0 left-0 w-full h-screen z-30 bg-white translate-y-full px-4 py-10 pt-16"
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setFinishWorkPanel(false)}>
          <i className="text-2xl text-gray-600 ri-close-line"></i>
        </div>

        <FinishWork setFinishWorkPanel={setFinishWorkPanel} />
      </div>
    </div>
  );
};

export default WorkerServicing;
