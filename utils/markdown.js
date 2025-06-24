import { marked } from "marked";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

// Configure marked to enable GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false,
});

// Get all blog posts
export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data: frontmatter, content } = matter(fileContents);

    // Convert markdown into HTML string
    const htmlContent = marked(content);

    // Combine the data
    return {
      slug,
      frontmatter,
      content: htmlContent,
    };
  });

  // Sort posts by date
  return posts.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get a single post by slug
export function getPostBySlug(slug) {
  const fullPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  const htmlContent = marked(content);

  return {
    slug,
    frontmatter,
    content: htmlContent,
  };
}
