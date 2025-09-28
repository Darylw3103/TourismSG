import { useState, useEffect } from "react";
import Header from "./header";

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState("");
  const [selectedConcertDetails, setSelectedConcertDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch concerts from API
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:5000/api/concerts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const concertsData = await response.json();
        setConcerts(concertsData);
        
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  // Fetch details when a concert is selected
  useEffect(() => {
    if (selectedConcert) {
      const concert = concerts.find(c => c.name === selectedConcert);
      setSelectedConcertDetails(concert);
    } else {
      setSelectedConcertDetails(null);
    }
  }, [selectedConcert, concerts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading concerts from database...</div>
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
          Singapore Concerts ({concerts.length} Results)
        </h1>
        
        <div className="mb-8 p-6 bg-purple-300 rounded-lg shadow-md border border-gray-200">
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Select a Concert:
          </label>
          <select
            value={selectedConcert}
            onChange={(e) => setSelectedConcert(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a concert...</option>
            {concerts.map((concert, index) => (
              <option key={index} value={concert.name}>
                {concert.name}
              </option>
            ))}
          </select>
          
          {selectedConcertDetails && (
            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Concert Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Concert Name:</span>
                    <p className="text-gray-900 text-lg font-semibold">{selectedConcertDetails.name}</p>
                  </div>
                  
                  {selectedConcertDetails.venue && (
                    <div>
                      <span className="font-medium text-gray-700">Venue:</span>
                      <p className="text-gray-900 flex items-center">
                        <span className="mr-2">🏟️</span>
                        {selectedConcertDetails.venue}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {selectedConcertDetails.date && (
                    <div>
                      <span className="font-medium text-gray-700">Date & Time:</span>
                      <p className="text-green-600 font-semibold text-lg">
                        <span className="mr-2">📅</span>
                        {selectedConcertDetails.date}
                      </p>
                    </div>
                  )}
                  
                  {selectedConcertDetails.artist && (
                    <div>
                      <span className="font-medium text-gray-700">Artist/Performer:</span>
                      <p className="text-gray-900">🎤 {selectedConcertDetails.artist}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedConcertDetails.description && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <span className="font-medium text-gray-700">Description:</span>
                  <p className="text-gray-900 mt-2">{selectedConcertDetails.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* All Concerts List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">All Concerts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {concerts.map((concert, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{concert.name}</h3>
                {concert.artist && (
                  <p className="text-gray-600 text-sm mb-2">🎤 {concert.artist}</p>
                )}
                {concert.venue && (
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <span className="mr-1">🏟️</span>
                    {concert.venue}
                  </p>
                )}
                {concert.date && (
                  <p className="text-green-600 font-semibold text-sm">📅 {concert.date}</p>
                )}
                <button 
                  onClick={() => {
                    setSelectedConcert(concert.name);
                    setSelectedConcertDetails(concert);
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