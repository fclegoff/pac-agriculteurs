// ============================================================
// Données PAC centralisées pour toute l'application
// ============================================================

export interface PACDeadline {
  id: string;
  title: string;
  date: string; // ISO format
  description: string;
  category: "declaration" | "aide" | "controle" | "paiement";
  important: boolean;
}

export interface PACFormField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea" | "checkbox";
  placeholder?: string;
  help?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: { min?: number; max?: number; pattern?: string };
}

export interface PACFormStep {
  id: string;
  title: string;
  description: string;
  fields: PACFormField[];
}

export interface PACForm {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  steps: PACFormStep[];
}

export interface Parcelle {
  id: string;
  nom: string;
  ilot: string;
  surface: number; // hectares
  culture: string;
  cultureCode: string;
  commune: string;
  bio: boolean;
  coordinates: [number, number]; // lat, lng center
}

export interface ExploitationProfile {
  nom: string;
  prenom: string;
  raisonSociale: string;
  numeroPacage: string;
  siret: string;
  adresse: string;
  codePostal: string;
  commune: string;
  telephone: string;
  email: string;
  sau: number;
  formeJuridique: string;
}

// Échéances PAC 2026
export const PAC_DEADLINES: PACDeadline[] = [
  {
    id: "d1",
    title: "Ouverture TelePAC",
    date: "2026-04-01",
    description:
      "Ouverture du service de télédéclaration pour la campagne PAC 2026",
    category: "declaration",
    important: true,
  },
  {
    id: "d2",
    title: "Date limite déclaration PAC",
    date: "2026-05-15",
    description:
      "Date limite de dépôt de la déclaration de surfaces et demandes d'aides PAC sans pénalité",
    category: "declaration",
    important: true,
  },
  {
    id: "d3",
    title: "Date limite avec pénalités",
    date: "2026-06-09",
    description:
      "Dépôt tardif possible avec pénalité de 1% par jour ouvré de retard",
    category: "declaration",
    important: true,
  },
  {
    id: "d4",
    title: "Modification de déclaration",
    date: "2026-09-20",
    description:
      "Date limite pour modifier certains éléments de la déclaration sans pénalité",
    category: "declaration",
    important: false,
  },
  {
    id: "d5",
    title: "Demande ICHN",
    date: "2026-05-15",
    description:
      "Date limite pour la demande d'Indemnité Compensatoire de Handicap Naturel",
    category: "aide",
    important: true,
  },
  {
    id: "d6",
    title: "Demande MAEC / Bio",
    date: "2026-05-15",
    description:
      "Date limite pour les demandes de Mesures Agro-Environnementales et Climatiques et aides Bio",
    category: "aide",
    important: true,
  },
  {
    id: "d7",
    title: "Aides animales - bovins",
    date: "2026-05-15",
    description: "Date limite demande aides couplées bovines",
    category: "aide",
    important: false,
  },
  {
    id: "d8",
    title: "Aides animales - ovins/caprins",
    date: "2026-01-31",
    description:
      "Date limite demande aides couplées ovines et caprines",
    category: "aide",
    important: false,
  },
  {
    id: "d9",
    title: "Contrôles sur place",
    date: "2026-06-15",
    description: "Début de la période de contrôles sur place par la DDT/DDTM",
    category: "controle",
    important: false,
  },
  {
    id: "d10",
    title: "Avance aides PAC",
    date: "2026-10-16",
    description:
      "Versement de l'avance des aides PAC (environ 70% des aides découplées)",
    category: "paiement",
    important: true,
  },
  {
    id: "d11",
    title: "Solde aides PAC",
    date: "2026-12-15",
    description: "Versement du solde des aides PAC découplées",
    category: "paiement",
    important: false,
  },
  {
    id: "d12",
    title: "Éco-régimes - début engagements",
    date: "2026-04-01",
    description: "Date de début des engagements éco-régimes pour la campagne",
    category: "aide",
    important: true,
  },
];

// Cultures courantes pour les formulaires
export const CULTURES = [
  { code: "BT", label: "Blé tendre d'hiver" },
  { code: "BD", label: "Blé dur d'hiver" },
  { code: "OH", label: "Orge d'hiver" },
  { code: "OP", label: "Orge de printemps" },
  { code: "MA", label: "Maïs grain" },
  { code: "MF", label: "Maïs fourrage" },
  { code: "CO", label: "Colza d'hiver" },
  { code: "TS", label: "Tournesol" },
  { code: "PT", label: "Prairie temporaire" },
  { code: "PP", label: "Prairie permanente" },
  { code: "JA", label: "Jachère" },
  { code: "SO", label: "Soja" },
  { code: "PO", label: "Pois protéagineux" },
  { code: "FE", label: "Féverole" },
  { code: "BE", label: "Betterave sucrière" },
  { code: "LU", label: "Luzerne" },
  { code: "VI", label: "Vigne" },
  { code: "VE", label: "Verger" },
  { code: "LG", label: "Légumes de plein champ" },
  { code: "PD", label: "Pomme de terre" },
];

