"use client"
import { useNavigate } from "react-router-dom"
import changijewel from "./assets/changijewel.jpg"
import gardensbythebay from "./assets/gardensbythebay.jpg"
import verynicemerlion from "./assets/verynicemerlion.jpg"
import MapView from "./map"
<<<<<<< Updated upstream
=======
import ChatWidget from "./chatwidget"
import Header from "./header" // Import your Header component
>>>>>>> Stashed changes

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-indigo-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-blue-600 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="text-3xl font-extrabold text-gray-200 cursor-pointer select-none">
          SGTourism
        </div>
        <nav>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-3 border-2 border-gray-300 text-gray-200 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition"
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero / Preview Section */}
      <main className="flex-grow px-8 sm:px-16 lg:px-24 py-16 space-y-28 max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-16 leading-tight">
          Explore Singapore to your liking
        </h2>

        <ImageTextBlock
          image={gardensbythebay}
          text="From breathtaking skylines to hidden cultural gems, Singapore has something for everyone."
          reverse={false}
        />

        <ImageTextBlock
          image={verynicemerlion}
          text="Discover hotels, attractions, concerts, itineraries, and food — all in one platform."
          reverse={true}
        />

        <div className="text-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-blue-600 text-white rounded-xl text-xl font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Sign Up or Explore
          </button>
        </div>

        <ImageTextBlock
          image={changijewel}
          text="Your journey starts here. Whether you're a tourist or a planner, we've got you covered."
          reverse={false}
        />
      </main>

      {/* Map View Section */}
      <div className="w-full bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <MapView />
          <ChatWidget />
        </div>
      </div>
    </div>
  )
}

function ImageTextBlock({ image, text, reverse }) {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${reverse ? "md:flex-row-reverse" : ""}`}>
      <img
        src={image}
        alt="Singapore preview"
        className="w-full md:w-1/2 h-80 md:h-96 object-cover rounded-xl shadow-lg"
      />
      <p className="text-xl text-gray-700 md:w-1/2 leading-relaxed max-w-xl px-4 md:px-0 font-medium">
        {text}
      </p>
    </div>
  )
}
