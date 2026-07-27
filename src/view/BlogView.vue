<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/api/posts')
    if (!res.ok) throw new Error('Failed to fetch blog posts')
    posts.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const navigateToPost = (slug) => {
  router.push(`/blog/${slug}`)
}
</script>

<template>
  <div class="blog-view">
    <div class="container">
      <header class="blog-header">
        <h1 class="title">Blog</h1>
        <p class="subtitle">Thoughts, articles, and insights on software engineering and development</p>
      </header>

      <div v-if="loading" class="loading">Loading posts...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="posts.length === 0" class="no-posts">No blog posts found.</div>
      <div v-else class="posts-grid">
        <article 
          v-for="post in posts" 
          :key="post.slug" 
          class="post-card"
          @click="navigateToPost(post.slug)"
        >
          <div v-if="post.frontmatter?.tag" class="tag">{{ post.frontmatter.tag }}</div>
          <h2 class="post-title">{{ post.frontmatter?.title || post.slug }}</h2>
          <p class="post-date">{{ post.frontmatter?.date }}</p>
          <p class="post-description">{{ post.frontmatter?.description }}</p>
          <span class="read-more">Read Article &rarr;</span>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-view {
  width: 100%;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  min-height: 80vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
}

.loading, .error-message, .no-posts {
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px var(--shadow-color);
}

.tag {
  display: inline-block;
  background: #5776f6;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
}

.post-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.post-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.post-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more {
  color: #c59c35;
  font-weight: 600;
}
</style>
