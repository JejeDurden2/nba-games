# NBA Who Am I?

## Quick Start

```bash
pnpm install
docker-compose up -d
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Architecture

- **Frontend**: React + Vite + Tailwind
- **Backend**: NestJS + DDD + Hexagonal Architecture
- **Database**: PostgreSQL + Prisma

## Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency.

### Auto-formatting and Auto-linting

#### VSCode (Recommended)

The project includes VSCode settings that automatically:

- Format files on save with Prettier
- Fix ESLint issues on save
- Auto-save files when focus changes
- Organize imports automatically

**Required Extensions:**

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

VSCode will prompt you to install these when you open the project.

#### Pre-commit Hooks

A pre-commit hook automatically runs on every commit to:

- Fix ESLint issues
- Format code with Prettier

This ensures all committed code meets quality standards.

### Manual Commands

```bash
# Check for linting issues
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check code formatting
pnpm format:check

# Format all files
pnpm format
```

### CI/CD

GitHub Actions automatically runs on every push and PR:

- Linting checks
- Format checks
- Tests
- Build verification

All checks must pass before merging.
