# Project Metadata

## Identity

- Repository name: `my-portfolio`
- Owner/author identity shown in app: Devanshu Koli
- Product type: personal software-engineering portfolio website
- Primary positioning: backend engineer focused on Node.js, Express.js, databases, REST APIs, system design, performance, and clean server-side architecture
- Main runtime shape: Vue 3 SPA plus a small Express API server

## Technology Stack

- Frontend framework: Vue 3
- Frontend build tool: Vite
- Routing: Vue Router
- Motion/theme helpers: `@vueuse/motion`, `@vueuse/core`
- Component docs: Storybook with Vue 3 Vite framework
- Backend: Express 5
- Email: Nodemailer using Gmail service
- API security helpers: CORS, `express-rate-limit`, DOMPurify with JSDOM
- Blog parsing: `gray-matter` for frontmatter, `marked` for Markdown to HTML
- Package manager: npm with `package-lock.json`

## Commands

- `npm run dev`: starts Vite development server.
- `npm run server`: starts the Express API server from `server.js`.
- `npm run dev:all`: runs API and Vite together through `concurrently`.
- `npm run build`: production frontend build.
- `npm run preview`: preview the built frontend.
- `npm run format`: formats the repo with Prettier.
- `npm run storybook`: Storybook development server on port `6006`.
- `npm run build-storybook`: static Storybook build.

There is no dedicated `test` script in `package.json` at the time this metadata was written.

## Top-Level File Map

- `index.html`: Vite HTML entry. Loads Font Awesome from CDN and initializes EmailJS with `EMAILJS_PUBLIC_KEY`.
- `package.json`: scripts and dependencies.
- `package-lock.json`: npm lockfile; keep in sync with dependency changes.
- `vite.config.js`: Vue plugin, Vue devtools plugin, alias, env prefix, markdown asset include, dev proxy, and filesystem allow list.
- `server.js`: Express backend for contact email and blog post APIs.
- `server.test.js`: minimal backend-style test stub.
- `README.md`: public project overview.
- `jsconfig.json`: editor path alias for `@/*` to `src/*`.
- `my-portfolio.excalidraw`: project sketch/diagram artifact.
- `.storybook/*`: Storybook configuration.
- `.vscode/tasks.json`: editor task config.
- `data/blog`: canonical markdown blog content.
- `src`: Vue app source.
- `skills/project-context`: AI-agent project knowledge.

## Frontend Architecture

Entry flow:

1. `index.html` provides `<div id="app"></div>` and loads `/src/main.js`.
2. `src/main.js` imports global CSS, creates the Vue app, installs Vue Router and `MotionPlugin`, then mounts `App`.
3. `src/App.vue` renders the persistent `Header`, current route through `<router-view />`, and persistent `Footer`.
4. `src/router/index.js` defines the active page routes.

Active routes:

- `/`: `HomeView`
- `/about`: `AboutView`
- `/project`: `ProjectView`
- `/contact`: `ContactView`

Navigation:

- `Header.vue` links to the active routes and includes `ThemeToggle`.
- `Footer.vue` repeats quick links and social/contact links.
- `HomeView.vue` has quick cards that also point to `/blog` and `/tracker`, but those routes do not currently exist.

## Frontend Views

`src/view/HomeView.vue`

- Hero for "Hi, I'm Devanshu Koli" and "Backend Engineer".
- Skills list for Node.js, Express.js, MongoDB, MySQL, REST APIs, and Git.
- Calls `router.push()` for buttons and quick cards.
- Uses CSS variables from the global theme.

`src/view/AboutView.vue`

- Profile summary with `DK` initials placeholder.
- Bio sections focused on backend engineering.
- Expertise cards for backend development, database design, API development, and system architecture.
- Tech stack categories for backend, databases, and tools.

`src/view/ProjectView.vue`

- Local `ref` array of project card data.
- Click-to-expand project details.
- Current project content is mostly illustrative backend portfolio data.
- GitHub link currently points to `https://github.com`; update to the real profile or project list when polishing.

`src/view/ContactView.vue`

- Reactive form with name, email, message, loading, error, and success state.
- Performs simple required-field and email-format checks.
- Posts JSON to `${process.env.VITE_API_URL}/api/contact`.
- Important Vite note: browser code should normally use `import.meta.env.VITE_API_URL`; `process.env` is not provided by Vite unless polyfilled.

## Components

`src/components/Header.vue`

- Sticky header with logo, desktop nav, mobile slide-in nav, and theme toggle.
- Uses Escape key handling and body overflow locking while mobile nav is open.
- Uses Vue Router links.

`src/components/Footer.vue`

- Footer brand, quick links, social links, contact email, current-year copyright.
- Uses Font Awesome classes; Font Awesome is loaded from CDN in `index.html`.

`src/components/ThemeToggle.vue`

- Uses `useDark()` and `useToggle()` from `@vueuse/core`.
- Toggles a `.dark` class for theme variables.
- Uses `v-motion` interactions from `@vueuse/motion`.

## Styling

Global CSS lives in:

- `src/assets/style.css`: basic reset and font family.
- `src/assets/theme.css`: CSS variables for light/dark backgrounds, card colors, text, accent, and shadows.

Theme tokens:

- `--bg-primary`
- `--bg-secondary`
- `--bg-card`
- `--text-primary`
- `--text-secondary`
- `--accent-color`
- `--shadow-color`

Common accent colors used in components:

