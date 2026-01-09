<script setup>
import { ref, onMounted, computed } from 'vue'
import DOMPurify from 'dompurify'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
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

const goBack = () => {
  router.push('/blog')
}

const sanitizedHtml = (html) => {
  return DOMPurify.sanitize(html || '', {
    ADD_TAGS: ['iframe'], // Allow iframes for videos if needed
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  })
}

const formattedDate = computed(() => {
  if (!post.value?.frontmatter?.date) return ''
  return new Date(post.value.frontmatter.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <main class="blog-post-page">
    <div class="container">
      <nav class="post-nav" v-motion="{
        initial: { opacity: 0, x: -20 },
        enter: { opacity: 1, x: 0 }
      }">
        <button @click="goBack" class="back-btn" aria-label="Go back to blog list">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          <span>Back to Journal</span>
        </button>
      </nav>

      <div v-if="loading" class="status-container" aria-live="polite">
        <div class="loader"></div>
        <span>Opening article...</span>
      </div>

      <div v-else-if="error" role="alert" class="status-container error">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        <span>{{ error }}</span>
        <button @click="goBack" class="retry-btn">Back to Blog</button>
      </div>

      <article v-else-if="post" class="post-article" v-motion="{
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 }
      }">
        <header class="post-header">
          <div class="post-meta">
            <span class="tag">{{ post.frontmatter.tag }}</span>
            <span class="separator">•</span>
            <time :datetime="post.frontmatter.date">{{ formattedDate }}</time>
          </div>
          <h1>{{ post.frontmatter.title }}</h1>
          <p class="description">{{ post.frontmatter.description }}</p>
        </header>

        <figure v-if="post.frontmatter.image" class="hero-image">
          <img :src="post.frontmatter.image" :alt="post.frontmatter.title" />
        </figure>

        <section class="post-content" v-html="sanitizedHtml(post.content)"></section>

        <footer class="post-footer">
          <div class="share-section">
            <p>Enjoyed the read?</p>
            <div class="share-btns">
              <a :href="`https://twitter.com/intent/tweet?text=${post.frontmatter.title}&url=${encodeURIComponent(window.location.href)}`" target="_blank" aria-label="Share on Twitter"><i class="fa fa-twitter"></i></a>
              <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`" target="_blank" aria-label="Share on LinkedIn"><i class="fa fa-linkedin"></i></a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  </main>
</template>

<style scoped>
.blog-post-page {
  padding: 4rem 1rem 8rem;
  min-height: 100vh;
}

.post-nav {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.back-btn {
  background: transparent;
  border: none;
  color: var(--accent-color);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: transform 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-5px);
}

.post-article {
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 3rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.tag {
  color: var(--accent-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.post-header h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.description {
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--text-secondary);
  font-style: italic;
}

.hero-image {
  margin: 0 -2rem 4rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hero-image img {
  width: 100%;
  height: auto;
  display: block;
}

.post-content {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.post-content :deep(h2) {
  font-size: 2rem;
  margin: 3rem 0 1.5rem;
  color: var(--text-primary);
}

.post-content :deep(p) {
  margin-bottom: 1.5rem;
}

.post-content :deep(pre) {
  background: #0b1220;
  color: #e6eef8;
  padding: 1.5rem;
  border-radius: 12px;
  overflow: auto;
  margin: 2rem 0;
  border: 1px solid rgba(255,255,255,0.1);
}

.post-content :deep(code) {
  font-family: 'Fira Code', monospace;
}

.post-footer {
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.share-section p {
  font-weight: 600;
  margin-bottom: 1rem;
}

.share-btns {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.share-btns a {
  color: var(--text-secondary);
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.share-btns a:hover {
  color: var(--accent-color);
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rem 0;
  gap: 2rem;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid var(--accent-color);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 840px) {
  .hero-image { margin: 0 0 3rem; border-radius: 12px; }
  .post-header h1 { font-size: 2.5rem; }
}
</style>
