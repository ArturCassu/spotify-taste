# Spotify Taste — Copilot Instructions

## Project Overview
Analisador de gosto musical usando a API do Spotify. PWA com Next.js, TypeScript e Tailwind CSS.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 (utility-first, no CSS modules)
- **PWA:** Serwist (service worker + manifest)
- **Auth:** Spotify OAuth 2.0 PKCE (client-side, no backend auth)
- **Deploy:** Vercel (auto-deploy from GitHub)

## Architecture
Feature-based architecture with clear separation:

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (token proxy)
│   ├── callback/          # OAuth callback page
│   ├── layout.tsx         # Root layout (Inter font, metadata)
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── ui/                # Reusable UI primitives (Card, ProgressBar, TabGroup...)
│   ├── sections/          # Feature sections (TopArtists, Genres, AudioProfile...)
│   └── layout/            # Layout components (Header, Footer)
├── lib/
│   └── spotify/           # Spotify integration layer
│       ├── types.ts       # All TypeScript types
│       ├── config.ts      # Constants and configuration
│       ├── pkce.ts        # PKCE crypto helpers
│       ├── auth.ts        # Authentication flow
│       ├── api.ts         # API client functions
│       └── analysis.ts    # Data analysis (pure functions)
└── sw.ts                  # Service Worker (Serwist)
```

## Coding Conventions

### TypeScript
- Strict mode always
- No `any` — use proper types or `unknown`
- Named exports only (no default exports except pages)
- Interfaces for component props, types for unions/primitives
- All functions must have explicit return types

### Components
- `'use client'` only when needed (state, effects, browser APIs)
- Props interface defined above the component
- Destructure props in function signature
- Use forwardRef for components that need ref forwarding
- Tailwind classes only — no inline styles, no CSS modules

### Styling (Tailwind)
- Dark theme: `bg-[#0A0A0A]`, `text-[#F0F0F5]`
- Spotify green: `#1DB954` for accents and CTAs
- Glassmorphic cards: `bg-white/[0.04] border-white/[0.06]`
- Mobile-first responsive design
- Use `clamp()` for fluid typography when needed

### State Management
- React `useState`/`useEffect` for local state
- `sessionStorage` for token
- `localStorage` for client ID and preferences
- No external state library needed (app is simple enough)

### File Naming
- Components: PascalCase exports (e.g., `TopArtistsSection`)
- Files: kebab-case (e.g., `top-artists-section.tsx`)
- Utilities: camelCase functions
- Types: PascalCase for interfaces/types

### API Integration
- All Spotify calls go through `src/lib/spotify/api.ts`
- Token exchange proxied via `/api/token` to avoid CORS
- Error handling: always catch and show user-friendly messages
- Use `Promise.all` for parallel requests

## PWA Requirements
- `manifest.json` in `/public` with proper icons
- Service worker via Serwist
- Offline fallback page
- Cache API responses for offline viewing

## Important Notes
- No backend — all auth is client-side PKCE
- User data never leaves the browser
- Audio features API may return `null` — always handle gracefully
- Time ranges: `short_term` (4 weeks), `medium_term` (6 months), `long_term` (all time)
- All UI text in Portuguese (pt-BR)
- The `/api/token` route is a thin proxy for Spotify's token endpoint (avoids CORS)
