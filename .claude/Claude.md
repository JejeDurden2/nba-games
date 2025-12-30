# NBA Who Am I? - Project Guidelines

## Architecture

Monorepo pnpm avec architecture hexagonale et DDD strict.

```
apps/
  api/          # NestJS backend
  web/          # React frontend
packages/
  shared/       # Types & DTOs partagés
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

Architecture inspirée des patterns Next.js avec séparation claire des responsabilités :

```
src/
  components/
    screens/          # Composants full-page (MenuScreen, PlayingScreen, WonScreen, GameOverScreen)
    game/             # Composants spécifiques au jeu (Timer, GuessInput, AchievementBadge, ShareCard)
    ui/               # Design system primitives (Button, Card, Leaderboard, BackgroundEffects)
  hooks/              # Custom hooks (useGame, useMediaQuery)
  lib/
    design-system/    # Design tokens et utilitaires (tokens.ts, utils.ts)
    api/              # API client
    utils/            # Utilitaires partagés (fuzzy-match, share-utils)
  api/                # Client API REST
```

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
pnpm db:seed          # Seed database
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

### Design System - Tailwind CSS

**Utilisation des tokens :**
```typescript
import { cn } from '../../lib/design-system/utils';
import { achievementLevelConfig } from '../../lib/design-system/tokens';

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
