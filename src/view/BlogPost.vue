<script setup>
import { ref, onMounted } from 'vue'
import DOMPurify from 'dompurify'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug
const post = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`/api/posts/${slug}`)
    if (!res.ok) throw new Error('Post not found')
    post.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="blog-post-page">
    <div class="container">
      <div v-if="loading" class="status">Loading…</div>
      <div v-if="error" role="alert" class="status error">{{ error }}</div>

      <article v-if="post" class="post-article">
        <header>
          <h1>{{ post.frontmatter.title }}</h1>
          <p class="meta">{{ new Date(post.frontmatter.date).toLocaleDateString() }} • {{ post.frontmatter.tag }}</p>
        </header>
        <figure v-if="post.frontmatter.image" class="hero">
          <img :src="post.frontmatter.image" :alt="post.frontmatter.title + ' image'" />
        </figure>

        <section class="post-content" v-html="sanitizedHtml(post.content)"></section>
      </article>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    sanitizedHtml(html) {
      return DOMPurify.sanitize(html || '')
    }
  }
}
</script>

<style scoped>
.post-article { max-width: 780px; margin: 0 auto; padding: 2rem 1rem; }
.post-article h1 { margin-bottom: 0.25rem; }
.meta { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem; }
.hero img { width: 100%; height: auto; border-radius: 8px; margin-bottom: 1rem; }
.post-content { line-height: 1.7; color: var(--text-primary); }
.post-content pre { background: #0b1220; color: #e6eef8; padding: 1rem; border-radius: 6px; overflow:auto; }

@media (max-width: 640px) {
  .post-article { padding: 1.25rem; }
}
</style>
