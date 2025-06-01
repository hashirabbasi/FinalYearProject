import React from 'react';

const locations = [
  "24B, Near Kapoor's Cafe, Sheriyans Coding School, Islamabad",
  "92A, Opposite Civic Center, G-11 Markaz, Islamabad",
  "Street 10, F-8/3, Near Blue Area, Islamabad",
  "House #5, Main Boulevard, Bahria Town, Islamabad"
];

const LocationSerachPannel = () => {
  return (
    <div className="px-2">
      {locations.map((location, index) => (
        <div
          key={index}
          className="flex gap-4 border-2 p-3 border-grey hover:border-black rounded-md items-center my-4 transition-all duration-200"
        >
          <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSerachPannel;
