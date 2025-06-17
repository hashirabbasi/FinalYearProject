const axios = require("axios");

module.exports.getAddressCordinator = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
                params: {
                    address,
                    key: apiKey,
                },
            }
        );

        if (
            response.data.status === "OK" &&
            response.data.results &&
            response.data.results.length > 0
        ) {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error("Unable to find coordinates for the given address.");
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.error_message ||
            error.message ||
            "Failed to fetch coordinates."
        );
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required.");
    }
      const apiKey = process.env.GOOGLE_MAPS_API;
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const element = response.data.rows[0].elements[0];
            if (element.status === "OK") {
                return {
                    distance: element.distance.text,
                    duration: element.duration.text,
                };
            } else {
                throw new Error(`Error fetching distance: ${element.status}`);
            }
        } else {
            throw new Error(`Error fetching distance matrix: ${response.data.status}`);
        }

    } catch (error) {
        throw new Error(
            error.response?.data?.error_message ||
            error.message ||
            "Failed to fetch distance and time."
        );
    }
}


module.exports.getCompleteSuggestions = async (query) => {
    if (!query) {
        throw new Error("Query is required.");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                place_id: prediction.place_id,
                  terms: prediction.terms .map(term => term.value),
            }));
        } else {
            throw new Error(`Error fetching suggestions: ${response.data.status}`);
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.error_message ||
            error.message ||
            "Failed to fetch suggestions."
        );
    }

}