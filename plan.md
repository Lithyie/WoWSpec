# WoWSpec — Plan d'implémentation

## Architecture générale

```
wowspec/
├── app/
│   └── [locale]/               # Segment de locale : "en" | "fr"
│       ├── page.tsx            # Homepage — sélecteur de classe
│       ├── [class]/
│       │   └── [spec]/
│       │       └── page.tsx    # Page guide d'une spé
│       └── layout.tsx          # Layout avec Provider next-intl
├── middleware.ts               # Redirection automatique selon Accept-Language
├── i18n/
│   └── routing.ts              # Config next-intl (locales, defaultLocale)
├── messages/
│   ├── en.json                 # Traductions anglaises (UI, labels, rôles…)
│   └── fr.json                 # Traductions françaises
├── components/
│   ├── ui/                     # Composants atomiques (Button, Badge, Card…)
│   ├── layout/                 # Header (avec LocaleSwitcher), Footer, Sidebar
│   ├── home/                   # ClassGrid, SpecSelector
│   └── guide/                  # StatPriority, TalentDisplay, RotationList, GearTable
├── lib/
│   ├── wowhead/
│   │   ├── scraper.ts          # Fetch + parse HTML Wowhead (EN + FR)
│   │   └── parser.ts           # Extraction structurée du contenu
│   ├── data/
│   │   ├── classes.ts          # Données statiques classes/specs
│   │   └── cache.ts            # Système de cache des guides
│   └── utils.ts
├── types/
│   └── index.ts                # Types TypeScript partagés
├── public/
│   └── icons/                  # Icônes de classe/spec (téléchargées)
└── content/                    # Guides en cache (JSON, généré)
    └── guides/
        ├── en/
        │   └── [class]-[spec].json
        └── fr/
            └── [class]-[spec].json
```

---

## Phase 1 — Fondations (Semaine 1)

### 1.1 Setup projet
- [ ] Initialiser Next.js 15 avec TypeScript et Tailwind CSS v4
- [ ] Configurer ESLint + Prettier
- [ ] Installer et configurer **next-intl** (middleware, routing, Provider)
- [ ] Créer `messages/en.json` et `messages/fr.json` avec toutes les clés UI
- [ ] Mettre en place la structure de dossiers avec `app/[locale]/`
- [ ] Définir les types TypeScript (`Class`, `Spec`, `Guide`, `Rotation`, `Locale`…)
- [ ] Créer le fichier `lib/data/classes.ts` avec toutes les classes et spés WoW

### 1.2 Design system de base
- [ ] Configurer le thème Tailwind (couleurs, typographie, espacements)
- [ ] Créer les composants atomiques : `Button`, `Badge`, `Card`, `Tooltip`
- [ ] Créer le `Layout` global avec `Header` (inclut `LocaleSwitcher`)
- [ ] Composant `LocaleSwitcher` : drapeaux 🇬🇧 / 🇫🇷, switche la locale sans perdre la page courante
- [ ] Tester le design system sur une page de démonstration

---

## Phase 2 — Scraping & données (Semaine 1-2)

### 2.1 Scraper Wowhead
- [ ] Analyser la structure HTML des pages de guides Wowhead
- [ ] Écrire `lib/wowhead/scraper.ts` : fetch du HTML avec headers browser
- [ ] Écrire `lib/wowhead/parser.ts` : extraction des sections clés
  - Stats prioritaires
  - Build de talents recommandé
  - Rotation (opener, priority list, cooldowns)
  - Liste BIS (Best in Slot)
  - Tips et notes importantes
- [ ] Système de cache JSON local (`content/guides/`)
- [ ] Script CLI `scripts/fetch-guide.ts` pour générer/mettre à jour un guide

### 2.2 Validation des données
- [ ] Tester le parsing sur 3-5 specs représentatives (différents rôles)
- [ ] Gérer les cas particuliers (structure HTML variable selon les guides)
- [ ] Logger les erreurs de parsing pour les corriger manuellement si besoin

---

## Phase 3 — Pages principales (Semaine 2)

### 3.1 Homepage
- [ ] Grille des 13 classes avec icône + couleur de classe
- [ ] Au survol/clic : afficher les spés disponibles
- [ ] Barre de recherche rapide (filtrer par classe, spé, rôle)
- [ ] Animation d'entrée légère sur la grille

### 3.2 Page de guide (`/[locale]/[class]/[spec]`)
- [ ] Layout en sections : Présentation → Stats → Talents → Rotation → Gear → Tips
- [ ] Navigation par ancres (sidebar sticky ou tabs)
- [ ] Breadcrumb (Accueil > Classe > Spé) — traduit selon la locale
- [ ] Badge "Rôle" (Tank / Healer / DPS) — traduit
- [ ] Indicateur de patch et date de mise à jour
- [ ] Lien source vers le guide Wowhead original (EN ou FR selon locale)

---

## Phase 4 — Composants guide (Semaine 2-3)

### 4.1 Composant StatPriority
- [ ] Barre visuelle ordonnée des statistiques
- [ ] Tooltip explicatif au survol de chaque stat
- [ ] Affichage des valeurs de cap si applicable (ex: Hit cap)

### 4.2 Composant TalentDisplay
- [ ] Afficher le build de talents recommandé (import string ou visuel simplifié)
- [ ] Bouton copier le code de talents
- [ ] Distinction talents obligatoires / situationnels