// Formes juridiques
export const FORMES_JURIDIQUES = [
  { value: "individuel", label: "Exploitation individuelle" },
  { value: "earl", label: "EARL" },
  { value: "gaec", label: "GAEC" },
  { value: "scea", label: "SCEA" },
  { value: "sarl", label: "SARL agricole" },
  { value: "sas", label: "SAS agricole" },
];

// Formulaires PAC
export const PAC_FORMS: PACForm[] = [
  {
    id: "declaration-surfaces",
    title: "Déclaration de surfaces",
    description:
      "Déclaration annuelle des surfaces exploitées et des cultures pratiquées. C'est le formulaire principal de la PAC.",
    category: "Déclaration obligatoire",
    icon: "map",
    steps: [
      {
        id: "step-identification",
        title: "Identification de l'exploitant",
        description: "Vérifiez vos informations personnelles et d'exploitation",
        fields: [
          {
            id: "numeroPacage",
            label: "Numéro PACAGE",
            type: "text",
            placeholder: "Ex: 012345678",
            help: "Votre numéro PACAGE à 9 chiffres, attribué par la DDT de votre département",
            required: true,
            validation: { pattern: "^[0-9]{9}$" },
          },
          {
            id: "nom",
            label: "Nom de l'exploitant",
            type: "text",
            placeholder: "Votre nom",
            required: true,
          },
          {
            id: "prenom",
            label: "Prénom",
            type: "text",
            placeholder: "Votre prénom",
            required: true,
          },
          {
            id: "formeJuridique",
            label: "Forme juridique",
            type: "select",
            required: true,
            help: "La forme juridique de votre exploitation",
            options: FORMES_JURIDIQUES,
          },
          {
            id: "siret",
            label: "Numéro SIRET",
            type: "text",
            placeholder: "Ex: 12345678901234",
            help: "Votre numéro SIRET à 14 chiffres",
            required: true,
            validation: { pattern: "^[0-9]{14}$" },
          },
        ],
      },
      {
        id: "step-surfaces",
        title: "Déclaration des surfaces",
        description:
          "Déclarez les surfaces de chaque parcelle avec la culture pratiquée",
        fields: [
          {
            id: "nbIlots",
            label: "Nombre d'îlots",
            type: "number",
            placeholder: "Ex: 12",
            help: "Un îlot est un ensemble de parcelles contiguës exploitées par le même agriculteur",
            required: true,
            validation: { min: 1, max: 999 },
          },
          {
            id: "sauTotale",
            label: "SAU totale (hectares)",
            type: "number",
            placeholder: "Ex: 85.50",
            help: "Surface Agricole Utile totale de votre exploitation en hectares",
            required: true,
            validation: { min: 0.01 },
          },
          {
            id: "surfaceCereales",
            label: "Surface en céréales (ha)",
            type: "number",
            placeholder: "Ex: 45.00",
            help: "Surface totale consacrée aux céréales",
            required: false,
          },
          {
            id: "surfacePrairies",
            label: "Surface en prairies (ha)",
            type: "number",
            placeholder: "Ex: 25.00",
            help: "Surface totale en prairies (temporaires + permanentes)",
            required: false,
          },
          {
            id: "surfaceJachere",
            label: "Surface en jachère (ha)",
            type: "number",
            placeholder: "Ex: 4.00",
            help: "Surface mise en jachère (comptabilisée pour la BCAE)",
            required: false,
          },
        ],
      },
      {
        id: "step-eco-regime",
        title: "Éco-régime",
        description:
          "Choisissez votre voie d'accès à l'éco-régime pour une bonification de vos aides",
        fields: [
          {
            id: "ecoRegimeVoie",
            label: "Voie d'accès à l'éco-régime",
            type: "select",
            required: true,
            help: "L'éco-régime remplace le paiement vert. Il bonifie vos aides si vous respectez certaines pratiques.",
            options: [
              { value: "aucune", label: "Pas de demande d'éco-régime" },
              {
                value: "pratiques",
                label: "Voie des pratiques (diversification des cultures)",
              },
              {
                value: "certification",
                label: "Voie de la certification (HVE, Bio...)",
              },
              {
                value: "infrastructures",
                label: "Voie des infrastructures agro-écologiques (IAE)",
              },
            ],
          },
          {
            id: "certificationBio",
            label: "Exploitation en agriculture biologique",
            type: "checkbox",
            help: "Cochez si votre exploitation est certifiée ou en conversion bio (donne accès au niveau supérieur de l'éco-régime)",
            required: false,
          },
          {
            id: "certificationHVE",
            label: "Certification HVE (Haute Valeur Environnementale)",
            type: "checkbox",
            help: "Cochez si votre exploitation est certifiée HVE niveau 3",
            required: false,
          },
        ],
      },
      {
        id: "step-bcae",
        title: "Conditionnalité (BCAE)",
        description:
          "Les Bonnes Conditions Agricoles et Environnementales à respecter",
        fields: [
          {
            id: "bcae7Rotation",
            label: "Rotation des cultures respectée (BCAE 7)",
            type: "checkbox",
            help: "Vous devez avoir au moins 2 cultures différentes sur vos terres arables, et la culture principale ne doit pas dépasser 75% de la surface",
            required: false,
          },
          {
            id: "bcae8SIE",
            label: "% de surfaces d'intérêt écologique (BCAE 8)",
            type: "number",
            placeholder: "Ex: 4",
            help: "Au moins 4% de la surface arable doit être consacrée à des éléments non productifs (jachères, haies, mares...)",
            required: false,
            validation: { min: 0, max: 100 },
          },
          {
            id: "bcae1PrairiesPermanentes",
            label: "Ratio prairies permanentes respecté (BCAE 1)",
            type: "checkbox",
            help: "Le ratio de prairies permanentes par rapport à la surface agricole totale doit être maintenu",
            required: false,
          },
        ],
      },
      {
        id: "step-validation",
        title: "Vérification et signature",
        description:
          "Vérifiez toutes les informations avant de valider votre déclaration",
        fields: [
          {
            id: "attestation",
            label:
              "J'atteste sur l'honneur l'exactitude des informations fournies",
            type: "checkbox",
            help: "En signant, vous vous engagez sur l'exactitude de votre déclaration. Toute fausse déclaration peut entraîner des pénalités.",
            required: true,
          },
          {
            id: "commentaires",
            label: "Commentaires ou observations",
            type: "textarea",
            placeholder:
              "Ajoutez ici tout commentaire utile pour votre DDT...",
            help: "Champ libre pour signaler des situations particulières",
            required: false,
          },
        ],
      },
    ],
  },
  {
    id: "aides-couplees-vegetales",
    title: "Aides couplées végétales",
    description:
      "Demande d'aides couplées pour les productions végétales spécifiques (protéagineux, légumineuses, etc.)",
    category: "Aides",
    icon: "sprout",
    steps: [
      {
        id: "step-type-aide",
        title: "Type d'aide demandée",
        description: "Sélectionnez les aides couplées végétales que vous demandez",
        fields: [
          {
            id: "aideProteagineux",
            label: "Aide aux protéagineux",
            type: "checkbox",
            help: "Pois, féveroles, lupins... Surface minimum de 1 ha requise",
            required: false,
          },
          {
            id: "surfaceProteagineux",
            label: "Surface en protéagineux (ha)",
            type: "number",
            placeholder: "Ex: 8.5",
            required: false,
            validation: { min: 1 },
          },
          {
            id: "aideSoja",
            label: "Aide au soja",
            type: "checkbox",
            help: "Surface minimum de 1 ha requise",
            required: false,
          },
          {
            id: "surfaceSoja",
            label: "Surface en soja (ha)",
            type: "number",
            placeholder: "Ex: 12.0",
            required: false,
            validation: { min: 1 },
          },
          {
            id: "aideLegumineuses",
            label: "Aide aux légumineuses fourragères",
            type: "checkbox",
            help: "Luzerne, trèfle, sainfoin... Surface minimum de 1 ha requise",
            required: false,
          },
          {
            id: "surfaceLegumineuses",
            label: "Surface en légumineuses fourragères (ha)",
            type: "number",
            placeholder: "Ex: 15.0",
            required: false,
            validation: { min: 1 },
          },
        ],
      },
      {
        id: "step-engagement",
        title: "Engagements",
        description: "Confirmez vos engagements pour les aides demandées",
        fields: [
          {
            id: "engagementMaintien",
            label:
              "Je m'engage à maintenir les cultures jusqu'à la récolte",
            type: "checkbox",
            help: "Les cultures doivent être maintenues pendant la période de végétation",
            required: true,
          },
          {
            id: "engagementSurface",
            label:
              "Je confirme que les surfaces déclarées correspondent aux surfaces réellement cultivées",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: "ichn",
    title: "ICHN - Indemnité Compensatoire",
    description:
      "Demande d'Indemnité Compensatoire de Handicap Naturel pour les zones défavorisées",
    category: "Aides",
    icon: "mountain",
    steps: [
      {
        id: "step-eligibilite",
        title: "Éligibilité ICHN",
        description:
          "Vérifiez votre éligibilité à l'ICHN",
        fields: [
          {
            id: "zoneDefavorisee",
            label: "Type de zone défavorisée",
            type: "select",
            required: true,
            help: "Votre exploitation doit être située en zone défavorisée pour bénéficier de l'ICHN",
            options: [
              { value: "montagne", label: "Zone de montagne" },
              { value: "haute-montagne", label: "Zone de haute montagne" },
              {
                value: "piémont",
                label: "Zone défavorisée simple (piémont)",
              },
              {
                value: "specifique",
                label: "Zone soumise à contrainte spécifique",
              },
            ],
          },
          {
            id: "surfaceFourragere",
            label: "Surface fourragère éligible (ha)",
            type: "number",
            placeholder: "Ex: 45.00",
            help: "Prairies et cultures fourragères situées en zone défavorisée",
            required: true,
            validation: { min: 3 },
          },
          {
            id: "chargementUGB",
            label: "Chargement en UGB/ha",
            type: "number",
            placeholder: "Ex: 1.2",
            help: "Nombre d'Unités Gros Bétail par hectare de surface fourragère. Doit être compris entre 0.2 et 2.0 UGB/ha",
            required: true,
            validation: { min: 0.2, max: 2.0 },
          },
          {
            id: "revenuNonAgricole",
            label: "Revenu non agricole inférieur au seuil",
            type: "checkbox",
            help: "Votre revenu non agricole ne doit pas dépasser un certain seuil pour être éligible",
            required: true,
          },
        ],
      },
    ],
  },
];

// Données de démonstration - parcelles
export const DEMO_PARCELLES: Parcelle[] = [
  {
    id: "p1",
    nom: "Les Grands Champs",
    ilot: "I-001",
    surface: 12.5,
    culture: "Blé tendre d'hiver",
    cultureCode: "BT",
    commune: "Saint-Martin",
    bio: false,
    coordinates: [46.603354, 1.888334],
  },
  {
    id: "p2",
    nom: "La Prairie du Moulin",
    ilot: "I-002",
    surface: 8.3,
    culture: "Prairie permanente",
    cultureCode: "PP",
    commune: "Saint-Martin",
    bio: false,
    coordinates: [46.606, 1.892],
  },
  {
    id: "p3",
    nom: "Le Coteau",
    ilot: "I-003",
    surface: 15.2,
    culture: "Colza d'hiver",
    cultureCode: "CO",
    commune: "Beaumont",
    bio: false,
    coordinates: [46.599, 1.885],
  },
  {
    id: "p4",
    nom: "Les Noyers",
    ilot: "I-004",
    surface: 6.8,
    culture: "Maïs grain",
    cultureCode: "MA",
    commune: "Beaumont",
    bio: true,
    coordinates: [46.608, 1.879],
  },
  {
    id: "p5",
    nom: "La Jachère Nord",
    ilot: "I-005",
    surface: 3.5,
    culture: "Jachère",
    cultureCode: "JA",
    commune: "Saint-Martin",
    bio: false,
    coordinates: [46.611, 1.895],
  },
  {
    id: "p6",
    nom: "Le Pré Bas",
    ilot: "I-002",
    surface: 10.1,
    culture: "Prairie temporaire",
    cultureCode: "PT",
    commune: "Saint-Martin",
    bio: false,
    coordinates: [46.601, 1.898],
  },
  {
    id: "p7",
    nom: "Les Tournesols",
    ilot: "I-006",
    surface: 9.4,
    culture: "Tournesol",
    cultureCode: "TS",
    commune: "La Chapelle",
    bio: true,
    coordinates: [46.595, 1.874],
  },
  {
    id: "p8",
    nom: "Le Champ Long",
    ilot: "I-007",
    surface: 18.7,
    culture: "Orge d'hiver",
    cultureCode: "OH",
    commune: "La Chapelle",
    bio: false,
    coordinates: [46.592, 1.869],
  },
];

// Profil de démonstration
export const DEMO_PROFILE: ExploitationProfile = {
  nom: "Dupont",
  prenom: "Jean-Pierre",
  raisonSociale: "EARL Dupont et Fils",
  numeroPacage: "036123456",
  siret: "12345678901234",
  adresse: "12 Route des Champs",
  codePostal: "36200",
  commune: "Saint-Martin",
  telephone: "06 12 34 56 78",
  email: "jp.dupont@example.fr",
  sau: 84.5,
  formeJuridique: "earl",
};
