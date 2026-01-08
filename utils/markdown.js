import { marked } from "marked";
import matter from "gray-matter";

// Configure marked to enable GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  // `sanitize` option was removed in marked v5; we keep the content as-is and rely on DOMPurify
  // in the browser where rendering occurs if needed.
});

// Use Vite's glob import to load markdown files at build/dev time.
// Adjust this pattern if your markdowns live elsewhere (e.g. '/src/blogs/*.md' or '/content/blog/*.md').
const postsGlob = import.meta.glob("/content/blog/*.md", { eager: true, as: "raw" });

// Get all blog posts
export async function getAllPosts() {
  const posts = Object.entries(postsGlob).map(([filePath, rawContent]) => {
    const fileName = filePath.split("/").pop();
    const slug = fileName.replace(/\.md$/, "");

    // Parse frontmatter and content
    const { data: frontmatter, content: mdContent } = matter(rawContent);
    const htmlContent = marked(mdContent);

    return {
      slug,
      frontmatter,
      content: htmlContent,
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    if (!a.frontmatter || !b.frontmatter) return 0;
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
  });
}

// Get a single post by slug
export async function getPostBySlug(slug) {
  const lookupPath = `/content/blog/${slug}.md`;
  const rawContent = postsGlob[lookupPath];

  if (!rawContent) {
    throw new Error(`Post not found: ${slug}`);
  }

  const { data: frontmatter, content: mdContent } = matter(rawContent);
  const htmlContent = marked(mdContent);

  return {
    slug,
    frontmatter,
    content: htmlContent,
  };
}