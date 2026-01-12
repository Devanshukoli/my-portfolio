<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    @click="toggleDark()"
    class="theme-toggle-btn"
    aria-label="Toggle Dark Mode"
    v-motion
    :initial="{ scale: 0.9 }"
    :enter="{ scale: 1 }"
    :hovered="{ scale: 1.1 }"
    :tapped="{ scale: 0.95 }"
  >
    <span v-if="isDark" class="icon" key="moon">🌙</span>
    <span v-else class="icon" key="sun">☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle-btn:hover {
  background-color: var(--bg-secondary);
}

.icon {
  display: inline-block;
  line-height: 1;
}
</style>
