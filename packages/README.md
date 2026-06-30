# Shared Libraries

Reusable packages across GO IRL.

## Packages

- `tsconfig/` — TypeScript configuration
- `eslint-config/` — ESLint configuration
- `types/` — Shared TypeScript types
- `contracts/` — API contracts
- `shared/` — Utility functions

## Adding a New Package

```bash
mkdir packages/my-package
cd packages/my-package
touch package.json
```

Each package:
- Has its own `package.json`
- Exports through `index.ts`
- Declares dependencies explicitly
- Is independently testable

## Who This Serves?

Backend and all apps.
