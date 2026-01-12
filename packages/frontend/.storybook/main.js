/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
  logLevel: "debug",
  env: (config) => ({
    ...config,
    EXAMPLE_VAR: "Example Var...",
  }),
};
export default config;
