import AboutView from "@/view/AboutView.vue";
import ContactView from "@/view/ContactView.vue";
import HomeView from "@/view/HomeView.vue";
import ProjectView from "@/view/ProjectView.vue";
import ProjectDetailView from "@/view/ProjectDetailView.vue";
import BlogView from "@/view/BlogView.vue";
import BlogPostView from "@/view/BlogPostView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/project',
      name: 'project',
      component: ProjectView
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView
    }
  ]
})

export default router;
