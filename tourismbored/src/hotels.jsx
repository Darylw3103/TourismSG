import { useState, useEffect } from "react";
import Header from "./header";
import HotelPic from "./assets/HotelPic.jpg";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedHotelDetails, setSelectedHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/hotels");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const hotelsData = await response.json();
        setHotels(hotelsData);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Update details when hotel selected
  useEffect(() => {
    if (selectedHotel) {
      const hotel = hotels.find((h) => h.hotel_name === selectedHotel);
      setSelectedHotelDetails(hotel);
    } else {
      setSelectedHotelDetails(null);
    }
  }, [selectedHotel, hotels]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading hotels from database...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-200">
      {/* Header */}
      <Header />

      {/* Spacer for header */}
      <div className="h-20"></div>

      <div className="flex">
        {/* Left side hotel image */}
        <div className="hidden lg:block w-1/3 fixed top-20 left-0 bottom-0">
          <img
            src={HotelPic}
            alt="Hotel"
            className="w-full h-full object-cover shadow-lg"
          />
        </div>

        {/* Right side hotel content */}
        <div className="ml-[33%] flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Singapore Hotels ({hotels.length} Results)
          </h1>

          <div className="mb-8 p-6 bg-blue-300 rounded-lg shadow-md border border-gray-200">
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Select a Hotel:
            </label>
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a hotel...</option>
              {hotels.map((hotel, index) => (
                <option key={index} value={hotel.hotel_name}>
                  {hotel.hotel_name}
                </option>
              ))}
            </select>

            {selectedHotelDetails && (
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Hotel Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-700">Hotel Name:</span>
                      <p className="text-gray-900 text-lg font-semibold">
                        {selectedHotelDetails.hotel_name}
                      </p>
                    </div>

                    {selectedHotelDetails.location && (
                      <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <p className="text-gray-900 flex items-center">
                          <span className="mr-2">📍</span>
                          {selectedHotelDetails.location}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {selectedHotelDetails.price_range && (
                      <div>
                        <span className="font-medium text-gray-700">Price Range:</span>
                        <p className="text-green-600 font-semibold text-lg">
                          {selectedHotelDetails.price_range}
                        </p>
                      </div>
                    )}

                    {selectedHotelDetails.contact_info && (
                      <div>
                        <span className="font-medium text-gray-700">Contact:</span>
                        <p className="text-gray-900">
                          {selectedHotelDetails.contact_info}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* All Hotels List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">All Hotels</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {hotel.hotel_name}
                  </h3>
                  {hotel.location && (
                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                      <span className="mr-1">📍</span>
                      {hotel.location}
                    </p>
                  )}
                  {hotel.price_range && (
                    <p className="text-green-600 font-semibold">
                      ${hotel.price_range}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setSelectedHotel(hotel.hotel_name);
                      setSelectedHotelDetails(hotel);
                    }}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
