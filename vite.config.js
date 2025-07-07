import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  root: '.',
  envPrefix: "EMAILJS_", // This ensures only EMAILJS_ prefixed env variables are exposed
  assetsInclude: ["**/*.md"], // Include markdown files as assets
  server: {
    fs: {
      allow: ["src", "node_modules", "content"], // Allow serving files from project directories
    },
  },
});
