# PbN homepage

The Practice by Numbers marketing homepage. Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui and
framer-motion. The page is fully static (prerendered at build time).

## Scripts

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Dev server on http://localhost:3000                |
| `npm run build`        | Production build                                   |
| `npm start`            | Serve the production build                         |
| `npm run check`        | Type-check + lint + format check (run before a PR) |
| `npm run lint:fix`     | ESLint with autofix (incl. Tailwind class fixes)   |
| `npm run format`       | Prettier (also sorts Tailwind classes)             |

## Project structure

```
src/
  app/              layout, page, globals.css (all design tokens + animations)
  components/
    ui/             shadcn/ui primitives (button, dialog, sheet, accordion)
    common/         shared building blocks (Reveal, ProductAvatar, Orb, CheckList, ArrowLink)
    layout/         header (mega menu, dropdowns, mobile menu) and footer
    providers/      MotionProvider (LazyMotion + reduced-motion config)
    sections/       one folder per homepage section
  constants/        all copy, data, URLs and image imports — one file per section
  hooks/            useMediaQuery / usePrefersReducedMotion / useIsMobile, useTimeline
  icons/            Logo, AiSparkle, <Icon> (stroke paths in paths.ts)
  fonts/            Poppins via next/font
  utils/            small pure helpers (math, formatting)
  lib/utils.ts      cn()
  assets/images/    photos, testimonials, case studies, illustrations
  Avatars/          the nine 3D product avatars
```

## Conventions

- **Styling is Tailwind only.** No `style` props, except framer-motion `style` bound to MotionValues for scroll- or
  pointer-driven values.
- **No hard-coded colours, shadows or gradients in components.** Every one is a token or `@utility` in
  `src/app/globals.css`, used as a class (`bg-brand`, `text-ink-soft`, `shadow-card`, `bg-promo-bar`). Keyframe
  animations live there too (`animate-*`).
- **No copy, data, image paths or URLs in components.** They live in `src/constants/`. Per-item colours are stored
  there as complete Tailwind class strings so Tailwind can detect them.
- **Server Components by default.** `"use client"` only on interactive leaves.
- **Animations:** looping/decorative = CSS `animate-*`; interactive, sequenced or scroll-linked = framer-motion using
  the lightweight `m.*` components (the provider runs `LazyMotion` in strict mode, so `motion.*` throws).
- **Reduced motion:** use `usePrefersReducedMotion()` from `@/hooks` (hydration-safe) rather than framer's
  `useReducedMotion()` when it affects rendered markup.
- **Breakpoints are desktop-first:** `max-xl` (<1180), `max-lg` (<1000), `max-md` (<860), `max-sm` (<640),
  `max-xs` (<560).
- ESLint enforces canonical Tailwind classes and rejects unknown or conflicting ones; Prettier sorts classes.
