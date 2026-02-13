import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Worker } from "@/lib/mock-data";
import TrustBadge from "./TrustBadge";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function createWorkerIcon(score: number) {
  const color = score >= 75 ? "#7c3aed" : score >= 50 ? "#22c55e" : "#f59e0b";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 32px; height: 32px; border-radius: 50%;
      background: ${color}; border: 3px solid rgba(255,255,255,0.3);
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 11px; font-weight: 700;
      box-shadow: 0 4px 14px ${color}66;
    ">${score}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface WorkerMapProps {
  workers: Worker[];
}

export default function WorkerMap({ workers }: WorkerMapProps) {
  const center: [number, number] = [13.0827, 80.2707];

  return (
    <div className="glass-card overflow-hidden" style={{ height: 400 }}>
      <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {workers.filter(w => w.visible && w.status === "Active").map((worker) => (
          <Marker
            key={worker.id}
            position={[worker.lat, worker.lng]}
            icon={createWorkerIcon(worker.trust_score)}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <strong style={{ fontSize: 13 }}>{worker.name}</strong>
                <br />
                <span style={{ fontSize: 11, opacity: 0.7 }}>Score: {worker.trust_score}/100</span>
                <br />
                <span style={{ fontSize: 11, opacity: 0.7 }}>{worker.skills.join(", ")}</span>
                <br />
                <span style={{ fontSize: 11, opacity: 0.7 }}>₹{worker.hourly_rate}/hr</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
