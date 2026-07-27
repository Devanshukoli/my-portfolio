<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const categories = ['All', 'Backend & APIs', 'Distributed Systems', 'AI Engineering', 'Security & Microservices']
const activeCategory = ref('All')

const projects = ref([
  {
    id: 'eisen-hover',
    title: 'Eisen-Hover Matrix API & Task Dispatcher',
    tagline: 'High-throughput prioritized task allocation & decision matrix backend service',
    category: 'Backend & APIs',
    role: 'Lead Backend Engineer',
    duration: '3 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://ais-dev-5nv32v4xru5pyavnacw6p5-236135050293.asia-southeast1.run.app/project/eisen-hover',
    metrics: [
      { label: 'Throughput', value: '1,200 req/sec' },
      { label: 'Avg Latency', value: '< 24ms' },
      { label: 'Uptime', value: '99.95%' }
    ],
    problem: 'Standard task managers fail under concurrent execution loads and lack algorithmic prioritization when dispatching tasks to automated workers.',
    solution: 'Engineered a RESTful & WebSocket worker dispatcher implementing the Eisenhower Matrix algorithm with automated queue leveling and token-bucket rate limiting.',
    architecture: 'Node.js & Express API gateway backed by PostgreSQL with connection pooling. Redis is utilized for real-time priority queues and session rate-limiting.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'JWT', 'Docker']
  },
  {
    id: 'gemini-agent-proxy',
    title: 'Intelligent AI Agent & Proxy Service',
    tagline: 'Secure server-side LLM proxy with context-aware function calling & rate management',
    category: 'AI Engineering',
    role: 'AI Systems Developer',
    duration: '2 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://ais-dev-5nv32v4xru5pyavnacw6p5-236135050293.asia-southeast1.run.app/project/gemini-agent-proxy',
    metrics: [
      { label: 'Token Saving', value: '35%' },
      { label: 'API Security', value: '100% Server-Side' },
      { label: 'Response Time', value: 'Streaming Sub-100ms TTFT' }
    ],
    problem: 'Client-side LLM calls expose proprietary API keys, risk prompt injection vulnerabilities, and consume excessive tokens due to unoptimized prompt context.',
    solution: 'Built an enterprise Express proxy wrapping the Google Gemini API with system instruction enforcement, response sanitization, and structured JSON output validation.',
    architecture: 'Server-side Node.js environment utilizing @google/genai SDK with streaming HTTP responses, DOMPurify output validation, and in-memory context window compaction.',
    technologies: ['Node.js', 'Gemini API', 'Express', 'DOMPurify', 'TypeScript']
  },
  {
    id: 'realtime-presence-chat',
    title: 'Distributed Real-Time Presence & Messaging Engine',
    tagline: 'Scalable WebSocket messaging system with multi-node state synchronization',
    category: 'Distributed Systems',
    role: 'Backend Architect',
    duration: '4 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://github.com/Devanshukoli',
    metrics: [
      { label: 'Concurrent Users', value: '10,000+' },
      { label: 'Sync Latency', value: '< 15ms' },
      { label: 'Message History', value: 'Indexed MongoDB' }
    ],
    problem: 'Standard WebSocket servers fail to broadcast events across multiple load-balanced instances, leading to isolated user channels and missed messages.',
    solution: 'Architected a distributed messaging cluster using Socket.io with Redis Pub/Sub adapter to sync presence state and channel events seamlessly across nodes.',
    architecture: 'Stateless Node.js worker nodes behind an Nginx round-robin load balancer. Redis Pub/Sub handles inter-node messaging while MongoDB indexes persistent history.',
    technologies: ['Node.js', 'Socket.io', 'Redis Pub/Sub', 'MongoDB', 'Nginx']
  },
  {
    id: 'auth-microservice',
    title: 'Hardened Zero-Trust Auth Microservice',
    tagline: 'Standalone authentication engine with OAuth2, JWT rotation, and rate protection',
    category: 'Security & Microservices',
    role: 'Security & Backend Engineer',
    duration: '2 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://github.com/Devanshukoli',
    metrics: [
      { label: 'Security Grade', value: 'A+ OAuth2' },
      { label: 'Token Lifespan', value: '15m Short-Lived' },
      { label: 'Brute-Force Lock', value: 'Automated' }
    ],
    problem: 'Monolithic auth implementations leak access privileges and lack robust refresh token revocation when compromised.',
    solution: 'Designed a modular OAuth2 / JWT authentication service with refresh token rotation stored in HttpOnly cookies and IP-based sliding window rate limiting.',
    architecture: 'Express microservice running Express Rate Limit, bcrypt password hashing, short-lived JWT access tokens, and persistent refresh token blacklists in MySQL.',
    technologies: ['Express.js', 'MySQL', 'JWT', 'OAuth2', 'bcrypt', 'express-rate-limit']
  }
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects.value
  return projects.value.filter(p => p.category === activeCategory.value)
})

