import React from "react";

const WorkerPanel = ({
  services,
  setWorkerPannel,
  setConfirmedWorkerPanel,
  createRide,
  selectedService,
  selectedHours,
  destination
}) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setWorkerPannel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">Choose a Service</h3>

      <div className="space-y-4">
        {services.map((service, idx) => (
          <div
            key={idx}
            onClick={() => {
              createRide(
                selectedService || service.serviceType,
                selectedHours,
                destination
              );
              setConfirmedWorkerPanel(true);
              setWorkerPannel(false);
            }}
            className="flex border active:border-black bg-grey rounded-xl w-full p-3 shadow-md items-center justify-between cursor-pointer"
          >
            <img className="h-12" src={service.icon} alt={service.title} />
            <div className="w-1/2 pl-3 ml-3">
              <h4 className="font-medium text-base">
                {service.title} <i className="ri-user-3-line ml-1">1</i>
              </h4>
              <h5 className="font-medium text-sm">{service.time}</h5>
              <p className="font-normal text-xs text-gray-600">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerPanel;
