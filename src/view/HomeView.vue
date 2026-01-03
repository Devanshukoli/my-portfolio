<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const skills = [
  { name: 'Node.js', icon: '🟢', description: 'Server-side JavaScript runtime' },
  { name: 'Express.js', icon: '🚂', description: 'Fast, minimalist web framework' },
  { name: 'MongoDB', icon: '🍃', description: 'NoSQL database solution' },
  { name: 'MySQL', icon: '🐬', description: 'Relational database management' },
  { name: 'REST APIs', icon: '🔌', description: 'RESTful API design & development' },
  { name: 'Git', icon: '📦', description: 'Version control & collaboration' }
]

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Hi, I'm Devanshu Koli</h1>
        <h2 class="hero-subtitle">Backend Engineer</h2>
        <p class="hero-description">
          I build scalable server-side applications with Node.js, Express.js, and databases.
          Passionate about clean code, performance optimization, and robust API design.
        </p>
        <div class="hero-cta">
          <button class="btn btn-primary" @click="navigateTo('/project')">View Projects</button>
          <button class="btn btn-secondary" @click="navigateTo('/contact')">Get in Touch</button>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills">
      <div class="container">
        <h2 class="section-title">Technical Skills</h2>
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-card">
            <div class="skill-icon">{{ skill.icon }}</div>
            <h3 class="skill-name">{{ skill.name }}</h3>
            <p class="skill-description">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="quick-links">
      <div class="container">
        <h2 class="section-title">Explore More</h2>
        <div class="links-grid">
          <div class="link-card" @click="navigateTo('/about')">
            <h3>About Me</h3>
            <p>Learn more about my background and experience</p>
          </div>
          <div class="link-card" @click="navigateTo('/blog')">
            <h3>Blog</h3>
            <p>Read my thoughts on technology and development</p>
          </div>
          <div class="link-card" @click="navigateTo('/tracker')">
            <h3>Daily Tracker</h3>
            <p>My personal development journal and logs</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 500;
  color: #c59c35;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.8;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.6s both;
}

.btn {
  padding: 0.9rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #5776f6;
  color: white;
}

.btn-primary:hover {
  background: #3e5fe0;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(87, 118, 246, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-primary);
}

.btn-secondary:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
  transform: translateY(-2px);
}

/* Skills Section */
.skills {
  padding: 5rem 2rem;
  background: var(--bg-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px var(--shadow-color);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.skill-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.skill-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* Quick Links Section */
.quick-links {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.link-card {
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.link-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px var(--shadow-color);
  background: linear-gradient(135deg, var(--bg-card) 0%, rgba(87, 118, 246, 0.1) 100%);
}

.link-card h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.link-card p {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .skills, .quick-links {
    padding: 3rem 1rem;
  }

  .skills-grid, .links-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
