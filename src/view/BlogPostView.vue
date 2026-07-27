<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`/api/posts/${route.params.slug}`)
    if (!res.ok) throw new Error('Post not found')
    post.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.push('/blog')
}
</script>

<template>
  <div class="post-view">
    <div class="container">
      <button class="back-btn" @click="goBack">&larr; Back to Blog</button>

      <div v-if="loading" class="loading">Loading post...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <article v-else-if="post" class="post-content">
        <header class="post-header">
          <span v-if="post.frontmatter?.tag" class="tag">{{ post.frontmatter.tag }}</span>
          <h1>{{ post.frontmatter?.title || post.slug }}</h1>
          <p class="date">{{ post.frontmatter?.date }}</p>
        </header>

        <div class="markdown-body" v-html="post.content"></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.post-view {
  width: 100%;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  min-height: 80vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  background: transparent;
  border: 1px solid var(--text-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: var(--bg-card);
  color: #5776f6;
}

.loading, .error-message {
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem;
}

.post-content {
  background: var(--bg-card);
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--text-secondary);
  padding-bottom: 1.5rem;
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

.post-header h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.markdown-body {
  color: var(--text-primary);
  line-height: 1.8;
}

.markdown-body :deep(h2) {
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
}

.markdown-body :deep(pre) {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
