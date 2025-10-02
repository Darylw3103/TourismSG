import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  return (
    <div className="relative z-10">   {/* 👈 keep map under chat */}
      <MapContainer
        center={[1.3644, 103.9915]}
        zoom={14}
        className="w-full h-[500px] rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[1.3644, 103.9915]}>
          <Popup>Changi Airport ✈️</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
