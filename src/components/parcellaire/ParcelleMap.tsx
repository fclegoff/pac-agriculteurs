"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import { useEffect } from "react";
import type { Parcelle } from "@/lib/data/pac-data";

function getCultureEmoji(code: string) {
  const emojis: Record<string, string> = {
    BT: "🌾",
    BD: "🌾",
    OH: "🌾",
    OP: "🌾",
    MA: "🌽",
    MF: "🌽",
    CO: "🌻",
    TS: "🌻",
    PT: "🌿",
    PP: "🌿",
    JA: "🌱",
    SO: "🫘",
    PO: "🫛",
    FE: "🫘",
    BE: "🟣",
    LU: "☘️",
    VI: "🍇",
    VE: "🍎",
    LG: "🥬",
    PD: "🥔",
  };
  return emojis[code] || "🌾";
}

function createParcelleIcon(parcelle: Parcelle, isSelected: boolean) {
  return divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${isSelected ? "#16a34a" : "white"};
      color: ${isSelected ? "white" : "#1a2e1a"};
      border: 2px solid ${isSelected ? "#15803d" : "#d4e4d4"};
      border-radius: 12px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 4px;
    ">
      <span>${getCultureEmoji(parcelle.cultureCode)}</span>
      <span>${parcelle.surface}ha</span>
    </div>`,
    iconSize: [80, 32],
    iconAnchor: [40, 16],
  });
}

function MapUpdater({
  selectedId,
  parcelles,
}: {
  selectedId: string | null;
  parcelles: Parcelle[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const p = parcelles.find((par) => par.id === selectedId);
      if (p) {
        map.setView(p.coordinates, 14, { animate: true });
      }
    }
  }, [selectedId, parcelles, map]);

  return null;
}

interface ParcelleMapProps {
  parcelles: Parcelle[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function ParcelleMap({
  parcelles,
  selectedId,
  onSelect,
}: ParcelleMapProps) {
  // Center on average of all coordinates
  const center: [number, number] =
    parcelles.length > 0
      ? [
          parcelles.reduce((s, p) => s + p.coordinates[0], 0) /
            parcelles.length,
          parcelles.reduce((s, p) => s + p.coordinates[1], 0) /
            parcelles.length,
        ]
      : [46.603354, 1.888334];

  return (
    <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-[var(--color-border)]">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater selectedId={selectedId} parcelles={parcelles} />
        {parcelles.map((p) => (
          <Marker
            key={p.id}
            position={p.coordinates}
            icon={createParcelleIcon(p, p.id === selectedId)}
            eventHandlers={{
              click: () => onSelect(p.id === selectedId ? null : p.id),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{p.nom}</p>
                <p>
                  {p.culture} — {p.surface} ha
                </p>
                <p className="text-gray-500">
                  Îlot {p.ilot} — {p.commune}
                </p>
                {p.bio && (
                  <p className="text-green-600 font-medium mt-1">
                    Agriculture biologique
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
