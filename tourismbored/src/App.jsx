import { useState } from "react";

export default function App() {
    const [activeTab, setActiveTab] = useState("users");

    const tabs = ["users", "hotels", "attractions", "concerts", "itineraries", "food"];

    const sampleData = {
        users: [{ user_id: 1, email: "alice@example.com", name: "Alice", created_at: "2025-01-01" }],
        hotels: [{ hotel_id: 1, hotel_name: "Grand Marina", location: "Singapore", price_range: "$$$" }],
        attractions: [{ attraction_id: 1, name: "Gardens by the Bay", category: "Nature", ticket_price: 20 }],
        concerts: [{ concert_id: 1, name: "Coldplay Live", venue: "National Stadium", date: "2025-10-15" }],
        itineraries: [{ itinerary_id: 1, user_id: 1, day_count: 3, json_plan: "{day1: 'Marina Bay Sands'}" }],
        food: [{ food_id: 1, restaurant_name: "Lau Pa Sat", cuisine_type: "Hawker", rating: 4.5 }],
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw", // <-- full viewport width
                backgroundColor: "#f3f4f6",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "2rem",
                    color: "#1f2937",
                }}
            >
                Travel & Events Explorer
            </h1>

            {/* Tabs */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "2rem",
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "0.5rem 1rem",
                            border: "1px solid gray",
                            borderRadius: "8px",
                            background: activeTab === tab ? "#2563eb" : "white",
                            color: activeTab === tab ? "white" : "#111",
                            cursor: "pointer",
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // more responsive
                    gap: "1rem",
                    width: "100%",
                    maxWidth: "1200px", // keeps content centered on large screens
                }}
            >
                {sampleData[activeTab].map((item) => (
                    <div
                        key={Object.values(item)[0]}
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            padding: "1rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            color: "#111",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                        }}
                    >
                        {Object.entries(item).map(([key, value]) => (
                            <p key={key} style={{ margin: "0.25rem 0", lineHeight: "1.5" }}>
                                <strong>{key}:</strong> {value.toString()}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