### 4.3 Composant RotationList
- [ ] Listes ordonnées avec icônes de sorts
- [ ] Séparation visuelle Opener / Priority / Cooldowns
- [ ] Indication des conditions (ex: "si proc X actif")

### 4.4 Composant GearTable
- [ ] Tableau BIS avec icônes d'items
- [ ] Affichage de la source (donjon, raid, craft)
- [ ] Mise en avant du bonus de set de tier

### 4.5 Composant StrengthsWeaknesses
- [ ] Deux colonnes visuelles (vert/rouge)
- [ ] Points courts et percutants

---

## Phase 5 — Polissage & Performance (Semaine 3)

### 5.1 Performance
- [ ] Générer toutes les pages en SSG (`generateStaticParams`)
- [ ] Optimiser les images avec `next/image`
- [ ] Lazy loading des sections non-critiques
- [ ] Vérifier les Core Web Vitals (LCP, CLS, FID)

### 5.2 Responsive
- [ ] Tester et adapter la homepage sur mobile
- [ ] Adapter la navigation du guide sur mobile (tabs horizontaux)
- [ ] Vérifier la lisibilité des tableaux et listes sur petit écran

### 5.3 Accessibilité
- [ ] Attributs `aria-label` sur les éléments interactifs
- [ ] Contraste des couleurs conforme WCAG AA
- [ ] Navigation clavier sur la grille de classes

### 5.4 SEO
- [ ] Metadata dynamique par page (`generateMetadata`) — titre et description traduits
- [ ] `hreflang` tags (`<link rel="alternate" hreflang="en">` / `hreflang="fr"`)
- [ ] Open Graph tags
- [ ] Sitemap automatique (inclut les deux locales)

---

## Décisions techniques clés

### Stratégie de fetching Wowhead

**Option retenue : Build-time scraping + cache JSON**
- À la build, un script fetch les pages Wowhead et génère des fichiers JSON dans `content/guides/en/` et `content/guides/fr/`
- Sources : `wowhead.com` (EN) et `fr.wowhead.com` (FR) — Wowhead propose une version française officielle
- Les pages Next.js lisent ces fichiers JSON (pas de fetch runtime)
- Mise à jour via un script manuel ou un workflow GitHub Actions hebdomadaire
- **Avantage** : zéro dépendance runtime sur Wowhead, site ultra-rapide
- **Inconvénient** : données potentiellement en retard sur les patchs WoW

**Alternative** : ISR (Incremental Static Regeneration) avec `revalidate: 3600` pour des données toujours fraîches sans rebuild complet.

### Internationalisation (next-intl)

**Routing** : segment `[locale]` en tête de l'app — `/en/paladin/retribution` et `/fr/paladin/retribution`.

**Middleware** : détecte `Accept-Language` à la première visite et redirige vers la locale appropriée. L'utilisateur peut switcher via le `LocaleSwitcher` à tout moment ; la préférence est stockée en cookie.

**Contenu traduit** :
- UI/labels : clés dans `messages/en.json` + `messages/fr.json`
- Contenu des guides : JSON séparés par locale (`content/guides/en/` vs `content/guides/fr/`)
- Noms de classes/specs : restent en anglais (noms officiels Blizzard), les rôles et labels d'interface sont traduits

**`LocaleSwitcher`** : composant dans la navbar, affiche le drapeau de la langue active, switche vers l'autre locale sur la même URL relative (`/[locale]/[class]/[spec]` → change uniquement le segment `[locale]`).

### Icônes de sorts et classes

- Icônes de classes : CDN Blizzard `render.worldofwarcraft.com/icons/56/<name>.jpg`
- Icônes de sorts : CDN Wowhead `wow.zamimg.com/images/wow/icons/medium/<name>.jpg`
- Télécharger les icônes les plus courantes à la build, sinon fallback sur le CDN

### Gestion des couleurs de classe

Chaque classe WoW a une couleur officielle définie par Blizzard :
```
Death Knight  #C41E3A
Demon Hunter  #A330C9
Druid         #FF7C0A
Evoker        #33937F
Hunter        #AAD372
Mage          #3FC7EB
Monk          #00FF98
Paladin       #F48CBA
Priest        #FFFFFF
Rogue         #FFF468
Shaman        #0070DD
Warlock       #8788EE
Warrior       #C69B3A
```
Ces couleurs servent d'accent pour les cards, badges et highlights de chaque classe.

---

## Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Wowhead change la structure HTML de ses pages | Moyen | Haut | Parser modulaire, tests de régression, fallback vers contenu statique |
| Wowhead bloque le scraping | Faible | Haut | Headers browser réalistes, délai entre requêtes, cache agressif |
| Données incomplètes ou mal parsées pour certaines spés | Élevé | Moyen | Mode dégradé : afficher un lien direct vers Wowhead |
| Droits sur les données Wowhead | Faible | Haut | Citer la source, ne pas reproduire mot pour mot, transformer visuellement |

---

## Critères de succès v1

- Toutes les spécialisations ont une page de guide accessible en EN et FR
- Les 5 sections principales (Stats, Talents, Rotation, Gear, Tips) sont renseignées
- Lighthouse score ≥ 90 sur Performance, Accessibilité et SEO
- Temps de chargement initial < 2 secondes
- Design cohérent et soigné sur desktop et mobile
- Le switch de langue conserve la page courante et est instantané
