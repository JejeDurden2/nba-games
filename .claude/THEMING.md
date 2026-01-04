# Universe Theming Guide

Ce guide documente le système de theming multi-univers utilisé dans la plateforme "Who Am I?".

## Architecture du Theming

Le système utilise des **CSS Variables** définies au niveau du document (`document.documentElement`) qui sont mises à jour dynamiquement par le composant `UniverseTheme.tsx` lors du changement d'univers.

### Flux de données

```
UniverseConfig (shared/universe/universes/*.ts)
       ↓
UniverseContext (web/contexts/UniverseContext.tsx)
       ↓
UniverseTheme (web/components/ui/UniverseTheme.tsx)
       ↓
CSS Variables sur document.documentElement
       ↓
Composants (utilisent var(--universe-*))
```

## CSS Variables Disponibles

### Couleurs RGB (pour opacité Tailwind)

| Variable | Description | Exemple NBA | Exemple One Piece |
|----------|-------------|-------------|-------------------|
| `--universe-primary-rgb` | Couleur primaire d'alerte | `255 23 68` (rouge) | `220 38 38` (rouge foncé) |
| `--universe-secondary-rgb` | Couleur secondaire | `255 214 0` (or) | `234 179 8` (or) |
| `--universe-accent-rgb` | Couleur d'accent positive | `0 229 255` (cyan) | `59 130 246` (bleu océan) |

**Usage avec opacité Tailwind :**
```tsx
// Dans du JSX
style={{ color: 'rgb(var(--universe-primary-rgb) / 0.5)' }}

// Dans Tailwind (via classes custom dans tailwind.config.ts)
className="text-universe-primary bg-universe-accent/20"
```

### Gradients

| Variable | Description | Usage |
|----------|-------------|-------|
| `--universe-gradient-primary` | Gradient principal (boutons, titres) | `linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)` |
| `--universe-gradient-glow` | Couleur de glow (rgba) | `rgba(255, 56, 100, 0.4)` |

**Usage :**
```tsx
// Texte avec gradient
<span style={{
  backgroundImage: 'var(--universe-gradient-primary)',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}}>
  Titre
</span>

// Glow effect
style={{ filter: `drop-shadow(0 0 25px var(--universe-gradient-glow))` }}
```

### Backgrounds

| Variable | Description | Exemple NBA | Exemple One Piece |
|----------|-------------|-------------|-------------------|
| `--universe-bg-main` | Fond principal de la page | `#0A0A0F` (dark arena) | `#0A1628` (navy océan) |
| `--universe-bg-card` | Fond des cartes/surfaces | `#13131D` | `#0F1E32` |
| `--universe-bg-tint` | Tinte subtile pour variété | `rgba(255, 23, 68, 0.03)` | `rgba(0, 119, 182, 0.05)` |

**Usage :**
```tsx
// Background direct
style={{ backgroundColor: 'var(--universe-bg-main)' }}

// Background semi-transparent (glassmorphism)
style={{ backgroundColor: 'color-mix(in srgb, var(--universe-bg-card) 80%, transparent)' }}
```

## Classes Tailwind Custom

Les classes suivantes sont définies dans `tailwind.config.ts` :

```tsx
// Couleurs avec opacité
className="text-universe-primary"      // rgb(var(--universe-primary-rgb))
className="bg-universe-primary/20"     // avec 20% opacité
className="border-universe-accent"

// Backgrounds
className="bg-universe-bg-main"
className="bg-universe-bg-card"
```

## Modifier le thème d'un univers

### 1. Modifier les couleurs

**Fichier :** `packages/shared/src/universe/universes/[universe].ts`

```typescript
export const myUniverse: UniverseConfig = {
  // ...
  colors: {
    primary: '#FF1744',    // Hex - converti en RGB automatiquement
    secondary: '#FFD600',
    accent: '#00E5FF',

    gradients: {
      primary: 'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)',
      glow: 'rgba(255, 56, 100, 0.4)',
    },

    backgrounds: {
      main: '#0A0A0F',
      card: '#13131D',
      tint: 'rgba(255, 23, 68, 0.03)',
    },
  },
};
```

### 2. Couleurs par défaut

Si `colors` n'est pas défini, les valeurs par défaut (NBA) sont utilisées :

**Fichier :** `apps/web/src/components/ui/UniverseTheme.tsx`

```typescript
const DEFAULT_COLORS = {
  primary: '#FF1744',
  secondary: '#FFD600',
  accent: '#00E5FF',
};

const DEFAULT_GRADIENTS = {
  primary: 'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)',
  glow: 'rgba(255, 56, 100, 0.4)',
};

const DEFAULT_BACKGROUNDS = {
  main: '#0A0A0F',
  card: '#13131D',
  tint: 'rgba(255, 23, 68, 0.03)',
};
```

