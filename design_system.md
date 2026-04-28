# WoWSpec — Design System

## Philosophie

**"Premium mais pédagogique."**

Le design de WoWSpec s'inspire de l'univers sombre et épique de World of Warcraft tout en restant lisible, moderne et aéré. On cherche le juste équilibre entre :
- L'atmosphère et l'immersion (dark mode, textures subtiles, couleurs de classe)
- La clarté pédagogique (typographie lisible, hiérarchie forte, espacement généreux)
- La légèreté visuelle (pas de surcharge, whitespace assumé, animations discrètes)

---

## Palette de couleurs

### Base (Dark theme)

| Token | Valeur | Usage |
|---|---|---|
| `bg-base` | `#0D0E12` | Fond général de la page |
| `bg-surface` | `#13151C` | Cards, panels, sidebars |
| `bg-elevated` | `#1C1F2A` | Elements en surélévation, hover states |
| `bg-border` | `#2A2D3A` | Bordures, séparateurs |
| `text-primary` | `#E8E9EF` | Texte principal |
| `text-secondary` | `#8B8FA8` | Texte secondaire, labels, captions |
| `text-muted` | `#555869` | Texte désactivé, placeholders |

### Accents

| Token | Valeur | Usage |
|---|---|---|
| `accent-gold` | `#C89B3C` | Couleur principale d'accentuation (WoW gold) |
| `accent-gold-light` | `#E8BE6C` | Hover sur gold, highlights |
| `accent-blue` | `#2A6FDB` | Liens, éléments interactifs |
| `accent-blue-light` | `#4A8FFF` | Hover sur blue |

### Rôles

| Token | Valeur | Usage |
|---|---|---|
| `role-tank` | `#4A90D9` | Badge Tank |
| `role-healer` | `#5BA85A` | Badge Healer |
| `role-melee` | `#D94A4A` | Badge Melee DPS |
| `role-ranged` | `#C89B3C` | Badge Ranged DPS |

### Feedback

| Token | Valeur | Usage |
|---|---|---|
| `success` | `#3D8B3D` | Confirmations, forces |
| `warning` | `#C89B3C` | Avertissements |
| `error` | `#8B3D3D` | Erreurs, faiblesses |
| `info` | `#2A6FDB` | Informations neutres |

### Couleurs de classe WoW (officiel Blizzard)
Utilisées comme couleur d'accent sur les cards et badges de classe.

```
--class-death-knight:  #C41E3A
--class-demon-hunter:  #A330C9
--class-druid:         #FF7C0A
--class-evoker:        #33937F
--class-hunter:        #AAD372
--class-mage:          #3FC7EB
--class-monk:          #00FF98
--class-paladin:       #F48CBA
--class-priest:        #FFFFFF
--class-rogue:         #FFF468
--class-shaman:        #0070DD
--class-warlock:       #8788EE
--class-warrior:       #C69B3A
```

---

## Typographie

### Familles de polices

| Usage | Police | Source |
|---|---|---|
| Titres principaux | **Cinzel** | Google Fonts — serif médiéval, évoque WoW |
| Titres de section | **Inter** (SemiBold 600) | Google Fonts — propre, lisible |
| Corps de texte | **Inter** (Regular 400) | Google Fonts |
| Code / valeurs numériques | **JetBrains Mono** | Google Fonts |

### Échelle typographique

| Token | Taille | Line-height | Poids | Usage |
|---|---|---|---|---|
| `text-hero` | 48px | 1.1 | 700 | Titre héro page d'accueil |
| `text-page-title` | 32px | 1.2 | 700 | Titre de page guide (Cinzel) |
| `text-section` | 22px | 1.3 | 600 | Titres de sections (Stats, Rotation…) |
| `text-subsection` | 17px | 1.4 | 600 | Sous-titres, noms de composants |
| `text-body` | 15px | 1.6 | 400 | Corps de texte, descriptions |
| `text-small` | 13px | 1.5 | 400 | Labels, captions, métadonnées |
| `text-micro` | 11px | 1.4 | 500 | Badges, tags |

---

## Espacements

Grille basée sur une unité de 4px.

| Token | Valeur | Usage typique |
|---|---|---|
| `space-1` | 4px | Micro-espacements internes |
| `space-2` | 8px | Padding de badges, gaps dans les listes |
| `space-3` | 12px | Padding interne des éléments compacts |
| `space-4` | 16px | Padding standard des cards |
| `space-5` | 20px | Espacement entre éléments proches |
| `space-6` | 24px | Spacing section dans un panel |
| `space-8` | 32px | Espacement entre sections majeures |
| `space-12` | 48px | Espacement entre blocs de page |
| `space-16` | 64px | Marges de section hero |

---

## Composants

### Card de classe (`ClassCard`)

```
┌─────────────────────────────┐
│ [ICONE 56x56]  Paladin      │  ← Couleur de classe en accent gauche (4px)
│                             │
│  Holy  •  Prot  •  Ret      │  ← Badges de spé en couleur de rôle
└─────────────────────────────┘
```

- Fond : `bg-surface`
- Bordure gauche : 4px solid `class-color`
- Hover : `bg-elevated`, légère translation Y (-2px), glow très subtil en couleur de classe
- Border radius : 8px
- Transition : 200ms ease

### Badge de rôle (`RoleBadge`)

