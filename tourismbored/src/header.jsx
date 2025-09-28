import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      {/* Add onClick to the logo */}
      <div 
        onClick={() => navigate("/")}
        className="text-3xl font-extrabold cursor-pointer select-none hover:scale-105 transition-transform"
        title="Go to Home"
      >
        SGTourism
      </div>
      
      {/* Navigation Buttons */}
      <nav className="flex items-center gap-4">
        <div className="flex gap-2 mr-4">
          <button
            onClick={() => navigate("/attractions")}
            className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition shadow-md"
            title="Attractions"
          >
            🏞️ Attractions
          </button>
          <button
            onClick={() => navigate("/hotels")}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition shadow-md"
            title="Hotels"
          >
            🏨 Hotels
          </button>
          <button
            onClick={() => navigate("/concerts")}
            className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold hover:bg-purple-600 transition shadow-md"
            title="Concerts"
          >
            🎵 Concerts
          </button>
          <button
            onClick={() => navigate("/foodplaces")}
            className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition shadow-md"
            title="Food Places"
          >
            🍜 Foods
          </button>
        </div>
        
        <button
          onClick={() => navigate('/login')}
          className="px-5 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition"
        >
          Sign In
        </button>
      </nav>
    </header>
  );
}