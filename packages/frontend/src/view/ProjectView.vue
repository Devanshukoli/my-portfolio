<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'E-Commerce REST API',
    description: 'A comprehensive RESTful API for an e-commerce platform with user authentication, product management, cart functionality, and order processing.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: [
      'User authentication with JWT',
      'Product CRUD operations',
      'Shopping cart management',
      'Order processing and tracking',
      'Payment integration'
    ],
    icon: '🛒'
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description: 'A scalable real-time chat system supporting multiple rooms, private messaging, and user presence indicators using WebSockets.',
    technologies: ['Node.js', 'Socket.io', 'Redis', 'MySQL'],
    features: [
      'Real-time messaging',
      'Multiple chat rooms',
      'Private messaging',
      'User online/offline status',
      'Message history persistence'
    ],
    icon: '💬'
  },
  {
    id: 3,
    title: 'Task Management System',
    description: 'A backend system for managing tasks and projects with team collaboration features, role-based access control, and notification system.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis'],
    features: [
      'Project and task management',
      'Role-based permissions',
      'Team collaboration tools',
      'Email notifications',
      'Activity tracking'
    ],
    icon: '✅'
  },
  {
    id: 4,
    title: 'Blog Content Management API',
    description: 'A flexible content management system API for blogs with support for markdown, categories, tags, and SEO optimization.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'AWS S3'],
    features: [
      'Markdown content support',
      'Category and tag system',
      'Image upload to cloud',
      'SEO metadata management',
      'Draft and publish workflow'
    ],
    icon: '📝'
  },
  {
    id: 5,
    title: 'User Analytics Dashboard API',
    description: 'A backend service for collecting, processing, and serving user analytics data with real-time metrics and reporting capabilities.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Redis'],
    features: [
      'Event tracking and logging',
      'Real-time metrics aggregation',
      'Custom report generation',
      'Data visualization endpoints',
      'Performance optimization'
    ],
    icon: '📊'
  },
  {
    id: 6,
    title: 'Authentication Microservice',
    description: 'A standalone authentication and authorization microservice with support for multiple authentication strategies and session management.',
    technologies: ['Node.js', 'Express.js', 'MySQL', 'JWT'],
    features: [
      'Multiple auth strategies (JWT, OAuth)',
      'Session management',
      'Password reset flow',
      'Two-factor authentication',
      'API rate limiting'
    ],
    icon: '🔐'
  }
])

const selectedProject = ref(null)

const showDetails = (project) => {
  selectedProject.value = selectedProject.value?.id === project.id ? null : project
}
</script>

<template>
  <div class="projects">
    <div class="container">
      <header class="projects-header">
        <h1 class="title">My Projects</h1>
        <p class="subtitle">
          A collection of backend projects showcasing my expertise in building scalable server-side applications
        </p>
      </header>

      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
          :class="{ 'active': selectedProject?.id === project.id }"
          @click="showDetails(project)"
        >
          <div class="project-icon">{{ project.icon }}</div>
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="technologies">
            <span v-for="tech in project.technologies" :key="tech" class="tech-badge">
              {{ tech }}
            </span>
          </div>

          <transition name="expand">
            <div v-if="selectedProject?.id === project.id" class="project-features">
              <h3>Key Features:</h3>
              <ul>
                <li v-for="(feature, index) in project.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </transition>

          <div class="card-action">
            <span class="view-details">
              {{ selectedProject?.id === project.id ? 'Hide Details' : 'View Details' }}
            </span>
          </div>
        </div>
      </div>

      <section class="more-projects">
        <h2>Want to see more?</h2>
        <p>Check out my GitHub for more projects and contributions</p>
        <a href="https://github.com" target="_blank" class="github-link">
          <span>🐙</span> Visit My GitHub
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.projects {
  width: 100%;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.projects-header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.project-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px var(--shadow-color);
  border-color: #5776f6;
}

.project-card.active {
  border-color: #c59c35;
  box-shadow: 0 12px 30px rgba(197, 156, 53, 0.3);
}

.project-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

/* Technologies */
.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-badge {
  background: #5776f6;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Features Section */
.project-features {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--text-secondary);
  opacity: 0.9;
}

.project-features h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
}

.project-features ul {
  list-style: none;
  padding: 0;
}

.project-features li {
  color: var(--text-secondary);
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.95rem;
}

.project-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #c59c35;
  font-weight: bold;
}

/* Card Action */
.card-action {
  margin-top: 1rem;
  text-align: center;
}

.view-details {
  color: #5776f6;
  font-weight: 600;
  font-size: 0.95rem;
}

.project-card:hover .view-details {
  color: #c59c35;
}

/* Expand Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* More Projects Section */
.more-projects {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.more-projects h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.more-projects p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.github-link {
  display: inline-block;
  padding: 1rem 2rem;
  background: #24292e;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.github-link:hover {
  background: #000;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.github-link span {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .projects {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-card {
    padding: 1.5rem;
  }

  .more-projects {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }

  .project-title {
    font-size: 1.3rem;
  }

  .project-icon {
    font-size: 2.5rem;
  }

  .more-projects h2 {
    font-size: 1.6rem;
  }
}
</style>
