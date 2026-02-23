"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  List,
  Grid3X3,
  Leaf,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { DEMO_PARCELLES, CULTURES } from "@/lib/data/pac-data";

// Dynamic import for Leaflet (no SSR)
const ParcelleMap = dynamic(() => import("@/components/parcellaire/ParcelleMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] md:h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
      <p className="text-[var(--color-text-muted)]">Chargement de la carte...</p>
    </div>
  ),
});

function getCultureColor(code: string) {
  const colors: Record<string, string> = {
    BT: "bg-amber-400",
    BD: "bg-amber-500",
    OH: "bg-yellow-400",
    OP: "bg-yellow-300",
    MA: "bg-orange-400",
    MF: "bg-orange-300",
    CO: "bg-lime-500",
    TS: "bg-yellow-500",
    PT: "bg-green-400",
    PP: "bg-green-600",
    JA: "bg-gray-400",
    SO: "bg-emerald-500",
    PO: "bg-teal-500",
    FE: "bg-teal-400",
    BE: "bg-pink-400",
    LU: "bg-green-500",
    VI: "bg-purple-500",
    VE: "bg-red-400",
    LG: "bg-emerald-400",
    PD: "bg-amber-300",
  };
  return colors[code] || "bg-gray-400";
}

export default function ParcellairePage() {
  const [view, setView] = useState<"map" | "list">("map");
  const [search, setSearch] = useState("");
  const [selectedParcelle, setSelectedParcelle] = useState<string | null>(null);

  const parcelles = DEMO_PARCELLES.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.culture.toLowerCase().includes(search.toLowerCase()) ||
      p.commune.toLowerCase().includes(search.toLowerCase())
  );

  const totalSurface = DEMO_PARCELLES.reduce((s, p) => s + p.surface, 0);
  const surfaceBio = DEMO_PARCELLES.filter((p) => p.bio).reduce(
    (s, p) => s + p.surface,
    0
  );

  // Group by culture
  const byCulture = DEMO_PARCELLES.reduce(
    (acc, p) => {
      if (!acc[p.cultureCode])
        acc[p.cultureCode] = { label: p.culture, surface: 0, count: 0 };
      acc[p.cultureCode].surface += p.surface;
      acc[p.cultureCode].count += 1;
      return acc;
    },
    {} as Record<string, { label: string; surface: number; count: number }>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <MapPin className="w-8 h-8 text-[var(--color-primary)]" />
          Mon parcellaire
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Visualisez et gérez vos parcelles et îlots
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-3 text-center">
          <p className="text-xl font-bold text-[var(--color-primary)]">
            {totalSurface.toFixed(1)} ha
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">SAU totale</p>
        </div>
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-3 text-center">
          <p className="text-xl font-bold">{DEMO_PARCELLES.length}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Parcelles</p>
        </div>
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-3 text-center">
          <p className="text-xl font-bold text-green-600">
            {surfaceBio.toFixed(1)} ha
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            En bio
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une parcelle..."
            className="w-full pl-9 pr-3 py-2 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
          />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setView("map")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "map"
                ? "bg-white text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            <MapPin className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-white text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Map or list */}
        <div className="md:col-span-2">
          {view === "map" ? (
            <ParcelleMap
              parcelles={parcelles}
              selectedId={selectedParcelle}
              onSelect={setSelectedParcelle}
            />
          ) : (
            <div className="space-y-2">
              {parcelles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedParcelle(p.id)}
                  className={`w-full text-left bg-white rounded-xl border p-4 hover:border-[var(--color-primary)] transition-colors ${
                    selectedParcelle === p.id
                      ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getCultureColor(p.cultureCode)}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{p.nom}</p>
                        <p className="font-bold">{p.surface} ha</p>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {p.culture}
                        </p>
                        {p.bio && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Leaf className="w-3 h-3" />
                            Bio
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        Îlot {p.ilot} — {p.commune}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - répartition */}
        <div>
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-[var(--color-primary)]" />
              Répartition des cultures
            </h3>
            <div className="space-y-2">
              {Object.entries(byCulture)
                .sort((a, b) => b[1].surface - a[1].surface)
                .map(([code, data]) => (
                  <div key={code} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${getCultureColor(code)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate">{data.label}</span>
                        <span className="font-medium ml-2">
                          {data.surface.toFixed(1)} ha
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${getCultureColor(code)}`}
                          style={{
                            width: `${(data.surface / totalSurface) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Détail parcelle sélectionnée */}
            {selectedParcelle && (() => {
              const p = DEMO_PARCELLES.find(
                (par) => par.id === selectedParcelle
              );
              if (!p) return null;
              return (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <h4 className="font-semibold text-sm mb-2">{p.nom}</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">
                        Surface
                      </span>
                      <span className="font-medium">{p.surface} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">
                        Culture
                      </span>
                      <span className="font-medium">{p.culture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">
                        Îlot
                      </span>
                      <span className="font-medium">{p.ilot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">
                        Commune
                      </span>
                      <span className="font-medium">{p.commune}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">
                        Bio
                      </span>
                      <span className="font-medium">
                        {p.bio ? "Oui" : "Non"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
