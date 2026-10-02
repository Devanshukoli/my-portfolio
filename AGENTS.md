# AGENTS.md

Guidance for agents working in this repository.

## Snapshot

Personal site for Devanshu Koli. Astro static site plus a Vercel function for contact mail. Hiring artifact for AI-engineering roles. Home for debugging postmortems.

Do not invent facts. Unknown copy stays `TODO(devanshu): ...`. Numbers, employers, titles, and dates from the Vue site live in `CONTENT_TODO.md` as VERIFY rows until the owner confirms or deletes them.

## Read first

- `CONTENT_TODO.md`
- `package.json`
- `astro.config.ts`
- `src/content.config.ts`
- `api/contact.ts`

## Commands

- `npm run dev` starts Astro.
- `npm run build` typechecks and writes `dist`.
- `npm run preview` serves `dist`.
- `npm test` runs Vitest (`parseContactInput`).
- `npm run check:tokens` fails if hex, font family names, rem, or px appear outside `src/styles/tokens.css` and `src/styles/fonts.css`.
- Contact mail on Vercel needs `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM`. Local `astro preview` does not run `api/`. Use `vercel dev` when you need the function.

## Layout

- Pages live in `src/pages`.
- Posts live in `src/content/blog` and are parsed at build time.
- Tokens live in `src/styles/tokens.css`.
- Contact parse lives in `src/lib/contact.ts`. The HTTP handler is `api/contact.ts`.
- The Vue SPA is on tag `legacy-v1` and branch `legacy`. Do not restore it on `main`.

## Rules

- No em dashes in site copy, README, or comments.
- Banned UI includes gradients, glass, glow, shadows, cards, emoji, progress bars, hire-me pills, stat rows, and hover scale.
- Banned copy includes passionate, crafting, Welcome, and the rest of the rebuild brief.
- Light theme by default. Dark via toggle and `prefers-color-scheme`. Theme boot script stays in `src/layouts/Base.astro` so the first paint matches.

## Legacy

Storybook, Express `server.js`, and the unwired Vue tests were removed in the Astro foundation. Vitest stays because it covers `parseContactInput` at the mail boundary.
