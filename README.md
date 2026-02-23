# PAC Assist

**Application open source d'aide aux agriculteurs pour leurs declarations PAC.**

Les agriculteurs francais passent des heures chaque annee a remplir des formulaires PAC. PAC Assist simplifie ce processus avec des formulaires guides, un calendrier des echeances, un parcellaire interactif et un assistant IA qui repond a leurs questions en temps reel.

---

## Fonctionnalites

### Formulaires guides pas-a-pas
Chaque formulaire PAC est decoupe en etapes simples. Chaque champ est accompagne d'une explication en langage clair — pas de jargon administratif.

**Formulaires disponibles :**
- Declaration de surfaces (5 etapes)
- Aides couplees vegetales
- ICHN (Indemnite Compensatoire de Handicap Naturel)

### Calendrier des echeances
Toutes les dates importantes de la campagne PAC 2026 : ouverture TelePAC, dates limites, periodes de controle, versements des aides. Avec des alertes visuelles quand une echeance approche.

### Parcellaire interactif
Visualisation des parcelles sur une carte OpenStreetMap avec Leaflet. Vue par culture, surface, ilot. Recherche et filtrage.

### Assistant IA integre
Un chatbot specialise PAC, propulse par Claude (Anthropic), qui repond aux questions des agriculteurs en francais et en langage simple :
- "C'est quoi l'eco-regime ?"
- "Je suis eligible a l'ICHN ?"
- "Comment calculer mes BCAE ?"

### Profil exploitation
Stockage des informations recurrentes (PACAGE, SIRET, SAU...) pour pre-remplir automatiquement les formulaires.

### Aide et FAQ
Glossaire des termes PAC, questions frequentes, contacts utiles (DDT, chambre d'agriculture, TelePAC).

---

## Demarrage rapide

### Prerequisites
- Node.js 18+
- Une cle API Anthropic (pour l'assistant IA)

### Installation

```bash
git clone https://github.com/VOTRE_USERNAME/pac-agriculteurs.git
cd pac-agriculteurs
npm install
```

Creez un fichier `.env.local` a la racine :

```
ANTHROPIC_API_KEY=votre_cle_api_anthropic
```

Vous pouvez obtenir une cle API sur [console.anthropic.com](https://console.anthropic.com).

### Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Stack technique

| Technologie | Usage |
|-------------|-------|
| Next.js 16 | Framework React full-stack |
| React 19 | UI components |
| TypeScript | Typage statique |
| Tailwind CSS 4 | Styles |
| Leaflet | Cartographie |
| API Claude (Anthropic) | Assistant IA |
| Lucide React | Icones |

---

## Structure du projet

```
src/
  app/
    page.tsx                    # Tableau de bord
    formulaires/
      page.tsx                  # Liste des formulaires
      [id]/page.tsx             # Formulaire guide pas-a-pas
    calendrier/page.tsx         # Calendrier des echeances
    parcellaire/page.tsx        # Carte des parcelles
    exploitation/page.tsx       # Profil exploitation
    aide/page.tsx               # FAQ et glossaire
    api/chat/route.ts           # API assistant IA
  components/
    layout/                     # Sidebar, navigation mobile
    chat/ChatBot.tsx            # Widget chat IA flottant
    parcellaire/ParcelleMap.tsx # Carte Leaflet
  lib/
    data/pac-data.ts            # Donnees PAC centralisees
```

---

## Contribuer

Ce projet a besoin de vous ! Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les details.

**On cherche :**
- Des **agriculteurs** pour tester et donner leur avis
- Des **developpeurs** pour ajouter des fonctionnalites
- Des **partenaires** (chambres d'agriculture, cooperatives, agritech)

---

## Roadmap

- [ ] Persistance des donnees (base de donnees)
- [ ] Authentification utilisateur
- [ ] Export PDF des formulaires
- [ ] Mode hors-ligne (PWA)
- [ ] Integration donnees RPG (IGN)
- [ ] Notifications echeances (email/SMS)
- [ ] Formulaires supplementaires (MAEC, aides animales...)
- [ ] Tests automatises

---

## Licence

MIT - Voir [LICENSE](./LICENSE)

---

## Avertissement

PAC Assist est un outil d'aide au remplissage. Les informations fournies sont a titre indicatif. Pour la reglementation officielle, referez-vous a votre DDT/DDTM ou au site du ministere de l'Agriculture. La soumission officielle de votre declaration se fait sur [TelePAC](https://telepac.agriculture.gouv.fr).
