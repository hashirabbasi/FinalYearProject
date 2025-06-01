import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSerachPannel from "../components/LocationSerachPannel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 0.3,
    });
  }, [panelOpen]);

  const services = [
    {
      title: "Electrician",
      icon: "/Electrician.png",
      time: "2 mins away",
      price: "Rs800",
      description: "Affordable, compact service",
    },
    {
      title: "Plumber",
      icon: "/Plumber.png",
      time: "3 mins away",
      price: "Rs700",
      description: "Expert plumbing at your door",
    },
    {
      title: "Carpenter",
      icon: "/Carpenter.png",
      time: "4 mins away",
      price: "Rs900",
      description: "Quality furniture repair & build",
    },
    {
      title: "Cleaner",
      icon: "/Cleaner.png",
      time: "1 min away",
      price: "Rs600",
      description: "Sparkling clean service",
    },
    {
      title: "Painter",
      icon: "/Painter.png",
      time: "5 mins away",
      price: "Rs850",
      description: "Vibrant finish guaranteed",
    },
  ];

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5 z-20" src="/image.png" alt="Logo" />

      {/* Background */}
      
      <div className="h-screen w-screen absolute top-0 left-0 z-0">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-end items-center h-screen absolute top-0 w-full z-10">
        <div className="h-[30%] p-5 bg-white relative w-full">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-3 text-3xl cursor-pointer transition-opacity duration-300"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-3xl font-semibold">Find a Worker</h4>

          <form onSubmit={submitHandler}>
            <div className="absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full" />

            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
            />

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eeeeee] px-11 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Sliding Panel */}
        <div
          ref={panelRef}
          className="overflow-hidden w-full bg-white text-black pl-5"
          style={{ height: 0 }}
        >
          <LocationSerachPannel />
        </div>
      </div>

      {/* Bottom Service Panel */}
      <div className="fixed bottom-0 translate-y-full w-full  z-20 p-3 pb-6 bg-white">
        <h3 className="text-2xl font-semibold mb-3">Choose a Service</h3>

        <div className="space-y-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex border active:border-black bg-grey rounded-xl w-full p-3 shadow-md items-center justify-between"
            >
              <img className="h-12" src={service.icon} alt={service.title} />
              <div className="w-1/2 pl-3 ml-3">
                <h4 className="font-medium text-base">
                  {service.title} <i className="ri-user-3-line ml-1">1</i>
                </h4>
                <h5 className="font-medium text-sm">{service.time}</h5>
                <p className="font-normal text-xs text-gray-600">{service.description}</p>
              </div>
              <h2 className="text-xl font-semibold">{service.price}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
