import { getAllPosts } from "./utils/markdown.js";

// Function to create a blog card
function createBlogCard(post) {
  return `
        <article class="blog-card">
            <div class="card-img">
                <img src="${post.frontmatter.image || "https://via.placeholder.com/400x250"}" alt="${post.frontmatter.title} thumbnail">
                <span class="tag">${post.frontmatter.tag}</span>
            </div>
            <div class="card-content">
                <h3>${post.frontmatter.title}</h3>
                <p>${post.frontmatter.description}</p>
                <div class="card-footer">
                    <span class="date">${new Date(post.frontmatter.date).toLocaleDateString()}</span>
                    <a href="#" class="read-more" data-slug="${post.slug}">Read More →</a>
                </div>
            </div>
        </article>
    `;
}

// Function to initialize blog posts
async function initializeBlogPosts() {
  const blogGrid = document.querySelector(".blog-grid");
  if (!blogGrid) return;

  try {
    const posts = await getAllPosts();
    const blogHTML = posts.map((post) => createBlogCard(post)).join("");
    blogGrid.innerHTML = blogHTML;

    // Add click handlers for blog post links
    document.querySelectorAll(".read-more").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const slug = e.target.dataset.slug;
        window.location.href = `/blog/${slug}`;
      });
    });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    blogGrid.innerHTML =
      "<p>Error loading blog posts. Please try again later.</p>";
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeBlogPosts);