- Blue: `#5776f6`
- Gold: `#c59c35`

When editing UI, prefer existing tokens and update shared variables when a color needs to be systematic.

## Backend Architecture

Backend file: `server.js`

Middleware:

- `express.json()` for JSON bodies.
- `cors()` with `ALLOWED_ORIGINS` split by comma, defaulting to `http://localhost:5173`.
- `express-rate-limit` on contact submissions.

Contact endpoint:

- `POST /api/contact`
- Requires `name`, `email`, and `message`.
- Validates email with a basic regex.
- Enforces length limits: name <= 100, email <= 100, message <= 2000.
- Sanitizes all three fields with DOMPurify.
- Sends an email through Nodemailer using Gmail credentials from env vars.
- Returns `{ success: true }` or an error JSON body.

Blog endpoints:

- `GET /api/posts`: reads markdown files from `data/blog`, parses frontmatter/content, sorts newest-first by frontmatter date, returns only `{ slug, frontmatter }`.
- `GET /api/posts/:slug`: reads one markdown file from `data/blog`, parses frontmatter, converts Markdown to HTML, and returns `{ slug, frontmatter, content }`.

The server currently starts listening immediately at the bottom of `server.js`, which makes direct unit testing harder. If expanding tests, consider exporting `app` separately and starting the listener in a small entry file or behind `if (require.main === module)`.

## Environment Variables

Backend:

- `CONTACT_EMAIL`: sender Gmail account.
- `CONTACT_EMAIL_PASS`: Gmail app password or SMTP password.
- `RECIPIENT_EMAIL`: destination inbox for contact submissions.
- `ALLOWED_ORIGINS`: optional comma-separated CORS allowlist.
- `PORT`: optional API port, default `3001`.

Frontend:

- `EMAILJS_PUBLIC_KEY`: initialized in `index.html` because Vite config exposes `EMAILJS_` variables.
- `VITE_API_URL`: implied by `ContactView.vue`, but not exposed by the current `envPrefix` setting if `envPrefix` replaces the Vite default. Verify before relying on it.

Security note: keep `.env` out of git. It is ignored by `.gitignore`.

## Vite Configuration

`vite.config.js`:

- Uses `@vitejs/plugin-vue`.
- Uses `vite-plugin-vue-devtools`.
- Defines `@` alias to `src`.
- Sets `envPrefix: "EMAILJS_"`.
- Includes markdown files as assets.
- Proxies `/api` to `http://localhost:3001`.
- Allows filesystem access to workspace root, `src`, `node_modules`, and `data`.

If frontend code needs `VITE_*` env vars, revisit `envPrefix` and use `["VITE_", "EMAILJS_"]` if both should be exposed.

## Blog Workflow

Canonical blog directory: `data/blog`

Post format:

```md
---
title: Your Post Title
date: 2026-01-01
description: A short summary
tag: Topic
image: /src/assets/example.png
---

Markdown content goes here.
```

The backend excludes `README.md` and serves all other `.md` files. Keep slugs filename-based, for example `understanding-modern-javascript.md` becomes `understanding-modern-javascript`.

The current frontend does not have registered blog routes, even though the backend API exists and `data/blog/README.md` describes blog UI files. If adding blog UI, create the views, register routes, and make Home quick links point to real routes.

## Storybook

Storybook config lives in `.storybook`.

- Stories are discovered through `../src/**/*.mdx` and `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`.
- Addons include Chromatic, docs, onboarding, accessibility, and Vitest addon.
- Current project-specific stories exist beside app components, such as `Header.stories.js` and `Footer.stories.js`.
- Default Storybook tutorial demo files under `src/stories` were removed as cleanup.

Prefer colocated component stories for real project components.

## Tests

Current test-related files:

- `server.test.js`: minimal contact endpoint test stub using Supertest-style APIs.
- `src/view/__tests__/ContactView.test.js`: minimal form validation test.

Current gaps:

- `package.json` does not define a test script.
- `@vue/test-utils` and `supertest` are referenced by tests but are not declared in `package.json`.
- `server.js` listens immediately, which is awkward for backend unit tests.

If improving tests, first add/align dependencies and scripts, then make the backend app exportable.

## Known Issues And Follow-Ups

- `/blog` and `/tracker` are linked from the Home page but not registered in the router.
- Contact form uses `process.env.VITE_API_URL`; Vite client code should use `import.meta.env`.
- Vite `envPrefix` exposes `EMAILJS_` only; this may hide `VITE_API_URL`.
- The README and `data/blog/README.md` mention blog frontend behavior that is not implemented in the current route map.
- Some project entries and social links are placeholders or generic.
- There is no CI or complete test command documented in `package.json`.

## Cleanup Decisions Already Made

Removed because they were unreferenced, duplicated, empty, or default boilerplate:

- `blog.js`
- `utils/markdown.js`
- `src/blogs/understanding-modern-javascript.md`
- `src/view/ServiceView.vue`
- `src/view/IntroductionView.vue`
- `src/stories/*`

Do not reintroduce duplicate blog sources unless there is a deliberate migration plan.

## Agent Working Rules

- Read this metadata, then inspect the exact files you will edit.
- Preserve user-owned changes; check `git status --short` before and after substantial edits.
- Favor small focused changes.
- Keep content authentic to Devanshu's backend-engineer positioning.
- Keep generated artifacts and dependency folders out of git.
- Update `AGENTS.md` and this metadata when workflows or architecture change.
