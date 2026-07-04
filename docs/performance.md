# Performance and Code Splitting

GO IRL runs inside Telegram Mini App, so the first screen should appear quickly even on mobile networks.

## Bundle Strategy

The app uses two layers of splitting:

- `React.lazy()` + `Suspense` for the application shell and vertical UI.
- Vite/Rollup `manualChunks` for stable vendor and vertical chunks.

Current manual chunks:

- `vendor-react`: React, React DOM, React Query.
- `vendor-data`: Supabase client and Zustand.
- `vendor-icons`: Lucide icons.
- `vertical-sport`: Sport Vertical UI.

The entry bundle should stay very small and only bootstrap the app shell.

## Lazy Loading

`src/main.tsx` lazy-loads `src/App.tsx` behind a lightweight GO IRL fallback.

Sport-specific UI is lazy-loaded from `src/verticals/SportVertical.tsx`:

- `SportActivityCard`
- `SportActivitySheet`
- `SportCreateFields`

The generic experience remains in the main app fallback so non-sport events do not require the Sport chunk.

## Future Verticals

Every future vertical should follow the same pattern:

1. Keep shared types and metadata small.
2. Put vertical UI in `src/verticals/<VerticalName>Vertical.tsx`.
3. Load UI with `React.lazy()` at the point of use.
4. Add a named `manualChunks` rule only when the vertical grows enough to justify it.
5. Do not import vertical UI from `App.tsx` statically.

Target future chunks:

- `vertical-dating`
- `vertical-friends`
- `vertical-food`
- `vertical-travel`
- `vertical-culture`

## Render Guidance

- Keep the first screen mostly generic and fast.
- Use `useMemo` only for real repeated filtering/sorting work.
- Avoid global derived computations that scan all events on every keypress.
- Keep heavy AI, discovery, notification, and admin features out of the Mini App runtime until opened.
- Mini App does not poll in the background; server/n8n handles notifications and digest work.

## Bundle Targets

Preferred targets:

- Entry bundle: under 10 kB gzip.
- Largest route or vendor chunk: under 100 kB gzip.
- No single production JS chunk above 500 kB raw.

If a chunk exceeds the target, first check whether it is a real user-facing path. Split rarely used admin, vertical, and discovery code before adding dependencies.
