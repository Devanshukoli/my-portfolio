<script setup>
import { ref } from 'vue'

const timeline = [
  {
    period: '2024 — Present',
    role: 'AI & Backend Systems Engineering',
    focus: 'LLM Orchestration & Server Infrastructure',
    description: 'Integrating Gemini & AI agent capabilities into high-throughput backend services while optimizing REST APIs for minimal latency.'
  },
  {
    period: '2023 — 2024',
    role: 'Backend Systems Engineer',
    focus: 'Scalable APIs & Database Architecture',
    description: 'Designed distributed database schemas in PostgreSQL and MongoDB, implemented rate limiting, authentication, and secure middleware.'
  },
  {
    period: '2022 — 2023',
    role: 'Software Developer',
    focus: 'Full-Stack Web & Microservices',
    description: 'Built full-stack applications with Vue.js, Node.js, and Express, focusing on real-time data handling and clean code modularity.'
  },
  {
    period: '2021 — 2022',
    role: 'CS & Engineering Foundations',
    focus: 'Algorithms & Systems Fundamentals',
    description: 'Mastered core computer science principles, data structures, relational database normalization, and asynchronous I/O loops.'
  }
]

const stats = [
  { value: '3+', label: 'Years Engineering Experience' },
  { value: '15+', label: 'APIs & Services Built' },
  { value: '99.9%', label: 'Uptime Systems Mindset' },
  { value: 'Sub-50ms', label: 'Average Target Latency' }
]

const mindsetCards = [
  {
    title: 'Backend Systems & Architecture',
    icon: '⚡',
    description: 'Obsessed with fast response times, resilient schema design, and robust error handling across distributed services.'
  },
  {
    title: 'AI Engineering & Agentic Workflows',
    icon: '🤖',
    description: 'Pioneering intelligent backends by marrying standard REST pipelines with Gemini LLM function calling and contextual reasoning.'
  },
  {
    title: 'Business-Driven Engineering',
    icon: '🎯',
    description: 'Every line of code serves a user need. I translate business goals into measurable, maintainable software systems.'
  },
  {
    title: 'Relentless Curiosity',
    icon: '🔍',
    description: 'Driven by deep curiosity to understand runtime internals, system bottlenecks, and emerging software paradigms.'
  }
]

const highlights = [
  {
    metric: 'Zero Downtime',
    title: 'Database Schema Migrations',
    detail: 'Executed non-blocking database migrations and caching strategies using Redis for uninterrupted service availability.'
  },
  {
    metric: 'Production-Grade Security',
    title: 'Hardened API Gateways',
    detail: 'Implemented JWT token rotation, DOM sanitization, rate limiting, and strict CORS policies to protect application endpoints.'
  },
  {
    metric: 'AI Agent Pipelines',
    title: 'Intelligent Server Functions',
    detail: 'Built server-side proxy layers using the Gemini API SDK, keeping secrets safe while offering context-aware responses.'
  }
]

const skillGroups = [
  {
    category: 'Backend & Runtime',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'WebSockets', 'Microservices', 'Middleware Design']
  },
  {
    category: 'Databases & Storage',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis Caching', 'Query Optimization', 'Data Modeling']
  },
  {
    category: 'AI & Machine Learning',
    items: ['Gemini API SDK', 'LLM Function Calling', 'Prompt Engineering', 'Vector Retrieval', 'AI Proxy Routes']
  },
  {
    category: 'DevOps & Tooling',
    items: ['Docker', 'Git & Version Control', 'JWT Authentication', 'Nodemailer / EmailJS', 'Vite', 'Vitest']
  }
]
</script>

