import React from 'react';

const LocationSerachPannel = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="px-2">
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((s, idx) => (
          <div
            key={idx}
            onClick={() => onSuggestionClick(s.description)}
            className="flex gap-4 border-2 p-3 border-grey hover:border-black rounded-md items-center my-4 transition-all duration-200 cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{s.description}</h4>
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-sm p-4">No suggestions</div>
      )}
    </div>
  );
};

export default LocationSerachPannel;
