/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";
import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  root: '.',
  envPrefix: "EMAILJS_",
  // This ensures only EMAILJS_ prefixed env variables are exposed
  assetsInclude: ["**/*.md"],
  // Include markdown files as assets
  server: {
    fs: {
      allow: ["src", "node_modules", "content"] // Allow serving files from project directories
    }
  },
  // test: {
    // projects: [{
    //   extends: true,
    //   plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      // storybookTest({
      //   configDir: path.join(dirname, '.storybook')
      // })],
      // test: {
      //   name: 'storybook',
      //   browser: {
      //     enabled: true,
      //     headless: true,
      //     provider: 'playwright',
      //     instances: [{
      //       browser: 'chromium'
      //     }]
      //   },
      //   setupFiles: ['.storybook/vitest.setup.js']
      // }
    // }]
  // }
});