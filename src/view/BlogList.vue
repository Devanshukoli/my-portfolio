<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/posts')
    if (!res.ok) throw new Error('Failed to load posts')
    posts.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

// Motion Variants for the grid items
const cardVariants = {
  initial: { opacity: 0, y: 30 },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: i * 100,
    },
  }),
}
</script>

<template>
  <section class="blog-list-section" aria-labelledby="blog-heading">
    <div class="container">
      <header class="section-header" v-motion="{
        initial: { opacity: 0, y: -20 },
        enter: { opacity: 1, y: 0 }
      }">
        <h1 id="blog-heading" class="gradient-text">Journal & Insights</h1>
        <p class="lead">Exploring the intersection of code, design, and continuous learning.</p>
      </header>

      <div v-if="loading" class="status-container" aria-live="polite">
        <div class="loader"></div>
        <span>Curating latest thoughts...</span>
      </div>

      <div v-else-if="error" role="alert" class="status-container error">
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <span>{{ error }}</span>
      </div>

      <div v-else class="blog-grid-wrapper">
        <ul class="posts-grid">
          <li
            v-for="(post, index) in posts"
            :key="post.slug"
            v-motion="cardVariants"
            :custom="index"
            class="post-card-item"
          >
            <article class="post-card">
              <router-link :to="`/blog/${post.slug}`" class="post-link" :aria-label="`Read more about ${post.frontmatter.title}`">
                <div class="thumb">
                  <img :src="post.frontmatter.image" :alt="''" role="presentation" />
                  <div class="tag-overlay">{{ post.frontmatter.tag }}</div>
                </div>
                <div class="post-content">
                  <div class="post-meta">
                    <time :datetime="post.frontmatter.date">{{ new Date(post.frontmatter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
                  </div>
                  <h2>{{ post.frontmatter.title }}</h2>
                  <p class="excerpt">{{ post.frontmatter.description }}</p>
                  <div class="read-more-wrapper">
                    <span class="read-more-text">Read Article</span>
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                </div>
              </router-link>
            </article>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-list-section {
  padding: 6rem 1rem;
  background: radial-gradient(circle at top right, rgba(96, 9, 240, 0.05), transparent),
              radial-gradient(circle at bottom left, rgba(129, 5, 240, 0.05), transparent);
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.gradient-text {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6009f0 0%, #a200f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  list-style: none;
  padding: 0;
}

.post-card {
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.post-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(96, 9, 240, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.thumb {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.post-card:hover .thumb img {
  transform: scale(1.1);
}

.tag-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(96, 9, 240, 0.85);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.post-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.post-meta {
  font-size: 0.85rem;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.post-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--text-primary);
}

.excerpt {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more-wrapper {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  font-weight: 600;
  transition: gap 0.3s ease;
}

.post-card:hover .read-more-wrapper {
  gap: 0.8rem;
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  gap: 1.5rem;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--accent-color);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .gradient-text { font-size: 2.5rem; }
  .posts-grid { grid-template-columns: 1fr; }
}
</style>
