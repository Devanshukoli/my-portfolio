# Devanshu Koli's Portfolio
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Devanshukoli/my-portfolio)

This repository contains the source code for my personal portfolio website. It's designed to showcase my journey, projects, and skills as a software engineer, built with Vue.js and Vite.

## ✨ Features

*   **Single Page Application (SPA):** A smooth and fast user experience powered by Vue.js and Vue Router.
*   **Component-Driven Development:** UI components are developed in isolation and documented using **Storybook**.
*   **Dynamic Blog:** The blog section is dynamically generated from Markdown files, making it easy to publish new articles.
*   **Responsive Design:** The layout is fully responsive and adapts to various devices, from desktops to mobile phones.
*   **Contact Form:** A functional contact form for visitors to get in touch.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Devanshukoli/my-portfolio?utm_source=oss&utm_medium=github&utm_campaign=Devanshukoli%2Fmy-portfolio&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## 🛠️ Tech Stack

*   **Framework:** [Vue.js 3](https://vuejs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Routing:** [Vue Router](https://router.vuejs.org/)
*   **Component Development:** [Storybook](https://storybook.js.org/)
*   **Markdown Parsing:** [Marked](https://marked.js.org/) & [gray-matter](https://github.com/jonschlinkert/gray-matter)
*   **Styling:** CSS3
*   **Testing:** [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Devanshukoli/my-portfolio.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd my-portfolio
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

This project includes several scripts to help with development and deployment:

*   `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles the Vue.js application for production into the `dist` directory.
*   `npm run preview`: Serves the production build locally to preview before deployment.
*   `npm run storybook`: Launches the Storybook server to view and develop UI components in isolation.
*   `npm run build-storybook`: Creates a static build of the Storybook for deployment.

## 📖 Storybook

This project uses Storybook for UI component development. It allows for building, viewing, and testing components in an isolated environment.

To run Storybook:
```sh
npm run storybook
```
This will open Storybook in your browser, where you can browse the component library.

## 📂 Project Structure

The project follows a standard Vue.js structure:

```
devanshukoli-my-portfolio/
├── .storybook/         # Storybook configuration files
├── src/
│   ├── assets/         # Global styles and assets
│   ├── blogs/          # Markdown files for blog posts
│   ├── components/     # Reusable Vue components (Header, Footer)
│   ├── router/         # Vue Router configuration
│   ├── stories/        # Storybook stories for components
│   └── view/           # Page-level components (Home, About, Blog)
├── utils/              # Utility scripts (e.g., markdown parser)
├── index.html          # Main HTML entry point
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration

# Author 
- Devanshukoli