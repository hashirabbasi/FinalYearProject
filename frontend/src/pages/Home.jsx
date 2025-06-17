import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSerachPannel from "../components/LocationSerachPannel";
import WorkerPanel from "../components/WorkerPanel";
import ConfirmedWorker from "../components/ConfirmedWorker";
import LookingForWorker from "../components/LookingForWorker";
import WaitingForWorker from "../components/WaitingForWorker";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [workerPannel, setWorkerPannel] = useState(false);
  const [confirmedWorkerPanel, setConfirmedWorkerPanel] = useState(false);
  const [workerFound, setWorkerFound] = useState(false);
  const [waitingForWorker, setWaitingForWorker] = useState(false);
  const [fare, setFare] = useState({});

  // New state for suggestions and active field
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(""); // "pickup" or "destination"

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const workerPannelRef = useRef(null);
  const logoRef = useRef(null);
  const confirmedWorkerRef = useRef(null);
  const workerFoundRef = useRef(null);
  const waitingForWorkerRef = useRef(null);

  // Fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { query },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuggestions(res.data.data || []);
    } catch (err) {
      setSuggestions([]);
    }
  };

  // Handler for input changes
  const handleInputChange = (field, value) => {
    if (field === "pickup") {
      setPickup(value);
      setActiveField("pickup");
    } else {
      setDestination(value);
      setActiveField("destination");
    }
    setPanelOpen(true);
    fetchSuggestions(value);
  };

  // Handler for suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
   
  };

  // Handler for form submission
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

    gsap.to(logoRef.current, {
      opacity: panelOpen ? 0 : 1,
      duration: 0.3,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(workerPannelRef.current, {
      y: workerPannel ? 0 : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [workerPannel]);

  useGSAP(() => {
    gsap.to(confirmedWorkerRef.current, {
      y: confirmedWorkerPanel ? 0 : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [confirmedWorkerPanel]);

  useGSAP(() => {
    gsap.to(workerFoundRef.current, {
      y: workerFound ? 0 : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [workerFound]);

  useGSAP(() => {
    gsap.to(waitingForWorkerRef.current, {
      y: waitingForWorker ? 0 : "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [waitingForWorker]);

  const services = [
    {
      title: "Electrician",
      icon: "/Electrician.png",
      time: "2 mins away",
      price: "Rs500",
      description: "Affordable, compact service",
    },
    {
      title: "Plumber",
      icon: "/Plumber.png",
      time: "3 mins away",
      price: "Rs500",
      description: "Expert plumbing at your door",
    },
    {
      title: "Carpenter",
      icon: "/Carpenter.png",
      time: "4 mins away",
      price: "Rs500",
      description: "Quality furniture repair & build",
    },
  ];

  async function findWorker() {
    setWorkerPannel(true);
    setPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-Fare`,
        {
          params: {
            serviceType: "plumber", // or dynamically selected type
            hoursWorked: 1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(response.data.data); // <-- set the fare here
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  }

  async function createRide(serviceType) {

      const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/rides/create`,
          {
            pickupLocation: pickup,
            serviceType,
            
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        
        console.log(respose.data)

    }

    


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        ref={logoRef}
        className="w-16 absolute left-5 top-5 z-20 transition-opacity duration-300"
        src="/image.png"
        alt="Logo"
      />

      <div className="h-screen w-screen absolute top-0 left-0 z-0">
        {/* Background Image temporary */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

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

          <form onSubmit={(e) => e.preventDefault()}>
            <input
              onFocus={() => setActiveField("pickup")}
              value={pickup}
              onChange={(e) => handleInputChange("pickup", e.target.value)}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
              autoComplete="off"
            />
          </form>

          <button
            onClick={findWorker}
            className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full"
          >
            Find Worker
          </button>
        </div>

        <div
          ref={panelRef}
          className="overflow-hidden w-full bg-white text-black pl-5"
          style={{ height: panelOpen ? "auto" : 0 }}
        >
          <LocationSerachPannel
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            setPanelOpen={setPanelOpen}
            setWorkerPannel={setWorkerPannel}
          />
        </div>
      </div>

      <div
        ref={workerPannelRef}
        className="fixed bottom-0 translate-y-full w-full z-20 p-3 pb-6 pt-12 bg-white"
      >
        <WorkerPanel
           createRide={createRide }
          services={services}
          fare = {fare}
          setWorkerPannel={setWorkerPannel}
          setConfirmedWorkerPanel={setConfirmedWorkerPanel}
        />
      </div>

      <div
        ref={confirmedWorkerRef}
        className="fixed bottom-0 translate-y-full w-full z-20 p-3 pb-6 py-8 pt-12 bg-white"
      >
        <ConfirmedWorker
          setConfirmedWorkerPanel={setConfirmedWorkerPanel}
          setWorkerFound={setWorkerFound}
        />
      </div>

      <div
        ref={workerFoundRef}
        className="fixed bottom-0 translate-y-full w-full z-20 p-3 pb-6 py-8 pt-12 bg-white"
      >
        <LookingForWorker setWorkerFound={setWorkerFound} />
      </div>

      <div
        ref={waitingForWorkerRef}
        className="fixed bottom-0 w-full z-20 p-3 pb-6 py-8 pt-12 bg-white"
      >
        <WaitingForWorker waitingForWorker={waitingForWorker} />
      </div>
    </div>
  );
};

export default Home;
