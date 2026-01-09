<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Redirect legacy view to new blog list
  router.replace({ name: 'blog' })
})
</script>

<template>
  <div aria-live="polite" class="redirect-container">
    <div class="loader"></div>
    <span>Redirecting to blog...</span>
  </div>
</template>

<style scoped>
.redirect-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1.5rem;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--accent-color, #6009f0);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
