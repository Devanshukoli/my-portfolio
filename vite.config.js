import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'EMAILJS_'  // This ensures only EMAILJS_ prefixed env variables are exposed
})
