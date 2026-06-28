# Next Task: Commit 4

## Objective

Create working backend skeleton.

After this commit, developer can:
- Clone repository
- Run `pnpm install`
- Start HTTP server
- See it working

## Deliverables

### 1. Package Configuration

```
packages/
├─ tsconfig/
│  └─ package.json, tsconfig.json
├─ eslint-config/
│  └─ package.json, config
├─ shared/
│  └─ package.json
├─ types/
│  └─ package.json
└─ contracts/
   └─ package.json
```

### 2. Root Configuration

```
pnpm-workspace.yaml
package.json (dependencies)
tsconfig.json (base)
.eslintrc.json
prettier.config.js
```

### 3. Backend Structure

```
backend/
├─ main.ts (Fastify bootstrap)
├─ bootstrap.ts (DI container)
├─ package.json
├─ platform/
│  ├─ README.md
│  └─ index.ts
├─ shared/
│  ├─ README.md
│  └─ index.ts
└─ adapters/
   ├─ README.md
   └─ index.ts
```

### 4. Apps Structure

```
apps/
├─ telegram-miniapp/
│  ├─ package.json
│  └─ README.md
└─ web/
   ├─ package.json
   └─ README.md
```

### 5. README Files

Each folder explains:
- Why it exists
- Who owns it
- Who depends on it
- Who must not depend on it

## Success Criteria

✅ Repository structure correct
✅ All READMEs exist
✅ Backend starts without errors
✅ Package dependencies resolve
✅ TypeScript compiles
✅ Developer can understand in 30 minutes

## After This

STOP. Request architecture review.
Wait for approval before Sprint 1.
