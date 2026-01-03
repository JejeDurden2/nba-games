# Who Am I? - Multi-Universe Quiz Platform

## Overview

Plateforme de quiz multi-univers supportant différents thèmes (NBA, One Piece, etc.) avec gameplay partagé et contenu spécifique par univers.

**Univers disponibles :**
- **NBA** (`/nba`) : 226 personnages (joueurs, légendes, coachs, dirigeants)
- **One Piece** (`/one-piece`) : 140 personnages (pirates, marines, révolutionnaires, civils)

## Architecture

Monorepo pnpm avec architecture hexagonale et DDD strict.

```
apps/
  api/          # NestJS backend
  web/          # React frontend
packages/
  shared/       # Types, DTOs, Universe configs
  eslint-config/
  tsconfig/
```

### Backend (apps/api) - Hexagonal Architecture

```
src/
  core/
    domain/           # Entités, Value Objects, Domain Services (ZERO dépendance externe)
    application/      # Use Cases, Ports (interfaces), DTOs
  infrastructure/
    adapters/         # Repositories Prisma, external APIs
    controllers/      # NestJS Controllers (entry points)
    prisma/           # Schema, migrations
```

**Règles DDD strictes :**
- `domain/` n'importe JAMAIS depuis `infrastructure/` ou `@nestjs/*`
- Les Use Cases orchestrent, le Domain contient la logique métier
- Les Repositories implémentent les Ports définis dans `application/ports/`
- Injection via tokens NestJS : `@Inject('CharacterRepository')`

### Frontend (apps/web) - Component-Based Architecture

Architecture inspirée des patterns Next.js avec séparation claire des responsabilités.
**UI Components** : Utilise **shadcn/ui** avec `class-variance-authority` pour les variants.

```
src/
  components/
    screens/          # Composants full-page (MenuScreen, PlayingScreen, WonScreen, GameOverScreen)
    game/             # Composants spécifiques au jeu (Timer, GuessInput, AchievementBadge, ShareCard)
    ui/               # shadcn/ui components customisés (Button, Card, Input, Leaderboard)
  contexts/
    UniverseContext.tsx  # Provider et hooks pour l'univers actif
  hooks/              # Custom hooks (useGame, useMediaQuery)
  lib/
    utils.ts          # shadcn cn() utility (clsx + tailwind-merge)
    design-system/    # Design tokens (tokens.ts) - couleurs, gradients, breakpoints
    universe/         # Détection d'univers, interpolation de textes
    share-utils.ts    # Utilitaires de partage social
  api/                # Client API REST
```

**Path Alias** : Utiliser `@/` pour tous les imports (ex: `import { Button } from '@/components/ui/Button'`)

**Principes d'architecture :**
- **Composants Screens** : Orchestration, pas de logique métier, composition de composants
- **Composants Game** : Spécifiques au domaine, réutilisables dans les screens
- **Composants UI** : Primitives génériques, aucune logique métier
- **Hooks** : Encapsulation de la logique d'état et des effets
- **Design System** : Tokens centralisés (couleurs, gradients, breakpoints), Tailwind CSS

**Hiérarchie des composants :**
1. **App.tsx** (≈150 lignes) : Router de l'état du jeu, gestion du focus
2. **Screens** (60-120 lignes) : Composition de composants, props drilling minimal
3. **Game components** (40-80 lignes) : Logique spécifique, props typées
4. **UI components** (40-100 lignes) : Primitives réutilisables, variants

**Design Tokens (tokens.ts) :**
- Colors : ball, rim, nba, dark, accent
- Gradients : fire, ocean, gold, purple, green, achievementGradients (5 niveaux)
- Breakpoints : mobile (640px), tablet (768px), desktop (1024px)
- Character type configs : gradient, glow, label, emoji par type

## Conventions de code

### Naming

**Backend :**
- Entités : `character.entity.ts` → `Character`
- Value Objects : `score.value-object.ts` → `Score`
- Use Cases : `start-game.use-case.ts` → `StartGameUseCase`
- Ports : `character.repository.port.ts` → `ICharacterRepository`
- Adapters : `prisma-character.repository.ts` → `PrismaCharacterRepository`

**Frontend :**
- Screens : `MenuScreen.tsx`, `PlayingScreen.tsx`, `GameOverScreen.tsx`
- Game components : `Timer.tsx`, `GuessInput.tsx`, `AchievementBadge.tsx`
- UI components : `Button.tsx`, `Card.tsx`, `Leaderboard.tsx`
- Hooks : `useGame.ts`, `useMediaQuery.ts`
- Utils : `share-utils.ts`, `fuzzy-match.ts`

### TypeScript
- `strict: true` obligatoire
- Pas de `any`, utiliser `unknown` si nécessaire
- Préférer les types explicites aux inférences complexes
- Zod pour la validation runtime des DTOs

### Tests
- Unit tests : domain et use cases (Jest)
- Integration tests : repositories avec test container
- E2E : Playwright pour le frontend

## Commands

