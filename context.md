# WoWSpec — Project Context

## Vision

WoWSpec est un site de référence pour les joueurs de World of Warcraft souhaitant consulter rapidement et efficacement les guides de leurs spécialisations. L'objectif est de présenter de façon claire, visuelle et pédagogique les informations de jeu que l'on trouve habituellement sur des sites comme Wowhead ou Icy Veins, mais dans une expérience plus moderne et plus agréable à parcourir.

## Problème résolu

Les sites de guides WoW existants (Wowhead, Icy Veins, Noxxic…) souffrent de plusieurs défauts :
- Interfaces chargées et publicitaires
- Navigation peu intuitive
- Présentation textuelle dense, peu aérée
- Design vieillissant
- Difficulté à trouver rapidement l'essentiel (stats prioritaires, rotation, talents)

WoWSpec répond à ce problème en proposant une expérience épurée, visuellement soignée, centrée sur l'utilisateur.

## Public cible

- Joueurs WoW débutants ou intermédiaires cherchant à améliorer leur jeu
- Joueurs expérimentés voulant consulter rapidement un guide sans naviguer dans une interface surchargée
- Joueurs reprenant le jeu après une pause et ayant besoin de se remettre à niveau sur une spé

## Modèle de données

### Classes et spécialisations
World of Warcraft compte **13 classes**, chacune ayant **2 à 4 spécialisations** (environ 39 spés au total).

```
Class
├── id
├── name (ex: "Paladin")
├── icon
├── color (couleur de classe officielle WoW)
└── specs[]
    ├── id
    ├── name (ex: "Holy", "Protection", "Retribution")
    ├── role (tank | healer | melee_dps | ranged_dps)
    ├── icon
    └── guide (voir ci-dessous)
```

### Guide de spé
```
Guide
├── spec_id
├── last_updated
├── patch_version (ex: "11.1")
├── source_url (URL Wowhead d'origine)
├── summary (introduction courte)
├── strengths[]
├── weaknesses[]
├── stats_priority[]      (liste ordonnée : ex. ["Haste", "Mastery", "Versatility"])
├── talents (build recommandé)
├── rotation
│   ├── opener[]
│   ├── priority[]
│   └── cooldowns[]
├── gear
│   ├── tier_set_bonus
│   └── bis_list[]
└── tips[]
```

## Source des données

Les guides sont fetched depuis **Wowhead** (`wowhead.com/guide/classes/<class>/<spec>`). Le scraping/parsing est fait côté serveur à la construction du site (build-time) ou via un endpoint API avec cache.

Les icônes et assets visuels des classes/specs sont récupérés via le CDN Blizzard officiel ou le CDN Wowhead (format `.jpg`/`.webp`).

## Contraintes techniques

- Utiliser un cache agressif pour limiter les requêtes vers Wowhead (délai 2s entre requêtes, TTL 7 jours)
- Le contenu des guides est reproduit fidèlement — aucune altération des informations de jeu (stats, rotation, talents). La valeur ajoutée de WoWSpec est visuelle et structurelle, pas éditoriale
- Les données doivent pouvoir être mises à jour facilement lors des patchs WoW (mise à jour manuelle ou automatisée via CI)
- Le site doit fonctionner en mode statique (SSG) pour la performance, avec possibilité d'ISR (Incremental Static Regeneration)

## Internationalisation

Le site est disponible en **anglais** et **français**. La langue est sélectionnable via un sélecteur à drapeaux dans la navbar.

- Langues supportées : `en` (défaut), `fr`
- Routing : `/en/...` et `/fr/...` — Next.js middleware redirige automatiquement selon la langue du navigateur au premier accès
- **Contenu des guides** : scrapé depuis `wowhead.com` (EN) et `fr.wowhead.com` (FR) — Wowhead propose une version française officielle
- **UI et labels** : traduits via des fichiers de messages (`messages/en.json`, `messages/fr.json`)
- Librairie : **next-intl**

## Stack envisagée

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Langage | TypeScript |
| i18n | next-intl |
| Scraping/Parsing | Cheerio + Axios (server-side) |
| Icônes UI | Lucide React |
| Animations | Framer Motion (légères) |
| Déploiement | Vercel |

## Périmètre v1

- [ ] Page d'accueil avec sélecteur de classe/spé
- [ ] Page de guide par spécialisation
- [ ] Sections : Stats, Talents, Rotation, Gear, Tips
- [ ] Fetching Wowhead EN + FR + parsing structuré
- [ ] Design system complet
- [ ] Responsive (desktop-first, mobile supporté)
- [ ] Recherche rapide par classe/spé
- [ ] Sélecteur de langue (drapeaux 🇬🇧 / 🇫🇷) dans la navbar

## Hors périmètre v1

- Comptes utilisateurs / favoris
- Comparateur de spés
- Simulateur DPS
- Tier list dynamique
- Contenu spécifique M+ / Raid / PvP (les guides couvrent le gameplay général)
