import { useState } from "react";
import Header from "./header";

export default function Foods() {
  const [selectedFoodPlace, setSelectedFoodPlace] = useState("");

  const foodPlaces = ["Foodgle"];

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Food Places in Singapore
        </h1>

        <div className="mb-8 p-6 bg-green-200 rounded-lg shadow-md border border-gray-200">
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Select a Food Place:
          </label>
          <select
            value={selectedFoodPlace}
            onChange={(e) => setSelectedFoodPlace(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a food place...</option>
            {foodPlaces.map((place, index) => (
              <option key={index} value={place}>
                {place}
              </option>
            ))}
          </select>

          {selectedFoodPlace && (
            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Selected Food Place
              </h3>
              <p className="text-gray-900 text-lg font-medium">{selectedFoodPlace}</p>
              <p className="text-gray-700 mt-2">
                RAT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}