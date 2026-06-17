# AGENTS.md

Guidance for AI agents working in this repository.

## Project Snapshot

This is Devanshu Koli's personal portfolio website. It is a Vue 3 single-page app built with Vite, with Storybook for component development and a small Express server for the contact form and markdown blog APIs.

The site presents Devanshu as a backend engineer. Current routed pages are Home, About, Projects, and Contact. The backend serves `/api/contact`, `/api/posts`, and `/api/posts/:slug`.

## First Files To Read

For fast orientation, read these before making changes:

- `skills/project-context/SKILL.md`
- `skills/project-context/project-metadata.md`
- `package.json`
- `vite.config.js`
- `src/router/index.js`
- `server.js`

## Common Commands

- `npm run dev` starts the Vite frontend on the default Vite port.
- `npm run server` starts the Express backend, defaulting to port `3001`.
- `npm run dev:all` runs frontend and backend together with `concurrently`.
- `npm run build` creates the production frontend build.
- `npm run preview` previews the production build.
- `npm run storybook` starts Storybook on port `6006`.
- `npm run build-storybook` creates a static Storybook build.

## Architecture Notes

- Frontend entry: `src/main.js`
- App shell: `src/App.vue`
- Router: `src/router/index.js`
- Shared layout: `src/components/Header.vue`, `src/components/Footer.vue`
- Theme toggle: `src/components/ThemeToggle.vue`, backed by `@vueuse/core`
- Global styles: `src/assets/style.css` and `src/assets/theme.css`
- Backend API: `server.js`
- Canonical blog content: `data/blog/*.md`

Vite has `@` aliased to `src`, exposes only env vars prefixed with `EMAILJS_`, and proxies `/api` to `http://localhost:3001` during development.

## Environment

The backend expects:

- `CONTACT_EMAIL`
- `CONTACT_EMAIL_PASS`
- `RECIPIENT_EMAIL`
- `ALLOWED_ORIGINS`, optional comma-separated allowlist
- `PORT`, optional backend port override

The frontend contact form currently references `process.env.VITE_API_URL`, which is not the normal Vite browser env API. Prefer `import.meta.env.VITE_API_URL` if you work on that path.

## Editing Rules

- Keep changes small and aligned with the existing Vue/Vite style.
- Prefer project-specific content over generic placeholder portfolio text.
- Use the existing CSS variable theme tokens where possible.
- Keep blog posts in `data/blog`; do not reintroduce duplicate blog sources under `src/blogs`.
- If adding routes, update both `src/router/index.js` and navigation/quick-link references.
- Do not commit `.env`, `node_modules`, `dist`, coverage, or generated Storybook output.

## Known Edges

- Home quick links reference `/blog` and `/tracker`, but those routes are not currently registered.
- `data/blog/README.md` mentions `BlogList.vue` and `BlogPost.vue`; those files are not present in the current app.
- The contact form test imports `@vue/test-utils`, but that dependency is not currently declared in `package.json`.
- `server.test.js` uses Jest/Supertest-style APIs, but the test dependencies and script are not fully wired in the current package metadata.

## Cleanup History

Unreferenced or boilerplate files were removed from the active project:

- Root `blog.js`, which was empty.
- Duplicate `src/blogs/understanding-modern-javascript.md`; `data/blog` is canonical.
- `utils/markdown.js`, which was unused and pointed to `/content/blog`.
- Unrouted stale views `src/view/ServiceView.vue` and `src/view/IntroductionView.vue`.
- Default Storybook tutorial files under `src/stories`.