## Composants Universe-Aware

### Logo

Le composant `Logo` utilise les CSS variables pour adapter automatiquement ses couleurs :

```tsx
import { Logo } from '@/components/ui/Logo';

// Le logo s'adapte automatiquement à l'univers actif
<Logo className="w-32 h-32" />
```

**Variables utilisées :**
- `--universe-primary-rgb` → Bord de la carte (gradient)
- `--universe-secondary-rgb` → Fin du gradient
- `--universe-bg-card` → Fond intérieur
- `--universe-bg-main` → Bande inférieure

### BackgroundEffects

Les effets de fond (glows, vignettes) s'adaptent automatiquement :

```tsx
<BackgroundEffects isPlaying={true} potentialScore={750} />
```

**Variables utilisées :**
- `--universe-bg-tint` → Glow au repos
- `--universe-primary-rgb` → Glow urgence
- `--universe-secondary-rgb` → Glow avertissement
- `--universe-accent-rgb` → Glow positif
- `--universe-bg-main` → Vignette

### Card

```tsx
<Card className="p-6">
  {/* Fond semi-transparent avec universe-bg-card */}
</Card>
```

### Button

Les boutons utilisent `--universe-gradient-primary` et `--universe-gradient-glow` pour le variant `gradient`.

## Ajouter un nouvel élément thémé

### 1. Identifier la variable appropriée

| Besoin | Variable à utiliser |
|--------|---------------------|
| Couleur d'erreur/danger | `--universe-primary-rgb` |
| Couleur d'avertissement | `--universe-secondary-rgb` |
| Couleur de succès/positif | `--universe-accent-rgb` |
| Effet lumineux | `--universe-gradient-glow` |
| Fond de surface | `--universe-bg-card` |
| Fond de page | `--universe-bg-main` |
| Tinte légère | `--universe-bg-tint` |

### 2. Implémenter dans le composant

```tsx
// Option A : Style inline
<div style={{
  backgroundColor: 'rgb(var(--universe-primary-rgb) / 0.2)',
  border: '1px solid rgb(var(--universe-primary-rgb) / 0.4)'
}}>

// Option B : Classes Tailwind (si définies dans config)
<div className="bg-universe-primary/20 border-universe-primary/40">

// Option C : Pour les gradients (style inline obligatoire)
<span style={{
  backgroundImage: 'var(--universe-gradient-primary)',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}}>
```

### 3. Tester dans les deux univers

```bash
# Vérifier visuellement
pnpm dev
# Ouvrir http://localhost:5173/nba
# Ouvrir http://localhost:5173/one-piece
```

## Migration d'un composant hardcodé

### Avant (hardcodé NBA)

```tsx
<div className="bg-gradient-fire text-ball-500">
  <span className="bg-ball-400/20">
```

### Après (universe-aware)

```tsx
<div
  className="text-universe-primary"
  style={{ backgroundImage: 'var(--universe-gradient-primary)' }}
>
  <span className="bg-universe-primary/20">
```

## Debugging

### Vérifier les CSS Variables

Dans la console du navigateur :

```javascript
// Voir toutes les variables universe
const styles = getComputedStyle(document.documentElement);
console.log({
  primary: styles.getPropertyValue('--universe-primary-rgb'),
  secondary: styles.getPropertyValue('--universe-secondary-rgb'),
  accent: styles.getPropertyValue('--universe-accent-rgb'),
  bgMain: styles.getPropertyValue('--universe-bg-main'),
  bgCard: styles.getPropertyValue('--universe-bg-card'),
  gradientPrimary: styles.getPropertyValue('--universe-gradient-primary'),
});
```

### Forcer un univers pour tester

```typescript
// Dans un composant de test
import { getUniverse } from '@nba-who-am-i/shared';

const onePiece = getUniverse('one-piece');
console.log(onePiece.colors);
```

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `packages/shared/src/universe/types.ts` | Interfaces `ColorOverrides`, `BackgroundOverrides`, `GradientOverrides` |
| `packages/shared/src/universe/universes/*.ts` | Configurations par univers |
| `apps/web/src/components/ui/UniverseTheme.tsx` | Applique les CSS variables |
| `apps/web/src/index.css` | Valeurs par défaut des CSS variables |
| `apps/web/tailwind.config.ts` | Classes Tailwind custom (universe-*) |
| `apps/web/src/components/ui/Logo.tsx` | Logo SVG universe-aware |