```
[ ⚔ DPS ]   [ 🛡 Tank ]   [ + Healer ]
```

- Fond : `role-color` à 15% d'opacité
- Texte : `role-color`
- Border : 1px solid `role-color` à 30%
- Padding : 4px 10px
- Border radius : 4px
- Police : `text-micro`, weight 600, uppercase

### Section de guide (`GuideSection`)

```
┌─────────────────────────────────────────┐
│ ▸  STAT PRIORITY                        │  ← Titre avec accent gold
├─────────────────────────────────────────┤
│                                         │
│  Contenu de la section                  │
│                                         │
└─────────────────────────────────────────┘
```

- Titre : Cinzel ou Inter SemiBold, `text-section`, `accent-gold`
- Séparateur : 1px solid `bg-border`
- Fond : `bg-surface`
- Padding interne : 24px
- Border radius : 8px

### StatBar (`StatPriorityBar`)

```
  Haste      ████████████████████  1
  Mastery    ███████████████       2
  Crit       ████████████          3
  Vers.      ████████              4
```

- Barre de fond : `bg-elevated`
- Barre de remplissage : gradient `accent-gold` → `accent-gold-light`
- Hauteur : 8px, border-radius 4px
- Label : `text-small`, `text-secondary`
- Numéro priorité : `text-micro`, `accent-gold`, bold

### Liste de rotation (`RotationItem`)

```
┌───────────────────────────────────────────┐
│  [ICONE 32]  Tempête Sacrée               │
│              Si aura Divine Shield active  │  ← Condition en italique gris
└───────────────────────────────────────────┘
```

- Fond au hover : `bg-elevated`
- Icône : 32x32 avec border-radius 4px
- Condition : `text-small`, `text-muted`, italic

### Navigation de guide (tabs ou sidebar)

Desktop : sidebar sticky à gauche (200px), liste de sections avec indicateur de position actuelle.

```
│  > Stats Priority        ← Section active (gold, barre gauche)
│    Talents
│    Rotation
│    Gear
│    Tips
```

Mobile : tabs horizontaux scrollables en haut de la page.

---

## Iconographie et assets

### Icônes UI
- Librairie : **Lucide React** (icons de l'interface : chevrons, search, copy, check…)
- Taille standard : 16px (inline), 20px (boutons), 24px (actions principales)

### Icônes de sorts / classes WoW
- Source : CDN Wowhead `https://wow.zamimg.com/images/wow/icons/medium/<name>.jpg`
- Format : carré avec border-radius 4-6px
- Taille standard dans la rotation : 32px
- Taille dans les cards de classe : 48px

### Illustrations / Artwork
- Limité : on évite les fonds d'artwork pour ne pas alourdir la page
- Exception possible : hero image subtle en overlay très basse opacité sur la homepage

---

## États d'interaction

| État | Comportement |
|---|---|
| Hover sur card | Élévation légère (translateY -2px), bg → `bg-elevated`, transition 200ms |
| Focus (clavier) | Outline 2px `accent-blue`, offset 2px |
| Active/pressed | Scale 0.98, transition 100ms |
| Loading | Skeleton loader en `bg-elevated` avec shimmer animation |
| Empty state | Message centré avec icône Lucide, texte `text-secondary` |
| Error state | Icône d'alerte, texte court, lien vers source Wowhead |

---

## Animations

Principe : **subtiles et fonctionnelles**. Aucune animation pour "l'effet" pur.

| Animation | Durée | Easing | Usage |
|---|---|---|---|
| Fade-in page | 300ms | ease-out | Transition entre pages |
| Hover card | 200ms | ease | Élévation cards |
| Accordion open | 250ms | ease-in-out | Ouverture/fermeture sections |
| Shimmer skeleton | 1.5s | linear, loop | Chargement |
| Toast notification | 300ms in, 200ms out | ease | Feedback copier/coller |

---

## Responsive breakpoints

| Breakpoint | Largeur | Adaption principale |
|---|---|---|
| `sm` | 640px | Stack des cards de classe en 2 colonnes |
| `md` | 768px | Navigation guide en tabs (vs sidebar) |
| `lg` | 1024px | Layout principal (sidebar + contenu) |
| `xl` | 1280px | Largeur max du contenu (pas plus large) |

**Largeur max du contenu** : 1200px, centré.

---

## Patterns d'accessibilité

- **Contraste** : texte principal sur fond base ≥ 7:1 (WCAG AAA)
- **Focus visible** : toujours apparent, jamais supprimé
- **Labels** : tous les boutons icône ont un `aria-label`
- **Structure sémantique** : `<main>`, `<nav>`, `<section>`, `<article>` utilisés correctement
- **Alt text** : toutes les images ont un alt (icônes décoratives : `alt=""`)
- **Couleur seule** : jamais la seule façon de transmettre une information (toujours doublée par du texte ou une icône)

---

## Don'ts

- Ne pas utiliser plus de 2 couleurs de classes sur la même page (hormis la grille)
- Ne pas centrer le texte long (lisibilité)
- Ne pas utiliser de fond blanc ou très clair (rupture avec le dark theme)
- Ne pas animer chaque micro-interaction (fatigue visuelle)
- Ne pas dépasser 65 caractères par ligne pour le corps de texte (`max-w-prose`)
