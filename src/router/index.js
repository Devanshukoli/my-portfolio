import AboutView from "@/view/AboutView.vue";
import BlogView from "@/view/BlogView.vue";
import ContactView from "@/view/ContactView.vue";
import HomeView from "@/view/HomeView.vue";
import ProjectView from "@/view/ProjectView.vue";
import TrackerView from "@/view/TrackerView.vue";
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
      path: '/blog',
      name: 'blog',
      component: BlogView
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
      path: '/tracker',
      name: 'tracker',
      component: TrackerView
    }
  ]
})

export default router;