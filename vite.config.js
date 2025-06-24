import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'EMAILJS_',  // This ensures only EMAILJS_ prefixed env variables are exposed
  assetsInclude: ['**/*.md'], // Include markdown files as assets
  server: {
    fs: {
      allow: ['content'] // Allow serving files from content directory
    }
  },
  plugins: [
    vue(),
    vueDevTools()
  ]
})