const navigateToDetail = (projectId) => {
  router.push(`/project/${projectId}`)
}
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <!-- Section Header -->
      <header class="page-header">
        <div class="eyebrow">Engineering Portfolio & Reports</div>
        <h1 class="page-title">Engineering Case Studies</h1>
        <p class="page-subtitle">
          In-depth reports detailing system architecture, technology tradeoffs, performance metrics, and key lessons learned.
        </p>
      </header>

      <!-- Category Filter Pills -->
      <nav class="filter-nav" aria-label="Filter Projects by Category">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-pill"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </nav>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="case-card"
        >
          <div class="card-top">
            <div class="card-meta">
              <span class="category-badge">{{ project.category }}</span>
              <span class="duration-text">{{ project.duration }}</span>
            </div>
            <h2 class="card-title">{{ project.title }}</h2>
            <p class="card-tagline">{{ project.tagline }}</p>
          </div>

          <!-- Key Metrics Grid -->
          <div class="card-metrics">
            <div v-for="m in project.metrics" :key="m.label" class="metric-item">
              <span class="metric-val">{{ m.value }}</span>
              <span class="metric-lbl">{{ m.label }}</span>
            </div>
          </div>

          <!-- Problem & Solution Preview -->
          <div class="card-summary">
            <div class="summary-block">
              <strong>The Problem:</strong>
              <p>{{ project.problem }}</p>
            </div>
            <div class="summary-block">
              <strong>The Architecture:</strong>
              <p>{{ project.architecture }}</p>
            </div>
          </div>

          <!-- Technologies -->
          <div class="card-tech">
            <span v-for="t in project.technologies" :key="t" class="tech-tag">
              {{ t }}
            </span>
          </div>

          <!-- Card Actions -->
          <div class="card-actions">
            <button class="btn-read-study" @click="navigateToDetail(project.id)">
              <span>View Full Design Doc</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>

            <div class="card-links">
              <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="link-icon" title="View Source on GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a v-if="project.liveDemoUrl" :href="project.liveDemoUrl" target="_blank" rel="noopener noreferrer" class="link-icon" title="View Live Demo">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  width: 100%;
  padding: 4rem 1.5rem;
  background: var(--bg-primary);
  min-height: 85vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: left;
  margin-bottom: 2.5rem;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5776f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.page-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 720px;
}

/* Category Filter Nav */
.filter-nav {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.filter-pill {
  background: var(--bg-card);
  border: 1px solid rgba(120, 120, 120, 0.2);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  color: var(--text-primary);
  border-color: #5776f6;
}

.filter-pill.active {
  background: #5776f6;
  color: #ffffff;
  border-color: #5776f6;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
}

.case-card {
  background: var(--bg-card);
  border: 1px solid rgba(120, 120, 120, 0.15);
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px var(--shadow-color);
  border-color: rgba(87, 118, 246, 0.4);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #5776f6;
  background: rgba(87, 118, 246, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.duration-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
  line-height: 1.25;
}

.card-tagline {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
  line-height: 1.45;
}

/* Metrics */
.card-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 1.25rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.metric-val {
  font-size: 0.9rem;
  font-weight: 700;
  color: #5776f6;
}

.metric-lbl {
  font-size: 0.7rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

/* Summary Block */
.card-summary {
  margin-bottom: 1.25rem;
}

.summary-block {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 0.6rem;
}

.summary-block strong {
  color: var(--text-primary);
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.1rem;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  font-size: 0.75rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(120, 120, 120, 0.1);
}

/* Card Actions */
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(120, 120, 120, 0.12);
}

.btn-read-study {
  background: transparent;
  border: none;
  color: #5776f6;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0;
  transition: color 0.15s ease;
}

.btn-read-study:hover {
  color: #4361ee;
}

.card-links {
  display: flex;
  gap: 0.6rem;
}

.link-icon {
  color: var(--text-secondary);
  padding: 0.3rem;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;
}

.link-icon:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

/* Case Study Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}

.modal-content {
  background: var(--bg-card);
  border-radius: 16px;
  max-width: 840px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2.5rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  border: 1px solid rgba(120, 120, 120, 0.2);
}

.modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  line-height: 1;
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(120, 120, 120, 0.15);
}

.modal-meta {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.role-badge, .duration-badge {
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.modal-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.modal-tagline {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
}

.modal-actions-top {
  display: flex;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background: #5776f6;
  color: white;
  border: none;
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid rgba(120, 120, 120, 0.2);
}

/* Modal Body Sections */
.modal-section {
  margin-bottom: 2rem;
}

.modal-section h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.metrics-banner {
  background: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: 10px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.metric-box {
  display: flex;
  flex-direction: column;
}

.m-val {
  font-size: 1.4rem;
  font-weight: 800;
  color: #5776f6;
}

.m-lbl {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.report-box {
  background: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(120, 120, 120, 0.1);
}

.report-box h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.report-box p, .report-box li {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.report-box ul {
  padding-left: 1.2rem;
  margin: 0;
}

.arch-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.tech-stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag-lg {
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  border: 1px solid rgba(120, 120, 120, 0.2);
}

.decisions-list {
  padding-left: 1.2rem;
  margin: 0;
}

.decisions-list li {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.decisions-list strong {
  color: var(--text-primary);
}

.roadmap-block {
  margin-top: 1rem;
  background: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: 8px;
}

.roadmap-block h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.roadmap-block ul {
  padding-left: 1.2rem;
  margin: 0;
}

.roadmap-block li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 600px) {
  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .card-metrics {
    grid-template-columns: 1fr;
  }
}
</style>
