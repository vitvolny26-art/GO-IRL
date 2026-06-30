# Contributing to GO IRL

## Development Manifesto

See [docs/adr/0000-why-go-irl-exists.md](docs/adr/0000-why-go-irl-exists.md).

## Getting Started

1. Clone the repository
2. Follow setup instructions in `scripts/`
3. Read [docs/01-VISION.md](docs/01-VISION.md)

## Development Rules

1. **Shipping beats perfection**
2. **Real users beat opinions**
3. **One finished feature > ten unfinished ideas**
4. **Every sprint produces visible value**
5. **Measure reality, don't assume**

## GO IRL Contribution Rule

**Every Pull Request must answer one question:**

> **What can the user do after this PR that they could not do before?**

If the answer is unclear, the PR should be reconsidered.

**User value comes before implementation details.**

## Pull Request Process

1. Create feature branch from `develop`
2. Make changes
3. Answer: "What new capability does the user have?"
4. Ensure tests pass
5. Submit PR with description
6. Address review feedback
7. Merge to `develop`

## PR Naming Convention

Name PRs by user capability, not technical implementation:

✅ **Good:**
- `feat: user can join first activity`
- `feat: organizer can create activity`
- `feat: participant can open activity chat`

❌ **Bad:**
- `feat: add login button`
- `feat: refactor auth service`
- `feat: implement websocket`

## Questions?

Open an issue or check existing documentation.
