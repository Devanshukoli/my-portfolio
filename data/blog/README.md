Directory: data/blog/

- Purpose: Centralized location for markdown blog posts. Each post must be a `.md` file with frontmatter metadata.

Post template (YAML frontmatter at the top):

---
title: Your Post Title
date: 2026-01-01
description: A short summary (one sentence)
tag: Topic or category
image: https://example.com/cover.jpg
---

Write the content in Markdown below the frontmatter.

Workflow to add a post:

1. Create a new file in `data/blog/` named `your-slug.md`.
2. Add the YAML frontmatter using the template above.
3. Add your markdown content below the frontmatter.
4. Start the backend server (`node server.js`) and visit `/blog` in the app — the new post will appear.

Notes:
- The app fetches posts from `/api/posts` and individual posts at `/api/posts/:slug`.
- The front-end components are `src/view/BlogList.vue` and `src/view/BlogPost.vue`.
- Animations are implemented using `@vueuse/motion` (Framer Motion-like API for Vue).
- Ensure images have accessible `alt` text in the frontmatter or content.
