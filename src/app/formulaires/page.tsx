"use client";

import Link from "next/link";
import {
  FileText,
  ArrowRight,
  MapPin,
  Sprout,
  Mountain,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { PAC_FORMS } from "@/lib/data/pac-data";

const iconMap: Record<string, React.ElementType> = {
  map: MapPin,
  sprout: Sprout,
  mountain: Mountain,
};

export default function FormulairesPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Formulaires PAC</h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Remplissez vos formulaires PAC pas à pas avec des explications claires
          à chaque étape
        </p>
      </div>

      {/* Guide */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-semibold text-green-800 mb-1">
          Comment ça marche ?
        </h3>
        <p className="text-sm text-green-700">
          Chaque formulaire est découpé en étapes simples. À chaque champ, une
          explication en langage clair vous aide à comprendre ce qui est demandé.
          Vos réponses sont sauvegardées automatiquement. Vous pouvez reprendre
          à tout moment.
        </p>
      </div>

      {/* Liste des formulaires */}
      <div className="space-y-4">
        {PAC_FORMS.map((form) => {
          const Icon = iconMap[form.icon] || FileText;
          return (
            <Link
              key={form.id}
              href={`/formulaires/${form.id}`}
              className="block bg-white rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)] hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                  <Icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-lg">{form.title}</h2>
                    <span className="text-xs bg-gray-100 text-[var(--color-text-muted)] px-2 py-0.5 rounded-full">
                      {form.category}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-3">
                    {form.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {form.steps.length} étapes
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {form.steps.reduce(
                        (acc, s) => acc + s.fields.length,
                        0
                      )}{" "}
                      champs
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Non commencé
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] flex-shrink-0 mt-2" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-800 mb-1">
          Vous avez des questions ?
        </h3>
        <p className="text-sm text-blue-700">
          Chaque champ est accompagné d&apos;une bulle d&apos;aide qui explique en termes
          simples ce qui est attendu. Si vous avez besoin d&apos;aide supplémentaire,
          consultez la{" "}
          <Link href="/aide" className="underline font-medium">
            page d&apos;aide
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
