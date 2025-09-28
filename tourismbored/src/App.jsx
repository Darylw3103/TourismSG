import { useState, useEffect } from "react";
import Attractions from "./attractions"; 
import Hotels from "./hotels";
import Concerts from "./concerts";
//import Foodplaces from "./foodplaces";

export default function App() {
  const [activeTab, setActiveTab] = useState("attractions");
  const [data, setData] = useState([]);

  const tabs = ["attractions", "hotels", "concerts", "foodplaces"];

  // Load sample data whenever the tab changes
  useEffect(() => {
    const sampleData = {
      attractions: [
        { id: 1, name: "Gardens by the Bay", category: "Nature" },
        { id: 2, name: "Sentosa", category: "Entertainment" },
      ],
      hotels: [
        { id: 1, name: "Grand Marina", location: "Singapore" },
        { id: 2, name: "Marina Bay Sands", location: "Singapore" },
      ],
      concerts: [
        { id: 1, name: "Coldplay Live", venue: "National Stadium" },
        { id: 2, name: "Imagine Dragons", venue: "Indoor Stadium" },
      ],
      foodplaces: [
        { id: 1, name: "Lau Pa Sat", cuisine: "Hawker" },
        { id: 2, name: "Marina Bay Sands Buffet", cuisine: "International" },
      ],
    };

    setData(sampleData[activeTab]);
  }, [activeTab]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>SG Tourism Explorer</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid gray",
              background: activeTab === tab ? "#2563eb" : "white",
              color: activeTab === tab ? "white" : "#111",
              cursor: "pointer",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "attractions" && <Attractions data={data} />}
      {activeTab === "hotels" && <Hotels data={data} />}
      {activeTab === "concerts" && <Concerts data={data} />}
      {activeTab === "foodplaces" && <Foodplaces data={data} />}
    </div>
  );
}
