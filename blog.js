import { getAllPosts } from './utils/markdown.js';

// Function to create a blog card
function createBlogCard(post) {
    return `
        <article class="blog-card">
            <div class="card-img">
                <img src="${post.frontmatter.image}" alt="${post.frontmatter.title} thumbnail">
                <span class="tag">${post.frontmatter.tag}</span>
            </div>
            <div class="card-content">
                <h3>${post.frontmatter.title}</h3>
                <p>${post.frontmatter.description}</p>
                <div class="card-footer">
                    <span class="date">${new Date(post.frontmatter.date).toLocaleDateString()}</span>
                    <a href="/blog/${post.slug}" class="read-more">Read More →</a>
                </div>
            </div>
        </article>
    `;
}

// Load and render blog posts
async function loadBlogPosts() {
    try {
        const posts = getAllPosts();
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = posts.map(post => createBlogCard(post)).join('');
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadBlogPosts);
