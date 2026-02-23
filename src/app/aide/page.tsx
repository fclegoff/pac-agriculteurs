"use client";

import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  BookOpen,
  MessageCircle,
  FileText,
  AlertCircle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Déclaration PAC",
    question: "Qu'est-ce que la déclaration PAC ?",
    answer:
      "La déclaration PAC (ou déclaration de surfaces) est un formulaire annuel obligatoire pour tous les agriculteurs qui souhaitent bénéficier des aides de la Politique Agricole Commune. Elle permet de déclarer les surfaces exploitées, les cultures pratiquées, et de demander les différentes aides (aides découplées, éco-régime, aides couplées, ICHN, MAEC...).",
  },
  {
    category: "Déclaration PAC",
    question: "Quand dois-je déposer ma déclaration ?",
    answer:
      "La date limite de dépôt est généralement fixée au 15 mai. Au-delà de cette date et jusqu'au 9 juin environ, vous pouvez encore déposer mais avec une pénalité de 1% par jour ouvré de retard. Après cette date butoir, votre déclaration ne sera plus acceptée. Le service TelePAC ouvre habituellement début avril.",
  },
  {
    category: "Déclaration PAC",
    question: "Qu'est-ce qu'un îlot et une parcelle ?",
    answer:
      "Un îlot est un ensemble de terres contiguës exploitées par un même agriculteur, délimité par des éléments fixes (routes, rivières, limites de propriété...). Une parcelle est une subdivision de l'îlot, correspondant à une seule culture ou utilisation du sol. Par exemple, un îlot de 20 hectares peut contenir 3 parcelles : 10 ha de blé, 5 ha de colza et 5 ha de jachère.",
  },
  {
    category: "Éco-régime",
    question: "Qu'est-ce que l'éco-régime ?",
    answer:
      "L'éco-régime est un nouveau dispositif de la PAC 2023-2027 qui remplace le « paiement vert ». Il récompense les agriculteurs qui adoptent des pratiques favorables à l'environnement. Il existe 3 voies d'accès : la voie des pratiques (diversification des cultures), la voie de la certification (HVE, Bio), et la voie des infrastructures agro-écologiques. Chaque voie a un niveau de base et un niveau supérieur, avec des montants d'aide différents.",
  },
  {
    category: "Éco-régime",
    question: "Comment choisir ma voie d'accès à l'éco-régime ?",
    answer:
      "Le choix dépend de votre système d'exploitation. Si vous avez une exploitation diversifiée avec plusieurs cultures, la voie des pratiques peut être la plus simple. Si vous êtes certifié Bio ou HVE, la voie de la certification est avantageuse car elle donne accès au niveau supérieur. Si vous avez beaucoup d'éléments de paysage (haies, mares, arbres), la voie des IAE peut être intéressante. Vous pouvez choisir la voie la plus favorable chaque année.",
  },
  {
    category: "Conditionnalité",
    question: "Qu'est-ce que les BCAE ?",
    answer:
      "Les BCAE (Bonnes Conditions Agricoles et Environnementales) sont des règles que tout agriculteur demandant des aides PAC doit respecter. Elles concernent : le maintien des prairies permanentes (BCAE 1), la protection des zones humides (BCAE 2), le brûlage des chaumes (BCAE 3), les bandes tampons le long des cours d'eau (BCAE 4), la gestion du sol pour limiter l'érosion (BCAE 5-6), la rotation des cultures (BCAE 7), et les surfaces d'intérêt écologique (BCAE 8).",
  },
  {
    category: "Aides",
    question: "Qu'est-ce que l'ICHN ?",
    answer:
      "L'ICHN (Indemnité Compensatoire de Handicap Naturel) est une aide destinée aux agriculteurs dont l'exploitation se situe en zone défavorisée (montagne, piémont, zones à handicap spécifique). Elle compense les surcoûts liés aux contraintes naturelles. Pour en bénéficier, il faut notamment avoir au moins 80% de la SAU en zone défavorisée et respecter un taux de chargement en bétail compris entre 0,2 et 2,0 UGB/ha.",
  },
  {
    category: "Aides",
    question: "Quand les aides PAC sont-elles versées ?",
    answer:
      "Les aides PAC sont versées en deux temps. Une avance d'environ 70% des aides découplées (DPB, éco-régime, aide redistributive) est versée à partir du 16 octobre. Le solde est versé à partir de décembre. Les aides couplées et l'ICHN sont généralement versées entre octobre et mars de l'année suivante. Les MAEC et aides Bio sont versées entre mars et juin de l'année suivante.",
  },
  {
    category: "TelePAC",
    question: "Comment accéder à TelePAC ?",
    answer:
      "TelePAC est le service de télédéclaration du ministère de l'Agriculture. Vous y accédez sur telepac.agriculture.gouv.fr avec votre numéro PACAGE et votre mot de passe. Si vous n'avez pas encore de compte, contactez votre DDT/DDTM. Notre application PAC Assist vous aide à préparer votre déclaration avant de la saisir sur TelePAC.",
  },
  {
    category: "TelePAC",
    question: "Puis-je modifier ma déclaration après l'avoir envoyée ?",
    answer:
      "Oui, vous pouvez modifier votre déclaration après l'envoi. Pendant la période de déclaration (jusqu'au 15 mai), vous pouvez faire autant de modifications que nécessaire. Après le 15 mai, certaines modifications restent possibles sans pénalité jusqu'au 20 septembre environ (modification des assolements). Attention, certaines modifications tardives peuvent entraîner des pénalités.",
  },
];

