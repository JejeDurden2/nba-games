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

### Frontend (apps/web)

```
src/
  features/       # Feature-based structure
  components/ui/  # Design system
  hooks/          # Custom hooks
  lib/            # Utils, API client
```

## Conventions de code

### Naming
- Entités : `character.entity.ts` → `Character`
- Value Objects : `score.value-object.ts` → `Score`
- Use Cases : `start-game.use-case.ts` → `StartGameUseCase`
- Ports : `character.repository.port.ts` → `ICharacterRepository`
- Adapters : `prisma-character.repository.ts` → `PrismaCharacterRepository`

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

### React component
```typescript
export const GameCard = ({ character, onGuess }: GameCardProps) => {
  const [guess, setGuess] = useState('');
  // Hooks first, then handlers, then render
};
```

## Don'ts

- ❌ Logique métier dans les controllers
- ❌ Import Prisma dans le domain
- ❌ `any` type
- ❌ Mutations directes d'état (use immutable patterns)
- ❌ Dépendances circulaires entre features
