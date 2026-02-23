"use client";

import { useState } from "react";
import {
  Calendar,
  AlertTriangle,
  Bell,
  ChevronLeft,
  ChevronRight,
  FileText,
  Euro,
  Shield,
  Clock,
} from "lucide-react";
import { PAC_DEADLINES } from "@/lib/data/pac-data";

const CATEGORIES = [
  { id: "all", label: "Toutes", color: "bg-gray-100 text-gray-700" },
  {
    id: "declaration",
    label: "Déclarations",
    color: "bg-red-100 text-red-700",
  },
  { id: "aide", label: "Aides", color: "bg-blue-100 text-blue-700" },
  { id: "controle", label: "Contrôles", color: "bg-amber-100 text-amber-700" },
  {
    id: "paiement",
    label: "Paiements",
    color: "bg-green-100 text-green-700",
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  declaration: FileText,
  aide: Euro,
  controle: Shield,
  paiement: Euro,
};

function getCategoryStyle(cat: string) {
  switch (cat) {
    case "declaration":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        badge: "bg-red-100",
        dot: "bg-red-500",
      };
    case "aide":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        badge: "bg-blue-100",
        dot: "bg-blue-500",
      };
    case "controle":
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        badge: "bg-amber-100",
        dot: "bg-amber-500",
      };
    case "paiement":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        badge: "bg-green-100",
        dot: "bg-green-500",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        badge: "bg-gray-100",
        dot: "bg-gray-500",
      };
  }
}

function getDaysUntil(dateStr: string) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
}

const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default function CalendrierPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  const filtered =
    selectedCategory === "all"
      ? PAC_DEADLINES
      : PAC_DEADLINES.filter((d) => d.category === selectedCategory);

  const sortedDeadlines = [...filtered].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Timeline grouped by month
  const byMonth = sortedDeadlines.reduce(
    (acc, d) => {
      const month = new Date(d.date).getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(d);
      return acc;
    },
    {} as Record<number, typeof sortedDeadlines>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Calendar className="w-8 h-8 text-[var(--color-primary)]" />
          Calendrier PAC 2026
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Toutes les dates importantes pour votre campagne PAC
        </p>
      </div>

      {/* Prochaine échéance urgente */}
      {(() => {
        const upcoming = sortedDeadlines.find(
          (d) => getDaysUntil(d.date) > 0 && getDaysUntil(d.date) <= 90
        );
        if (!upcoming) return null;
        const days = getDaysUntil(upcoming.date);
        return (
          <div
            className={`mb-6 rounded-xl p-4 flex items-start gap-3 ${days <= 30 ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200"}`}
          >
            <AlertTriangle
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${days <= 30 ? "text-red-600" : "text-amber-600"}`}
            />
            <div>
              <p
                className={`font-semibold ${days <= 30 ? "text-red-800" : "text-amber-800"}`}
              >
                {upcoming.title} — dans {days} jours
              </p>
              <p
                className={`text-sm mt-0.5 ${days <= 30 ? "text-red-700" : "text-amber-700"}`}
              >
                {upcoming.description}
              </p>
              <p
                className={`text-xs mt-1 font-medium ${days <= 30 ? "text-red-600" : "text-amber-600"}`}
              >
                {new Date(upcoming.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? cat.id === "all"
                  ? "bg-[var(--color-primary)] text-white"
                  : cat.color + " ring-2 ring-offset-1 ring-current"
                : "bg-gray-100 text-[var(--color-text-muted)] hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(byMonth)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([month, deadlines]) => (
            <div key={month}>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                {MONTHS_FR[Number(month)]} 2026
              </h2>
              <div className="space-y-3 ml-4 border-l-2 border-gray-200 pl-6">
                {deadlines.map((d) => {
                  const style = getCategoryStyle(d.category);
                  const days = getDaysUntil(d.date);
                  const isPast = days < 0;
                  const Icon = categoryIcons[d.category] || Clock;
                  return (
                    <div
                      key={d.id}
                      className={`relative rounded-xl border p-4 ${isPast ? "opacity-50" : ""} ${style.bg} ${style.border}`}
                    >
                      {/* Dot on timeline */}
                      <div
                        className={`absolute -left-[33px] top-5 w-4 h-4 rounded-full border-2 border-white ${style.dot}`}
                      />

                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${style.badge}`}
                        >
                          <Icon className={`w-5 h-5 ${style.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className={`font-semibold ${style.text}`}>
                                {d.title}
                              </h3>
                              <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                                {d.description}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-bold">
                                {new Date(d.date).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </p>
                              {!isPast && (
                                <p
                                  className={`text-xs mt-0.5 font-medium ${days <= 30 ? "text-red-600" : style.text}`}
                                >
                                  {days === 0
                                    ? "Aujourd'hui !"
                                    : `dans ${days}j`}
                                </p>
                              )}
                              {isPast && (
                                <p className="text-xs mt-0.5 text-gray-500">
                                  Passé
                                </p>
                              )}
                            </div>
                          </div>
                          {d.important && !isPast && (
                            <div className="mt-2 flex items-center gap-1">
                              <Bell className="w-3 h-3 text-amber-500" />
                              <span className="text-xs text-amber-600 font-medium">
                                Échéance importante
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