const CATEGORIES = [
  "Toutes",
  "Déclaration PAC",
  "Éco-régime",
  "Conditionnalité",
  "Aides",
  "TelePAC",
];

export default function AidePage() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [search, setSearch] = useState("");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCategory =
      selectedCategory === "Toutes" || item.category === selectedCategory;
    const matchSearch =
      search === "" ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-[var(--color-primary)]" />
          Aide & FAQ
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Trouvez des réponses à vos questions sur la PAC
        </p>
      </div>

      {/* Contacts rapides */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Votre DDT/DDTM</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Service agriculture
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Contactez le service PAC de votre département pour toute question
            réglementaire
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Chambre d&apos;agriculture</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Conseil personnalisé
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Les conseillers de la chambre d&apos;agriculture peuvent vous aider à
            remplir votre déclaration
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">TelePAC</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Portail officiel
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            telepac.agriculture.gouv.fr — Le portail officiel pour déposer votre
            déclaration
          </p>
        </div>
      </div>

      {/* Avertissement */}
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800 text-sm">
            Information importante
          </p>
          <p className="text-sm text-amber-700 mt-0.5">
            PAC Assist est un outil d&apos;aide au remplissage. Les informations
            fournies sont données à titre indicatif. Pour la réglementation
            officielle, référez-vous à votre DDT/DDTM ou au site du ministère de
            l&apos;Agriculture.
          </p>
        </div>
      </div>

      {/* Recherche */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher dans la FAQ..."
          className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
        />
      </div>

      {/* Filtres catégories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-100 text-[var(--color-text-muted)] hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="space-y-2">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden"
          >
            <button
              onClick={() => setOpenItem(openItem === i ? null : i)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
            >
              {openItem === i ? (
                <ChevronDown className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium text-sm">{item.question}</p>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {item.category}
                </span>
              </div>
            </button>
            {openItem === i && (
              <div className="px-4 pb-4 pl-12">
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <HelpCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucun résultat trouvé</p>
          </div>
        )}
      </div>

      {/* Glossaire rapide */}
      <div className="mt-8 bg-white rounded-xl border border-[var(--color-border)] p-5">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
          Glossaire rapide
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            {
              term: "SAU",
              def: "Surface Agricole Utile — superficie totale exploitée",
            },
            {
              term: "PACAGE",
              def: "Numéro d'identification de l'exploitation auprès de la PAC",
            },
            {
              term: "DPB",
              def: "Droits à Paiement de Base — aide découplée par hectare",
            },
            {
              term: "BCAE",
              def: "Bonnes Conditions Agricoles et Environnementales",
            },
            {
              term: "MAEC",
              def: "Mesures Agro-Environnementales et Climatiques",
            },
            {
              term: "ICHN",
              def: "Indemnité Compensatoire de Handicap Naturel",
            },
            {
              term: "HVE",
              def: "Haute Valeur Environnementale — certification niveau 3",
            },
            {
              term: "UGB",
              def: "Unité Gros Bétail — mesure du chargement animal",
            },
            {
              term: "RPG",
              def: "Registre Parcellaire Graphique — carte des parcelles agricoles",
            },
            {
              term: "DDT/DDTM",
              def: "Direction Départementale des Territoires (et de la Mer)",
            },
          ].map((item) => (
            <div
              key={item.term}
              className="flex gap-2 p-2 rounded-lg bg-[var(--color-bg)]"
            >
              <span className="font-bold text-sm text-[var(--color-primary)] min-w-[60px]">
                {item.term}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">
                {item.def}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
