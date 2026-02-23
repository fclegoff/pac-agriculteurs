"use client";

import {
  FileText,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Wheat,
  Euro,
} from "lucide-react";
import Link from "next/link";
import { PAC_DEADLINES, DEMO_PARCELLES, PAC_FORMS } from "@/lib/data/pac-data";

function getNextDeadlines() {
  const now = new Date();
  return PAC_DEADLINES.filter((d) => new Date(d.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
}

function getDaysUntil(dateStr: string) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

function getCategoryColor(cat: string) {
  switch (cat) {
    case "declaration":
      return "bg-red-100 text-red-700";
    case "aide":
      return "bg-blue-100 text-blue-700";
    case "controle":
      return "bg-amber-100 text-amber-700";
    case "paiement":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getCategoryLabel(cat: string) {
  switch (cat) {
    case "declaration":
      return "Déclaration";
    case "aide":
      return "Aide";
    case "controle":
      return "Contrôle";
    case "paiement":
      return "Paiement";
    default:
      return cat;
  }
}

export default function Dashboard() {
  const nextDeadlines = getNextDeadlines();
  const totalSurface = DEMO_PARCELLES.reduce((s, p) => s + p.surface, 0);
  const nbParcelles = DEMO_PARCELLES.length;
  const nbCultures = new Set(DEMO_PARCELLES.map((p) => p.cultureCode)).size;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
          Bonjour, Jean-Pierre
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Campagne PAC 2026 — EARL Dupont et Fils
        </p>
      </div>

      {/* Alerte deadline */}
      {nextDeadlines.length > 0 && getDaysUntil(nextDeadlines[0].date) <= 60 && (
        <div className="mb-6 bg-[#fffbeb] border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">
              {nextDeadlines[0].title} dans{" "}
              {getDaysUntil(nextDeadlines[0].date)} jours
            </p>
            <p className="text-sm text-amber-700 mt-0.5">
              {nextDeadlines[0].description}
            </p>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{totalSurface.toFixed(1)} ha</p>
          <p className="text-xs text-[var(--color-text-muted)]">SAU totale</p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wheat className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{nbParcelles}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Parcelles</p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{nbCultures}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Cultures</p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Euro className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">~25 800</p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Aides estimées (EUR)
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Prochaines échéances */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
              Prochaines échéances
            </h2>
            <Link
              href="/calendrier"
              className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
            >
              Tout voir <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {nextDeadlines.map((d) => {
              const days = getDaysUntil(d.date);
              return (
                <div
                  key={d.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg)]"
                >
                  <div className="text-center min-w-[50px]">
                    <p className="text-lg font-bold text-[var(--color-text)]">
                      {new Date(d.date).getDate()}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase">
                      {new Date(d.date).toLocaleDateString("fr-FR", {
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{d.title}</p>
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${getCategoryColor(d.category)}`}
                    >
                      {getCategoryLabel(d.category)}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`text-sm font-semibold ${days <= 30 ? "text-red-600" : "text-[var(--color-text-muted)]"}`}
                    >
                      {days}j
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulaires */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--color-primary)]" />
              Formulaires PAC
            </h2>
            <Link
              href="/formulaires"
              className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
            >
              Tout voir <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {PAC_FORMS.map((form) => (
              <Link
                key={form.id}
                href={`/formulaires/${form.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg)] hover:bg-[var(--color-primary-light)] transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-primary)]">
                  <FileText className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{form.title}</p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {form.category} — {form.steps.length} étapes
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Avancement */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)]" />
            Avancement campagne 2026
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Profil exploitation",
                progress: 100,
                status: "Complet",
              },
              { label: "Parcellaire à jour", progress: 75, status: "6/8 parcelles" },
              {
                label: "Déclaration de surfaces",
                progress: 0,
                status: "Non commencé",
              },
              { label: "Éco-régime", progress: 0, status: "Non commencé" },
              {
                label: "Aides couplées",
                progress: 0,
                status: "Non commencé",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[var(--color-text-muted)] text-xs">
                    {item.status}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.progress === 100
                        ? "bg-[var(--color-success)]"
                        : item.progress > 0
                          ? "bg-[var(--color-accent)]"
                          : "bg-gray-200"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accès rapide */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[var(--color-primary)]" />
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                href: "/formulaires/declaration-surfaces",
                label: "Déclarer mes surfaces",
                icon: FileText,
                color: "bg-green-50 text-green-700 border-green-200",
              },
              {
                href: "/parcellaire",
                label: "Voir mes parcelles",
                icon: MapPin,
                color: "bg-blue-50 text-blue-700 border-blue-200",
              },
              {
                href: "/calendrier",
                label: "Dates importantes",
                icon: Calendar,
                color: "bg-amber-50 text-amber-700 border-amber-200",
              },
              {
                href: "/aide",
                label: "Besoin d'aide ?",
                icon: AlertTriangle,
                color: "bg-purple-50 text-purple-700 border-purple-200",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center hover:shadow-md transition-shadow ${item.color}`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
