# WoWSpec — Stratégie de scraping Wowhead

## URLs cibles

Les guides de classes sur Wowhead suivent ce pattern :
```
https://www.wowhead.com/guide/classes/<class>/<spec>-<role>-overview
```

Exemples :
```
https://www.wowhead.com/guide/classes/paladin/retribution-dps-overview
https://www.wowhead.com/guide/classes/paladin/holy-healer-overview
https://www.wowhead.com/guide/classes/warrior/protection-tank-overview
https://www.wowhead.com/guide/classes/mage/fire-dps-overview
```

## Structure HTML Wowhead

Les guides Wowhead sont des pages dynamiques avec du contenu rendu côté serveur dans un `<div class="guide-body">`. Les sections sont structurées par des `<h2>` ou `<h3>` avec des IDs standardisés.

### Sections clés à extraire

| Section | Sélecteur probable | Contenu à parser |
|---|---|---|
| Introduction | `#introduction`, premier `<p>` | Résumé de la spé |
| Strengths/Weaknesses | `#strengths-and-weaknesses`, `.guide-checklist` | Listes `<ul>` + / - |
| Stat Priority | `#stat-priority` | Ordre des stats dans les `<ol>` |
| Talents | `#talents` | Import string, description des choix |
| Rotation | `#rotation`, `#abilities` | Listes d'sorts avec conditions |
| Gear / BIS | `#best-in-slot`, `#gear` | Tableaux d'items |
| Tips | `#tips-and-tricks` | Liste de tips |

> **Note** : La structure exacte doit être vérifiée et ajustée lors du développement. Wowhead peut varier selon les classes.

## Approche technique

### Fetch avec headers browser

Wowhead filtre les bots via User-Agent. Utiliser des headers réalistes :

```typescript
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
}
```

### Parsing avec Cheerio

```typescript
import * as cheerio from 'cheerio'

async function parseWowheadGuide(html: string): Promise<Partial<Guide>> {
  const $ = cheerio.load(html)
  
  return {
    summary: extractSummary($),
    strengths: extractList($, '.guide-checklist.positive'),
    weaknesses: extractList($, '.guide-checklist.negative'),
    statPriority: extractStatPriority($),
    rotation: extractRotation($),
    tips: extractTips($),
  }
}
```

### Système de cache

```
content/
└── guides/
    ├── paladin-retribution.json
    ├── paladin-holy.json
    ├── warrior-protection.json
    └── ...
```

Chaque fichier JSON contient :
```json
{
  "fetchedAt": "2026-04-28T10:00:00Z",
  "patchVersion": "11.1",
  "sourceUrl": "https://www.wowhead.com/...",
  "data": { ... }
}
```

**TTL recommandé** : 7 jours en production, invalidation manuelle lors des patchs majeurs.

## Script de génération

```bash
# Fetch un guide spécifique
npx tsx scripts/fetch-guide.ts paladin retribution

# Fetch tous les guides (avec délai 2s entre chaque pour ne pas surcharger)
npx tsx scripts/fetch-all-guides.ts
```

## Fallback

Si le parsing échoue ou si la structure HTML a changé :
1. Logger l'erreur avec le sélecteur qui a échoué
2. Retourner les données partielles disponibles
3. Afficher sur la page un lien direct vers le guide Wowhead original
4. Marquer le guide comme `status: "partial"` dans le JSON de cache

## Considérations légales

Le site est **non-commercial, sans publicité, sans retour financier**. L'objectif est purement de rendre les guides Wowhead plus accessibles visuellement.

- Citer Wowhead comme source sur chaque page de guide avec un lien direct
- **Ne pas altérer le contenu des guides** : les informations (stats, rotation, talents) sont reproduites fidèlement. Modifier un guide de jeu peut induire les joueurs en erreur — l'exactitude prime.
- La valeur ajoutée de WoWSpec est **uniquement visuelle et structurelle** : on transforme du texte dense en composants visuels (barres de stats, listes d'icônes, tableaux), pas le contenu lui-même
- Pas de reproduction des images propriétaires Blizzard hors CDN public (icônes de sorts via `wow.zamimg.com`)
- Respecter un délai minimum de 2 secondes entre les requêtes pour ne pas surcharger les serveurs Wowhead
