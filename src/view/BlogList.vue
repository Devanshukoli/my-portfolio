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

const listMotion = useMotion({
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { stagger: 80 } }
})
</script>

<template>
  <section class="blog-list-section">
    <div class="container">
      <header class="section-header">
        <h1>Blog</h1>
        <p class="lead">Thoughts, learnings & experiences — accessible and responsive.</p>
      </header>

      <div v-if="loading" class="status">Loading posts…</div>
      <div v-if="error" role="alert" class="status error">{{ error }}</div>

      <ul class="posts-grid" v-motion="listMotion">
        <li v-for="post in posts" :key="post.slug" class="post-card">
          <article>
            <a :href="`/blog/${post.slug}`" class="post-link">
              <div class="thumb" :aria-hidden="true">
                <img :src="post.frontmatter.image" :alt="post.frontmatter.title + ' thumbnail'" />
              </div>
              <div class="post-content">
                <h2>{{ post.frontmatter.title }}</h2>
                <p class="meta">{{ new Date(post.frontmatter.date).toLocaleDateString() }} • {{ post.frontmatter.tag }}</p>
                <p class="excerpt">{{ post.frontmatter.description }}</p>
              </div>
            </a>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.blog-list-section { padding: 3rem 0; }
.section-header { text-align: center; margin-bottom: 2rem; }
.lead { color: var(--text-secondary); }
.status { text-align: center; padding: 1rem; }
.status.error { color: #b00020 }
.posts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; list-style: none; padding: 0; }
.post-card { background: var(--bg-card); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
.post-link { display: flex; gap: 1rem; color: inherit; text-decoration: none; align-items: stretch; }
.thumb img { width: 160px; height: 110px; object-fit: cover; display: block; }
.post-content { padding: 1rem; }
.post-content h2 { margin: 0 0 0.25rem 0; font-size: 1.05rem; }
.meta { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem; }
.excerpt { color: var(--text-secondary); font-size: 0.95rem; }

@media (max-width: 640px) {
  .post-link { flex-direction: column; }
  .thumb img { width: 100%; height: 180px; }
}
</style>