```bash
pnpm dev              # Start all apps
pnpm build            # Build all
pnpm test             # Run tests
pnpm lint             # ESLint + Prettier check
pnpm db:migrate       # Prisma migrations
pnpm db:seed          # Seed database (default: nba)

# Universe-specific seeding
pnpm db:seed:nba        # Seed NBA characters only
pnpm db:seed:one-piece  # Seed One Piece characters only
pnpm db:seed:all        # Seed all universes
```

## Patterns à suivre

### Use Case pattern
```typescript
@Injectable()
export class StartGameUseCase {
  constructor(
    @Inject('CharacterRepository')
    private readonly characterRepo: ICharacterRepository,
  ) {}

  async execute(dto: StartGameDto): Promise<GameSession> {
    const character = await this.characterRepo.getRandom(dto.excludeIds);
    return GameSession.create(character);
  }
}
```

### Entity avec Value Objects
```typescript
export class Character {
  private constructor(
    public readonly id: CharacterId,
    public readonly name: PlayerName,
    public readonly hints: Hint[],
  ) {}

  static create(props: CharacterProps): Character {
    return new Character(
      CharacterId.create(props.id),
      PlayerName.create(props.name),
      props.hints.map(Hint.create),
    );
  }
}
```

### React component pattern
```typescript
// Ordre strict : props interface → component → hooks → handlers → render
export interface GameCardProps {
  character: GameCharacter;
  onGuess: (guess: string) => void;
}

export function GameCard({ character, onGuess }: GameCardProps) {
  // 1. Hooks (state, effects, custom hooks)
  const [guess, setGuess] = useState('');
  const isMobile = useIsMobile();

  // 2. Handlers
  const handleSubmit = () => {
    onGuess(guess);
    setGuess('');
  };

  // 3. Render avec Tailwind classes
  return (
    <Card className={cn('p-6', isMobile && 'p-4')}>
      {/* JSX */}
    </Card>
  );
}
```

### Design System - shadcn/ui + Tailwind CSS

**shadcn/ui Components** (dans `src/components/ui/`) :
- `Button` : Variants `primary`, `secondary`, `danger`, `ghost`, `link` + props `gradient`/`glow` pour custom styles
- `Card` : Glassmorphism style (`bg-dark-800/80 backdrop-blur-xl rounded-3xl`)
- `Input` : States `default`, `error`, `success` avec animations

**Ajouter un nouveau composant shadcn :**
```bash
pnpm dlx shadcn@latest add [component-name]
```
Puis customiser dans `src/components/ui/` pour matcher le design system NBA.

**Utilisation des tokens :**
```typescript
import { cn } from '@/lib/utils';
import { achievementLevelConfig } from '@/lib/design-system/tokens';

const config = achievementLevelConfig[level];
const gradient = unlocked ? config.gradient : config.locked;

<div
  className={cn('rounded-full', isMobile ? 'w-16 h-16' : 'w-20 h-20')}
  style={{ background: gradient, boxShadow: config.glow }}
>
```

**Responsive Design :**
- Mobile-first : classes de base pour mobile
- Breakpoints conditionnels : `isMobile ? 'text-sm' : 'text-base'`
- Utiliser `useIsMobile()` plutôt que media queries CSS

## Database Migration Pattern - Expand-Contract

**⚠️ CRITICAL: NEVER delete data or remove columns without explicit user approval.**

Toujours utiliser le pattern **Expand-Contract** pour les migrations de schéma en production :

### Phase 1: Expand (Ajouter)
1. Ajouter les nouvelles colonnes/tables avec des valeurs par défaut ou nullable
2. Déployer le code qui écrit dans les anciennes ET nouvelles structures
3. Migrer les données existantes (backfill)

### Phase 2: Contract (Retirer) - UNIQUEMENT sur demande explicite
1. ❌ **NE JAMAIS** supprimer de colonnes/tables sans approbation explicite
2. ❌ **NE JAMAIS** utiliser `--force-reset` ou `--accept-data-loss` en production
3. ✅ Si demandé explicitement, déprécier d'abord (renommer en `_deprecated_*`)
4. ✅ Attendre plusieurs déploiements avant suppression définitive

### Exemple: Ajouter sessionId
```prisma
// ✅ CORRECT - Expand phase
model LeaderboardEntry {
  id          String @id @default(uuid())
  sessionId   String @unique @default(uuid()) // Nouvelle colonne avec default
  playerName  String                           // Ancienne colonne conservée
  // ... autres champs
}
```

```prisma
// ❌ INCORRECT - Contract sans autorisation
model LeaderboardEntry {
  id          String @id @default(uuid())
  sessionId   String @unique @default(uuid())
  // playerName supprimé <- JAMAIS sans approbation !
}
```

### Commandes Prisma sécurisées
```bash
# ✅ Safe migrations
pnpm prisma migrate dev      # Développement local uniquement
pnpm prisma db push          # Push schema sans supprimer données
pnpm prisma migrate deploy   # Production (si migrations configurées)

# ❌ DANGEROUS - Requiert approbation explicite
pnpm prisma db push --force-reset        # Supprime TOUTES les données
pnpm prisma db push --accept-data-loss   # Peut perdre des données
pnpm prisma migrate reset                # Reset complet
```

