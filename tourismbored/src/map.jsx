import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapView() {
  return (
    <MapContainer center={[1.3644, 103.9915]} zoom={14} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[1.3644, 103.9915]}>
        <Popup>Changi Airport ✈️</Popup>
      </Marker>
    </MapContainer>
  )
}