<template>
  <div class="about-page">
    <div class="container">
      <!-- Section Header -->
      <header class="about-header">
        <div class="eyebrow">Engineering Story & Philosophy</div>
        <h1 class="main-title">Engineering with Purpose & Precision</h1>
        <p class="lead-text">
          I build resilient backend systems and intelligent AI services designed to solve high-impact business problems.
        </p>
      </header>

      <!-- Key Stats Bar -->
      <section class="stats-section" aria-label="Key Engineering Metrics">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </section>

      <!-- The Story & Mindset Section -->
      <section class="story-section">
        <h2 class="section-title">My Journey & Mindset</h2>
        <div class="story-grid">
          <div class="story-box">
            <h3>From Code to Architecture</h3>
            <p>
              My path started with a fascination for how data moves across networks. 
              I quickly realized that slick interfaces mean nothing without a bulletproof server powering them.
            </p>
            <p>
              Over the years, I shifted my focus to server-side engineering, database optimization, 
              and designing APIs that remain responsive under heavy traffic.
            </p>
          </div>

          <div class="story-box">
            <h3>Embracing AI Engineering</h3>
            <p>
              As generative AI matured, I recognized the immense power of combining backend reliability 
              with intelligent, LLM-driven features.
            </p>
            <p>
              Today, I build server-side proxy routes and agentic workflows that leverage Gemini models 
              to automate complex tasks while protecting user data and secrets.
            </p>
          </div>
        </div>
      </section>

      <!-- Callout Mindset Cards -->
      <section class="mindset-section">
        <h2 class="section-title">Core Pillars</h2>
        <div class="mindset-grid">
          <div v-for="card in mindsetCards" :key="card.title" class="mindset-card">
            <div class="card-header">
              <span class="card-icon" aria-hidden="true">{{ card.icon }}</span>
              <h3>{{ card.title }}</h3>
            </div>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </section>

      <!-- Engineering Timeline -->
      <section class="timeline-section">
        <h2 class="section-title">Engineering Career Timeline</h2>
        <div class="timeline">
          <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
            <div class="timeline-marker" aria-hidden="true"></div>
            <div class="timeline-content">
              <div class="timeline-meta">
                <span class="timeline-period">{{ item.period }}</span>
                <span class="timeline-focus">{{ item.focus }}</span>
              </div>
              <h3 class="timeline-role">{{ item.role }}</h3>
              <p class="timeline-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Engineering Highlights Callouts -->
      <section class="highlights-section">
        <h2 class="section-title">Engineering Impact & Highlights</h2>
        <div class="highlights-grid">
          <div v-for="hl in highlights" :key="hl.title" class="highlight-card">
            <div class="highlight-badge">{{ hl.metric }}</div>
            <h3>{{ hl.title }}</h3>
            <p>{{ hl.detail }}</p>
          </div>
        </div>
      </section>

      <!-- Categorized Skills Matrix -->
      <section class="skills-matrix-section">
        <h2 class="section-title">Technical Capabilities</h2>
        <div class="skills-matrix">
          <div v-for="group in skillGroups" :key="group.category" class="skill-group-card">
            <h3 class="group-title">{{ group.category }}</h3>
            <div class="tags-wrapper">
              <span v-for="item in group.items" :key="item" class="skill-tag">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  width: 100%;
  padding: 4rem 1.5rem;
  background: var(--bg-primary);
  min-height: 85vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

/* Header */
.about-header {
  text-align: left;
  margin-bottom: 3rem;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5776f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.main-title {
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.lead-text {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 720px;
}

/* Common Section Title */
.section-title {
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

section {
  margin-bottom: 3.5rem;
}

/* Stats Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: var(--bg-card);
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px var(--shadow-color);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #5776f6;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

/* Story Section */
.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.story-box {
  background: var(--bg-card);
  padding: 1.75rem;
  border-radius: 12px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  box-shadow: 0 2px 10px var(--shadow-color);
}

.story-box h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
}

.story-box p {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin-bottom: 0.85rem;
}

.story-box p:last-child {
  margin-bottom: 0;
}

/* Mindset Cards */
.mindset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.mindset-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mindset-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px var(--shadow-color);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}

.card-icon {
  font-size: 1.3rem;
}

.card-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
}

.mindset-card p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Timeline Section */
.timeline {
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(87, 118, 246, 0.3);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2.05rem;
  top: 0.2rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #5776f6;
  box-shadow: 0 0 0 4px var(--bg-primary);
}

.timeline-content {
  background: var(--bg-card);
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.timeline-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.timeline-period {
  font-size: 0.8rem;
  font-weight: 700;
  color: #5776f6;
}

.timeline-focus {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.timeline-role {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.timeline-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Highlights Section */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.highlight-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  position: relative;
}

.highlight-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.highlight-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.highlight-card p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Skills Matrix */
.skills-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.skill-group-card {
  background: var(--bg-card);
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.group-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.85rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(120, 120, 120, 0.15);
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(120, 120, 120, 0.1);
}

/* Responsive */
@media (max-width: 600px) {
  .about-page {
    padding: 2.5rem 1rem;
  }

  .timeline {
    padding-left: 1.2rem;
  }

  .timeline-marker {
    left: -1.75rem;
  }

  .story-grid,
  .mindset-grid,
  .highlights-grid,
  .skills-matrix {
    grid-template-columns: 1fr;
  }
}
</style>
