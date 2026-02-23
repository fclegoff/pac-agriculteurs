"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Save,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { PAC_FORMS, type PACFormField } from "@/lib/data/pac-data";

function FormFieldComponent({
  field,
  value,
  onChange,
}: {
  field: PACFormField;
  value: string | boolean;
  onChange: (val: string | boolean) => void;
}) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="mb-5">
      <div className="flex items-start gap-2 mb-1.5">
        <label className="block text-sm font-medium text-[var(--color-text)]">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.help && (
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex-shrink-0 text-[var(--color-info)] hover:text-blue-700 transition-colors"
            title="Aide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {showHelp && field.help && (
        <div className="mb-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          {field.help}
        </div>
      )}

      {field.type === "text" && (
        <input
          type="text"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white"
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          min={field.validation?.min}
          max={field.validation?.max}
          step="0.01"
          className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white"
        />
      )}

      {field.type === "select" && (
        <select
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white"
        >
          <option value="">-- Sélectionnez --</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "textarea" && (
        <textarea
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white resize-none"
        />
      )}

      {field.type === "date" && (
        <input
          type="date"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white"
        />
      )}

      {field.type === "checkbox" && (
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span className="text-sm text-[var(--color-text-muted)]">
            {field.placeholder || "Oui"}
          </span>
        </label>
      )}
    </div>
  );
}

export default function FormulaireDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const form = PAC_FORMS.find((f) => f.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  if (!form) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--color-text-muted)]">Formulaire non trouvé</p>
        <Link
          href="/formulaires"
          className="text-[var(--color-primary)] hover:underline mt-2 inline-block"
        >
          Retour aux formulaires
        </Link>
      </div>
    );
  }

  const step = form.steps[currentStep];
  const totalSteps = form.steps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      setSubmitted(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  if (submitted) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Formulaire complété !</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Votre {form.title.toLowerCase()} a été sauvegardé avec succès. Vous
            pourrez le modifier jusqu&apos;à la date limite de dépôt.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 text-sm">
                  Important
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Ce formulaire est une aide au remplissage. Pour la soumission
                  officielle, vous devrez transférer ces informations sur{" "}
                  <strong>TelePAC</strong> (telepac.agriculture.gouv.fr).
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(0);
              }}
              className="px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Modifier
            </button>
            <Link
              href="/formulaires"
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-dark)]"
            >
              Retour aux formulaires
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/formulaires"
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] flex items-center gap-1 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux formulaires
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">{form.title}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          {form.description}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-[var(--color-text)]">
            Étape {currentStep + 1} sur {totalSteps}
          </span>
          <span className="text-[var(--color-text-muted)]">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / totalSteps) * 100}%`,
            }}
          />
        </div>
        {/* Step indicators */}
        <div className="flex gap-1 mt-3">
          {form.steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i <= currentStep
                  ? "bg-[var(--color-primary)]"
                  : "bg-gray-200"
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Form step */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 md:p-6">
        <h2 className="text-lg font-bold mb-1">{step.title}</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-5">
          {step.description}
        </p>

        {step.fields.map((field) => (
          <FormFieldComponent
            key={field.id}
            field={field}
            value={formData[field.id] ?? ""}
            onChange={(val) => handleFieldChange(field.id, val)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            currentStep === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-[var(--color-text-muted)] hover:bg-gray-100"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </button>

        <button className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
          <Save className="w-4 h-4" />
          Sauvegarder
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {isLastStep ? "Valider" : "Suivant"}
          {isLastStep ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
