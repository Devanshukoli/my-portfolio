---
name: project-context
description: Stack and file map for Devanshu Koli's Astro portfolio. Read before editing the site, contact function, or blog collections.
---

# Project context

## Instructions

1. Read `AGENTS.md` and `CONTENT_TODO.md`.
2. Treat `src/content/blog` as the only post source.
3. Put new colors, type, space, and motion in `src/styles/tokens.css`. Load faces only from `src/styles/fonts.css`.
4. Validate contact bodies with `parseContactInput` only.

## Examples

A new post is a markdown file under `src/content/blog` with title, date, description, tags, and draft.

## Performance notes

Pages are static. Do not add client markdown parsers.

## Troubleshooting

If `astro preview` accepts the contact form but mail never sends, the function is not running. Use `vercel dev` or a deployed preview.
