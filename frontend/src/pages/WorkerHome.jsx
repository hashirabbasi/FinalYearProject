import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import WorkerDeatails from "../components/WorkerDeatails";
import WorkPopUp from "../components/WorkPopUp";
import ConfirmWorkPopUp from "../components/ConfirmWorkPopUp";

const WorkerHome = () => {
  const [WorkPopUpPanel, setWorkPopUpPanel] = useState(true);
  const [ConfirmWorkPopUpPanel, setConfirmWorkPopUpPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      y: WorkPopUpPanel ? 0 : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [WorkPopUpPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      y: ConfirmWorkPopUpPanel ? 0 : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [ConfirmWorkPopUpPanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <Link
          to="/Home"
          className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

      <div className="h-2/5 p-6">
        <WorkerDeatails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <WorkPopUp
          setWorkPopUpPanel={setWorkPopUpPanel}
          setConfirmWorkPopUpPanel={setConfirmWorkPopUpPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full h-screen bg-white px-3 py-10 pt-12"
      >
        <ConfirmWorkPopUp
          setConfirmWorkPopUpPanel={setConfirmWorkPopUpPanel}
          setWorkPopUpPanel={setWorkPopUpPanel}
        />
      </div>
    </div>
  );
};

export default WorkerHome;
