import { useState, useEffect } from "react";
import Header from './header';

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState("");
  const [selectedAttractionDetails, setSelectedAttractionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch from real API
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:5000/api/attractions');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const attractionsData = await response.json();
        setAttractions(attractionsData);
        
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  // Fetch details when an attraction is selected
  useEffect(() => {
    if (selectedAttraction) {
      const attraction = attractions.find(attr => attr.name === selectedAttraction);
      setSelectedAttractionDetails(attraction);
    } else {
      setSelectedAttractionDetails(null);
    }
  }, [selectedAttraction, attractions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading attractions from database...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-200">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Singapore Attractions ({attractions.length} Results)
        </h1>
        
        <div className="mb-8 p-6 bg-green-300 rounded-lg shadow-md border border-gray-200">
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Select an Attraction:
          </label>
          <select
            value={selectedAttraction}
            onChange={(e) => setSelectedAttraction(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose an attraction...</option>
            {attractions.map((attraction, index) => (
              <option key={index} value={attraction.name}>
                {attraction.name}
              </option>
            ))}
          </select>
          
          {selectedAttractionDetails && (
            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Attraction Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <p className="text-gray-900">{selectedAttractionDetails.name}</p>
                  </div>
                  
                  {selectedAttractionDetails.location && (
                    <div>
                      <span className="font-medium text-gray-700">Location:</span>
                      <p className="text-gray-900">{selectedAttractionDetails.location}</p>
                    </div>
                  )}
                  
                  {selectedAttractionDetails.category && (
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <p className="text-gray-900">{selectedAttractionDetails.category}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {selectedAttractionDetails.ticket_price && (
                    <div>
                      <span className="font-medium text-gray-700">Ticket Price:</span>
                      <p className="text-green-600 font-semibold">
                        ${selectedAttractionDetails.ticket_price}
                      </p>
                    </div>
                  )}
                  
                  {selectedAttractionDetails.opening_hours && (
                    <div>
                      <span className="font-medium text-gray-700">Opening Hours:</span>
                      <p className="text-gray-900">{selectedAttractionDetails.opening_hours}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedAttractionDetails.description && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <span className="font-medium text-gray-700">Description:</span>
                  <p className="text-gray-900 mt-2">{selectedAttractionDetails.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* All Attractions List - ADDED THIS SECTION */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">All Attractions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{attraction.name}</h3>
                {attraction.category && (
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {attraction.category}
                    </span>
                  </p>
                )}
                {attraction.location && (
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <span className="mr-1">📍</span>
                    {attraction.location}
                  </p>
                )}
                {attraction.ticket_price && (
                  <p className="text-green-600 font-semibold">${attraction.ticket_price}</p>
                )}
                <button 
                  onClick={() => {
                    setSelectedAttraction(attraction.name);
                    setSelectedAttractionDetails(attraction);
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
  );
}