## Don'ts

**Backend :**
- ❌ Logique métier dans les controllers
- ❌ Import Prisma dans le domain
- ❌ `any` type
- ❌ Mutations directes d'état (use immutable patterns)
- ❌ Dépendances circulaires entre features
- ❌ **Supprimer des colonnes/données sans approbation explicite**
- ❌ **Utiliser --force-reset ou --accept-data-loss sans confirmation**

**Frontend :**
- ❌ Logique métier dans les composants (utiliser des hooks)
- ❌ Styles inline (utiliser Tailwind + design tokens)
- ❌ Composants > 150 lignes (refactoriser en sous-composants)
- ❌ Props drilling excessif (utiliser composition ou context si nécessaire)
- ❌ `any` type (TypeScript strict mode)
- ❌ Créer de nouveaux fichiers sans justification (préférer éditer l'existant)

## Patterns Frontend Avancés

### State Management
- **useGame hook** : Source unique de vérité pour l'état du jeu
- État local (useState) pour l'UI éphémère
- Refs (useRef) pour les timers et valeurs non-reactives
- Pas de Redux/Zustand nécessaire pour cette app

### Performance
- Prefetching : Charger le prochain personnage pendant l'écran de victoire
- Optimistic UI : Afficher le résultat avant la réponse API
- useCallback pour les handlers passés en props
- Éviter le re-render inutile : React.memo si nécessaire

### Accessibilité & UX
- Auto-focus sur l'input pendant le jeu (useEffect + inputRef)
- Animations subtiles (Tailwind animate-pulse, animate-shake)
- Feedback visuel immédiat (wrong guess shake, success animations)
- Mobile-first responsive design

### Gamification Features
- Système d'achievements (5 niveaux de badges)
- Percentile ranking (comparaison sociale)
- Social sharing (Web Share API + fallbacks)
- Encouraging messages (messages personnalisés par performance)

## Multi-Universe System

### Architecture

Le système multi-univers permet de créer des thèmes de quiz différents tout en partageant :
- **Partagé** : Gameplay, UI, API structure, domain logic
- **Spécifique** : Personnages, wording (français), types de personnages, couleurs optionnelles

### Structure des fichiers

```
packages/shared/src/universe/
  types.ts              # Interfaces UniverseConfig, UniverseWording, etc.
  defaults.ts           # Couleurs et gradients par défaut
  index.ts              # Registry et fonctions utilitaires
  universes/
    nba.ts              # Config NBA (226 personnages)
    one-piece.ts        # Config One Piece (140 personnages)

apps/api/prisma/
  seed.ts               # Entry point avec CLI args (--universe=nba|one-piece|all)
  seeds/
    types.ts            # Interface CharacterSeed
    one-piece/index.ts  # Données des personnages One Piece

apps/web/src/
  contexts/UniverseContext.tsx  # Provider React
  lib/universe/
    detect-universe.ts  # Détection via URL path
    interpolate.ts      # Interpolation {playerName}, {percentile}, etc.
```

### Routing

- `/` → Redirect vers `/nba` (défaut)
- `/nba/*` → Univers NBA
- `/one-piece/*` → Univers One Piece
- `?universe=xxx` → Fallback query param

### Hooks disponibles

```typescript
import { useUniverse, useWording, useUniverseId, useCharacterTypes } from '@/contexts/UniverseContext';

// Dans un composant
const universe = useUniverse();           // Config complète
const wording = useWording();             // Textes traduits
const universeId = useUniverseId();       // 'nba' | 'one-piece'
const characterTypes = useCharacterTypes(); // Types avec gradient/emoji
```

### Interpolation de textes

```typescript
import { interpolate } from '@/lib/universe';

// Template: "Bravo {playerName} ! Tu es dans le top {percentile}%"
const message = interpolate(wording.encouragingMessages.top90, {
  playerName: 'John',
  percentile: 85
});
// → "Bravo John ! Tu es dans le top 85%"
```

### Ajouter un nouvel univers

1. Créer `packages/shared/src/universe/universes/[universe].ts` avec la config complète
2. Enregistrer dans `packages/shared/src/universe/index.ts`
3. Créer `apps/api/prisma/seeds/[universe]/index.ts` avec les personnages
4. Importer et ajouter dans `apps/api/prisma/seed.ts` → `universeSeeds`
5. Ajouter le script npm dans `apps/api/package.json`

### Types de personnages par univers

**NBA** : `player`, `legend`, `coach`, `executive`
**One Piece** : `pirate`, `marine`, `revolutionary`, `shichibukai`, `yonko`, `civilian`

### Database Schema

```prisma
model Character {
  name       String
  universe   String   @default("nba")
  // ...
  @@unique([name, universe], name: "name_universe")  // Même nom possible dans différents univers
  @@index([universe])
  @@index([universe, difficulty])
}

model LeaderboardEntry {
  universe   String   @default("nba")
  // Leaderboards séparés par univers
  @@index([universe, score(sort: Desc)])
}
```
