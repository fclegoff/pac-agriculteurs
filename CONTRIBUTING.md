# Contribuer a PAC Assist

Merci de vouloir contribuer ! Ce projet est ne d'une envie d'aider les agriculteurs francais. Toute aide est la bienvenue.

## Comment contribuer

### Vous etes agriculteur ?

Votre retour est le plus precieux. Vous pouvez :
- Tester l'application et nous dire ce qui manque
- Ouvrir une **Issue** sur GitHub pour signaler un probleme ou proposer une amelioration
- Nous dire quels formulaires PAC vous posent le plus de difficultes

### Vous etes developpeur ?

1. **Forkez** le repo
2. Creez une branche pour votre fonctionnalite (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m "Ajout de ma fonctionnalite"`)
4. Poussez la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une **Pull Request**

### Stack technique

- **Frontend** : Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Cartographie** : Leaflet / React-Leaflet
- **IA** : API Anthropic Claude
- **Icons** : Lucide React

### Lancer le projet en local

```bash
git clone https://github.com/VOTRE_USERNAME/pac-agriculteurs.git
cd pac-agriculteurs
npm install
```

Creez un fichier `.env.local` :
```
ANTHROPIC_API_KEY=votre_cle_api
```

Lancez le serveur :
```bash
npm run dev
```

L'app est accessible sur http://localhost:3000

### Idees de contributions

- [ ] Ajouter d'autres formulaires PAC (MAEC, aides animales...)
- [ ] Persistance des donnees (Firebase, Supabase...)
- [ ] Export PDF des formulaires remplis
- [ ] Mode hors-ligne (PWA)
- [ ] Integration avec les donnees RPG de l'IGN
- [ ] Notifications par email/SMS pour les echeances
- [ ] Multilingue (pour les DOM-TOM, Belgique...)
- [ ] Tests unitaires et e2e
- [ ] Authentification utilisateur

## Code de conduite

Soyez respectueux et bienveillant. Ce projet est la pour aider, pas pour creer des tensions. Toute contribution constructive est la bienvenue, quel que soit votre niveau.

## Questions ?

Ouvrez une Issue ou contactez-nous directement. On est la pour aider.
