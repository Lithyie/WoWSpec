# WoWSpec — Instructions pour Claude Code

## Vue d'ensemble du projet

Site de guides pour les spécialisations de World of Warcraft. Next.js 15 + TypeScript + Tailwind CSS v4. Les guides sont scrapés depuis Wowhead et mis en cache en JSON.

## Fichiers de référence

Lire ces fichiers avant de coder :
- `context.md` — vision, modèle de données, stack, périmètre
- `plan.md` — architecture, phases d'implémentation, décisions techniques
- `design_system.md` — couleurs, typographie, composants, patterns
- `scraping_strategy.md` — URLs Wowhead, parsing, cache, fallback

## Conventions de code

- **Langage** : TypeScript strict, pas de `any`
- **Composants** : Server Components par défaut, `'use client'` seulement si nécessaire
- **Styling** : Tailwind CSS uniquement, pas de CSS inline sauf pour les couleurs de classe dynamiques
- **Imports** : `@/` alias pour `src/` (ou racine selon config)
- **Nommage** : PascalCase pour les composants, camelCase pour les fonctions/variables, kebab-case pour les fichiers
- **Commentaires** : uniquement si le WHY n'est pas évident — pas de JSDoc systématique

## Données statiques importantes

Les 13 classes WoW et leurs couleurs officielles sont dans `lib/data/classes.ts`.
Les couleurs de classe doivent être appliquées via des styles inline (`style={{ borderColor: cls.color }}`) car Tailwind ne peut pas générer dynamiquement des classes arbitraires.

## Internationalisation (next-intl)

- Locales supportées : `en` (défaut) et `fr`
- Toutes les routes sont préfixées par `[locale]` : `app/[locale]/...`
- Les textes UI sont dans `messages/en.json` et `messages/fr.json` — utiliser `useTranslations()` dans les composants
- Les noms de classes et specs restent en anglais (noms officiels Blizzard) dans les deux locales
- Le composant `LocaleSwitcher` dans la navbar utilise `useRouter` + `usePathname` de next-intl pour switcher la locale sans changer la page

## Scraping

- Le scraper tourne côté serveur uniquement (jamais dans le browser)
- Sources : `wowhead.com` (EN) et `fr.wowhead.com` (FR)
- Les guides sont mis en cache dans `content/guides/en/<class>-<spec>.json` et `content/guides/fr/<class>-<spec>.json`
- En cas d'échec de parsing, toujours afficher le lien Wowhead source plutôt qu'une erreur
- Délai minimum 2s entre les requêtes Wowhead

## Design

- Dark theme exclusivement — jamais de fond blanc/clair
- Couleurs d'accent : gold (`#C89B3C`) pour les highlights WoW, couleur de classe pour les accents spécifiques
- Animations légères uniquement (200-300ms, pas d'animations complexes)
- Police Cinzel pour les titres de page, Inter pour tout le reste

## Ce qu'on ne fait pas en v1

- Pas de comptes utilisateurs
- Pas de données en temps réel (pas de Raider.IO, pas d'armory Blizzard)
- Pas de simulateur, pas de tier list
- Pas de contenu M+ / Raid spécifique dans les guides
