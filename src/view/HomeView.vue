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
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero-container">
        <!-- Status Indicator / Eyebrow Badge -->
        <div class="hero-status-badge">
          <span class="status-pulse" aria-hidden="true"></span>
          <span class="status-text">Available for Full-Time Backend & Software Engineering Roles</span>
        </div>

        <!-- Identity & Headline -->
        <div class="hero-header">
          <p class="hero-greeting">Devanshu Koli — Software Engineer</p>
          <h1 id="hero-heading" class="hero-headline">
            Building high-performance server systems & resilient cloud APIs.
          </h1>
        </div>

        <!-- Problem Solving Paragraph -->
        <p class="hero-description">
          Specializing in Node.js, Express, and distributed database architecture. 
          I solve complex server-side performance bottlenecks, design clean RESTful APIs, 
          and engineer cloud backend infrastructure built for high availability and low latency.
        </p>

        <!-- CTA Action Buttons -->
        <div class="hero-cta">
          <button class="btn btn-primary" @click="navigateTo('/contact')" aria-label="Contact Devanshu Koli">
            <span>Get in Touch</span>
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>

          <a href="https://github.com/Devanshukoli" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" aria-label="View GitHub Profile">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            <span>GitHub Profile</span>
          </a>

          <a href="/about" class="btn btn-tertiary" @click.prevent="navigateTo('/about')" aria-label="View Resume and Experience">
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
            <span>Resume & Credentials</span>
          </a>
        </div>

        <!-- Social Icons -->
        <div class="hero-socials" aria-label="Social Profiles">
          <span class="socials-title">Direct Links:</span>
          <a href="https://github.com/Devanshukoli" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub Profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/devanshu-koli" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn Profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <span>LinkedIn</span>
          </a>
          <a href="mailto:kolidevanshu02@gmail.com" class="social-icon" aria-label="Send Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <span>Email</span>
          </a>
        </div>

        <!-- Trust Metrics Ribbon -->
        <div class="hero-trust-ribbon">
          <div class="trust-pill">
            <span class="trust-metric">3+ Years</span>
            <span class="trust-desc">Backend Systems</span>
          </div>
          <div class="trust-divider" aria-hidden="true"></div>
          <div class="trust-pill">
            <span class="trust-metric">Node.js & Express</span>
            <span class="trust-desc">Core Stack</span>
          </div>
          <div class="trust-divider" aria-hidden="true"></div>
          <div class="trust-pill">
            <span class="trust-metric">SQL & MongoDB</span>
            <span class="trust-desc">Data Architecture</span>
          </div>
          <div class="trust-divider" aria-hidden="true"></div>
          <div class="trust-pill">
            <span class="trust-metric">RESTful APIs</span>
            <span class="trust-desc">High Throughput</span>
          </div>
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

/* ==========================================================================
   Hero Section - Modern Minimalist Stripe/Linear/Vercel Engineering Aesthetic
   ========================================================================== */
.hero {
  position: relative;
  padding: 5rem 1.5rem 4rem;
  background: var(--bg-primary);
  border-bottom: 1px solid rgba(120, 120, 120, 0.12);
  display: flex;
  justify-content: center;
}

.hero-container {
  max-width: 860px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

/* Eyebrow / Status Badge */
.hero-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.9rem;
  background: var(--bg-secondary);
  border: 1px solid rgba(120, 120, 120, 0.2);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 1.75rem;
}

.status-pulse {
  width: 8px;
  height: 8px;
  background-radius: 50%;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  flex-shrink: 0;
}

.status-text {
  letter-spacing: -0.01em;
}

/* Identity & Headline */
.hero-header {
  margin-bottom: 1.25rem;
}

.hero-greeting {
  font-size: 1.1rem;
  font-weight: 600;
  color: #5776f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.hero-headline {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.12;
  letter-spacing: -0.03em;
  max-width: 820px;
}

/* Problem-solving Paragraph */
.hero-description {
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 740px;
  margin-bottom: 2.25rem;
  font-weight: 400;
}

/* CTA Buttons */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 44px;
  padding: 0 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  white-space: nowrap;
}

.btn:focus-visible {
  outline: 2px solid #5776f6;
  outline-offset: 2px;
}

.btn-icon {
  flex-shrink: 0;
}

.btn-primary {
  background: #5776f6;
  color: #ffffff;
  border: 1px solid #5776f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: #4361ee;
  border-color: #4361ee;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid rgba(120, 120, 120, 0.25);
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--text-primary);
  transform: translateY(-1px);
}

.btn-tertiary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
}

.btn-tertiary:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

/* Social Links Bar */
.hero-socials {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.socials-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.social-icon:hover {
  color: #5776f6;
  background-color: var(--bg-secondary);
}

.social-icon:focus-visible {
  outline: 2px solid #5776f6;
  outline-offset: 2px;
}

/* Trust Ribbon */
.hero-trust-ribbon {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.75rem;
  border-top: 1px dashed rgba(120, 120, 120, 0.2);
  width: 100%;
  flex-wrap: wrap;
}

.trust-pill {
  display: flex;
  flex-direction: column;
}

.trust-metric {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.trust-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.trust-divider {
  width: 1px;
  height: 24px;
  background-color: rgba(120, 120, 120, 0.2);
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
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
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
  border: 1px solid rgba(120, 120, 120, 0.1);
}

.skill-card:hover {
  transform: translateY(-4px);
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
  border: 1px solid rgba(120, 120, 120, 0.1);
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px var(--shadow-color);
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 3.5rem 1.25rem 3rem;
  }

  .hero-trust-ribbon {
    gap: 1rem;
  }

  .trust-divider {
    display: none;
  }

  .section-title {
    font-size: 1.85rem;
  }

  .skills, .quick-links {
    padding: 3rem 1rem;
  }

  .skills-grid, .links-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-cta {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .hero-socials {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

