<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projectDetails } from '@/data/projectData'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  const id = route.params.id
  return projectDetails[id] || null
})

const activeTab = ref('overview')
const copiedSnippetIndex = ref(null)

onMounted(() => {
  window.scrollTo(0, 0)
})

const goBack = () => {
  router.push('/project')
}

const copyCode = (code, index) => {
  navigator.clipboard.writeText(code)
  copiedSnippetIndex.value = index
  setTimeout(() => {
    copiedSnippetIndex.value = null
  }, 2000)
}
</script>

<template>
  <div class="project-detail-page">
    <div v-if="!project" class="container not-found">
      <h2>Project Design Document Not Found</h2>
      <p>The requested engineering design document could not be located.</p>
      <button class="btn btn-primary" @click="goBack">&larr; Return to Portfolio Projects</button>
    </div>

    <div v-else class="container">
      <!-- Breadcrumb Nav -->
      <div class="breadcrumb">
        <button class="back-link" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Back to Portfolio Projects</span>
        </button>
        <span class="sep">/</span>
        <span class="current">{{ project.title }}</span>
      </div>

      <!-- Engineering Document Header -->
      <header class="doc-header">
        <div class="doc-meta-bar">
          <span class="status-badge">{{ project.status }}</span>
          <span class="doc-stat">Version: {{ project.version }}</span>
          <span class="doc-stat">Author: {{ project.author }}</span>
          <span class="doc-stat">Date: {{ project.date }}</span>
        </div>

        <h1 class="doc-title">{{ project.title }}</h1>
        <p class="doc-tagline">{{ project.tagline }}</p>

        <div class="meta-pills">
          <div class="pill">
            <span class="pill-label">Category</span>
            <span class="pill-val">{{ project.category }}</span>
          </div>
          <div class="pill">
            <span class="pill-label">Role</span>
            <span class="pill-val">{{ project.role }}</span>
          </div>
          <div class="pill">
            <span class="pill-label">Duration</span>
            <span class="pill-val">{{ project.duration }}</span>
          </div>
        </div>

        <div class="doc-links">
          <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            <span>GitHub Repository</span>
          </a>
          <a v-if="project.liveDemoUrl" :href="project.liveDemoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            <span>Live Application</span>
          </a>
        </div>
      </header>

      <!-- Tech Stack Tags -->
      <div class="tech-stack-row">
        <span class="tech-label">Tech Stack:</span>
        <span v-for="t in project.techStack" :key="t" class="tech-tag">
          {{ t }}
        </span>
      </div>

      <!-- Quick Document Jump Navigation -->
      <nav class="doc-nav">
        <a href="#overview" class="nav-item">1. Overview</a>
        <a href="#problem" class="nav-item">2. Problem & Requirements</a>
        <a href="#architecture" class="nav-item">3. Architecture</a>
        <a href="#database" class="nav-item">4. Database Design</a>
        <a href="#api" class="nav-item">5. API Design</a>
        <a href="#auth" class="nav-item">6. Auth Strategy</a>
        <a href="#performance" class="nav-item">7. Performance</a>
        <a href="#deployment" class="nav-item">8. Deployment</a>
        <a href="#snippets" class="nav-item">9. Code Snippets</a>
        <a href="#lessons" class="nav-item">10. Retrospective</a>
      </nav>

      <!-- Document Content Body -->
      <main class="doc-body">
        <!-- 1. Overview -->
        <section id="overview" class="doc-section">
          <div class="section-badge">SECTION 1.0</div>
          <h2>System Overview</h2>
          <div class="card-content">
            <p class="paragraph-lead">{{ project.overview }}</p>
          </div>
        </section>

        <!-- 2. Problem Statement & Requirements -->
        <section id="problem" class="doc-section">
          <div class="section-badge">SECTION 2.0</div>
          <h2>Problem Statement & System Requirements</h2>
          
          <div class="spec-box alert-box">
            <h3>Problem Statement</h3>
            <p>{{ project.problemStatement }}</p>
          </div>

          <div class="two-col">
            <div class="spec-box">
              <h3>Functional Requirements</h3>
              <ul class="check-list">
                <li v-for="(fr, idx) in project.requirements.functional" :key="idx">
                  {{ fr }}
                </li>
              </ul>
            </div>

            <div class="spec-box">
              <h3>Non-Functional Requirements</h3>
              <ul class="check-list">
                <li v-for="(nfr, idx) in project.requirements.nonFunctional" :key="idx">
                  {{ nfr }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 3. Architecture Diagram & Description -->
        <section id="architecture" class="doc-section">
          <div class="section-badge">SECTION 3.0</div>
          <h2>System Architecture</h2>
          <p class="section-desc">{{ project.architectureText }}</p>

          <div class="diagram-wrapper">
            <div class="diagram-header">Architecture Topology Diagram</div>
            <pre class="ascii-diagram"><code>{{ project.architectureDiagram }}</code></pre>
          </div>
        </section>

        <!-- 4. Database Design -->
        <section id="database" class="doc-section">
          <div class="section-badge">SECTION 4.0</div>
          <h2>Database Design & Data Schema</h2>
          <p><strong>Database Type:</strong> {{ project.databaseDesign.type }}</p>

          <div v-if="project.databaseDesign.schemaDiagram" class="diagram-wrapper">
            <div class="diagram-header">Database Schema & Index Definition</div>
            <pre class="ascii-diagram"><code>{{ project.databaseDesign.schemaDiagram }}</code></pre>
          </div>

          <div v-if="project.databaseDesign.tables.length > 0" class="tables-spec">
            <div v-for="tbl in project.databaseDesign.tables" :key="tbl.name" class="table-block">
              <h3>Table: <code>{{ tbl.name }}</code></h3>
              <p class="table-desc">{{ tbl.description }}</p>

              <table class="data-table">
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Constraints</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="col in tbl.columns" :key="col.name">
                    <td><code>{{ col.name }}</code></td>
                    <td><span class="type-badge">{{ col.type }}</span></td>
                    <td>{{ col.constraints }}</td>
                    <td>{{ col.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="spec-box note-box">
            <strong>Optimization Rationale:</strong> {{ project.databaseDesign.optimizationNotes }}
          </div>
        </section>

        <!-- 5. API Design -->
        <section id="api" class="doc-section">
          <div class="section-badge">SECTION 5.0</div>
          <h2>API Specification & Endpoint Contracts</h2>
          
          <div class="api-endpoints">
            <div v-for="endpoint in project.apiDesign" :key="endpoint.path" class="endpoint-card">
              <div class="endpoint-header">
                <span class="http-method" :class="endpoint.method.toLowerCase()">{{ endpoint.method }}</span>
                <span class="endpoint-path"><code>{{ endpoint.path }}</code></span>
              </div>
              <p class="endpoint-summary">{{ endpoint.summary }}</p>

              <div class="two-col api-payloads">
                <div v-if="endpoint.reqPayload" class="payload-box">
                  <div class="payload-title">Request Payload Example</div>
                  <pre><code>{{ endpoint.reqPayload }}</code></pre>
                </div>
                <div v-if="endpoint.resPayload" class="payload-box">
                  <div class="payload-title">Response Payload Example</div>
                  <pre><code>{{ endpoint.resPayload }}</code></pre>
                </div>
              </div>
              <div class="endpoint-status">
                <strong>Status Codes:</strong> <code>{{ endpoint.statusCodes }}</code>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. Authentication & Authorization -->
        <section id="auth" class="doc-section">
          <div class="section-badge">SECTION 6.0</div>
          <h2>Authentication & Authorization Strategy</h2>
          <div class="spec-box">
            <p>{{ project.authentication }}</p>
          </div>
        </section>

        <!-- 7. Performance Optimizations -->
        <section id="performance" class="doc-section">
          <div class="section-badge">SECTION 7.0</div>
          <h2>Performance Optimizations & Benchmark Metrics</h2>
          
          <div class="perf-grid">
            <div v-for="perf in project.performanceOptimizations" :key="perf.metric" class="perf-card">
              <div class="perf-metric">{{ perf.metric }}</div>
              <div class="perf-body">
                <p><strong>Strategy:</strong> {{ perf.strategy }}</p>
                <div class="outcome-badge">Outcome: {{ perf.outcome }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 8. Deployment & Infrastructure -->
        <section id="deployment" class="doc-section">
          <div class="section-badge">SECTION 8.0</div>
          <h2>Deployment Pipeline & Infrastructure</h2>
          
          <div class="two-col">
            <div class="spec-box">
              <h3>CI/CD Pipeline</h3>
              <p>{{ project.deployment.pipeline }}</p>
            </div>
            <div class="spec-box">
              <h3>Infrastructure Stack</h3>
              <p>{{ project.deployment.infrastructure }}</p>
            </div>
          </div>

          <div class="env-vars-box">
            <strong>Key Environment Configuration:</strong>
            <div class="env-tags">
              <code v-for="env in project.deployment.environmentVars" :key="env" class="env-code">{{ env }}</code>
            </div>
          </div>
        </section>

        <!-- 9. Key Code Snippets -->
        <section id="snippets" class="doc-section">
          <div class="section-badge">SECTION 9.0</div>
          <h2>Key Implementation Code Snippets</h2>

          <div v-for="(snippet, index) in project.codeSnippets" :key="index" class="snippet-block">
            <div class="snippet-header">
              <span class="snippet-title">{{ snippet.title }}</span>
              <button class="copy-btn" @click="copyCode(snippet.code, index)">
                {{ copiedSnippetIndex === index ? 'Copied!' : 'Copy Code' }}
              </button>
            </div>
            <p class="snippet-desc">{{ snippet.description }}</p>
            <pre class="code-box"><code>{{ snippet.code }}</code></pre>
          </div>
        </section>

        <!-- 10. Lessons Learned & Retrospective -->
        <section id="lessons" class="doc-section">
          <div class="section-badge">SECTION 10.0</div>
          <h2>Lessons Learned & Future Roadmap</h2>

          <div class="two-col">
            <div class="spec-box lesson-box">
              <h3>Retrospective Takeaways</h3>
              <ul>
                <li v-for="(lesson, idx) in project.lessonsLearned" :key="idx">{{ lesson }}</li>
              </ul>
            </div>

            <div class="spec-box roadmap-box">
              <h3>Future Engineering Roadmap</h3>
              <ul>
                <li v-for="(item, idx) in project.futureWork" :key="idx">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer Action Links -->
      <footer class="doc-footer">
        <button class="btn btn-secondary" @click="goBack">&larr; Back to Portfolio Projects</button>
        <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          View Repository on GitHub
        </a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.project-detail-page {
  width: 100%;
  padding: 3rem 1.5rem 5rem;
  background: var(--bg-primary);
  min-height: 90vh;
  color: var(--text-primary);
}

.container {
  max-width: 920px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.back-link {
  background: transparent;
  border: none;
  color: #5776f6;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0;
}

.back-link:hover {
  text-decoration: underline;
}

.sep {
  color: var(--text-secondary);
}

.current {
  color: var(--text-primary);
  font-weight: 500;
}

/* Header */
.doc-header {
  border-bottom: 2px solid rgba(120, 120, 120, 0.2);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.doc-meta-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.8rem;
}

.status-badge {
  background: #10b981;
  color: #ffffff;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
}

.doc-stat {
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.doc-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.doc-tagline {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.meta-pills {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.pill {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.pill-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-weight: 600;
}

.pill-val {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.doc-links {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

/* Tech Stack */
.tech-stack-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.tech-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.tech-tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: #5776f6;
  background: rgba(87, 118, 246, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

/* Nav Jump */
.doc-nav {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(120, 120, 120, 0.15);
}

.nav-item {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  white-space: nowrap;
  padding: 0.4rem 0.75rem;
  background: var(--bg-card);
  border-radius: 6px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  transition: all 0.15s ease;
}

.nav-item:hover {
  color: var(--text-primary);
  border-color: #5776f6;
}

/* Document Sections */
.doc-section {
  margin-bottom: 3.5rem;
  scroll-margin-top: 2rem;
}

.section-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: #5776f6;
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.doc-section h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.section-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.paragraph-lead {
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--text-primary);
}

/* Spec Boxes */
.spec-box {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  margin-bottom: 1.25rem;
}

.spec-box h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.alert-box {
  border-left: 4px solid #f59e0b;
}

.note-box {
  border-left: 4px solid #5776f6;
  font-size: 0.95rem;
  line-height: 1.5;
}

.check-list {
  padding-left: 1.2rem;
  margin: 0;
}

.check-list li {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

/* Diagrams */
.diagram-wrapper {
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

.diagram-header {
  background: #1e293b;
  color: #94a3b8;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ascii-diagram {
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  color: #38bdf8;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  line-height: 1.35;
}

/* Data Tables */
.tables-spec {
  margin-bottom: 1.5rem;
}

.table-block {
  margin-bottom: 1.75rem;
}

.table-block h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.table-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(120, 120, 120, 0.15);
  font-size: 0.85rem;
}

.data-table th, .data-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(120, 120, 120, 0.1);
}

.data-table th {
  background: var(--bg-secondary);
  font-weight: 700;
  color: var(--text-primary);
}

.type-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

/* API Spec */
.api-endpoints {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.endpoint-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.http-method {
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.http-method.post { background: #10b981; color: white; }
.http-method.get { background: #3b82f6; color: white; }
.http-method.ws { background: #8b5cf6; color: white; }

.endpoint-path {
  font-size: 1rem;
}

.endpoint-summary {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.payload-box {
  background: #0f172a;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 0.8rem;
}

.payload-title {
  font-size: 0.7rem;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

.payload-box pre {
  margin: 0;
  font-family: monospace;
}

.endpoint-status {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Performance */
.perf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.perf-card {
  background: var(--bg-card);
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.perf-metric {
  font-size: 1.1rem;
  font-weight: 800;
  color: #5776f6;
  margin-bottom: 0.5rem;
}

.perf-body p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.outcome-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

/* Code Snippets */
.snippet-block {
  margin-bottom: 1.5rem;
  background: #0f172a;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.snippet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 0.6rem 1rem;
}

.snippet-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f1f5f9;
}

.copy-btn {
  background: #334155;
  color: #f8fafc;
  border: none;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}

.copy-btn:hover {
  background: #475569;
}

.snippet-desc {
  padding: 0.75rem 1rem 0;
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
}

.code-box {
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  color: #f8fafc;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.825rem;
  line-height: 1.5;
}

/* Layout Utilities */
.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.env-vars-box {
  background: var(--bg-card);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(120, 120, 120, 0.15);
  margin-top: 1rem;
}

.env-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.env-code {
  font-size: 0.8rem;
  background: var(--bg-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #5776f6;
  font-family: monospace;
}

/* Footer */
.doc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 2px solid rgba(120, 120, 120, 0.2);
  margin-top: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
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
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid rgba(120, 120, 120, 0.2);
}

.not-found {
  text-align: center;
  padding: 5rem 0;
}

@media (max-width: 600px) {
  .project-detail-page {
    padding: 1.5rem 1rem;
  }

  .two-col {
    grid-template-columns: 1fr;
  }

  .doc-footer {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
