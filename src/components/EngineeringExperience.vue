<script setup>
import { ref } from 'vue'
import { experiences } from '@/data/experienceData'

const activeRoleTab = ref({})
// Default expanded state: first item expanded
const expandedRoles = ref({
  'lead-backend-aetheria': true,
  'backend-vanguard': true,
  'fullstack-dev-aether': false
})

const getActiveTab = (roleId) => {
  return activeRoleTab.value[roleId] || 'overview'
}

const setActiveTab = (roleId, tab) => {
  activeRoleTab.value = {
    ...activeRoleTab.value,
    [roleId]: tab
  }
}

const toggleExpand = (roleId) => {
  expandedRoles.value[roleId] = !expandedRoles.value[roleId]
}
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="exp-container">
      <!-- Section Header -->
      <div class="exp-header">
        <div class="section-tag">CAREER EVOLUTION & ENGINEERING IMPACT</div>
        <h2 class="section-title">Production Experience & Technical Impact</h2>
        <p class="section-subtitle">
          An in-depth retrospective on business challenges, systems architecture, benchmark metrics, and complex bugs fixed across production systems.
        </p>
      </div>

      <!-- Timeline Visualization Container -->
      <div class="timeline-wrapper">
        <div class="timeline-line" aria-hidden="true"></div>

        <article
          v-for="(role, index) in experiences"
          :key="role.id"
          class="timeline-card"
          :class="{ expanded: expandedRoles[role.id] }"
        >
          <!-- Timeline Node Point -->
          <div class="timeline-node" aria-hidden="true">
            <span class="node-dot"></span>
            <span class="node-number">0{{ index + 1 }}</span>
          </div>

          <!-- Role Card Content Header -->
          <div class="card-header">
            <div class="role-top-meta">
              <span class="period-pill">{{ role.period }}</span>
              <span class="company-badge">{{ role.company }}</span>
              <span class="type-pill">{{ role.type }}</span>
              <span class="location-pill">{{ role.location }}</span>
            </div>

            <div class="role-title-row">
              <h3 class="role-title">{{ role.title }}</h3>
              <button
                class="btn-toggle"
                @click="toggleExpand(role.id)"
                :aria-expanded="expandedRoles[role.id]"
                :aria-label="`Toggle engineering details for ${role.title}`"
              >
                <span>{{ expandedRoles[role.id] ? 'Collapse Impact Doc' : 'Expand Impact Doc' }}</span>
                <svg
                  class="chevron"
                  :class="{ rotated: expandedRoles[role.id] }"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            <!-- Quick Metrics Snapshot Bar -->
            <div class="metrics-bar">
              <div
                v-for="m in role.metrics"
                :key="m.label"
                class="metric-chip"
              >
                <span class="metric-val">{{ m.value }}</span>
                <span class="metric-lbl">{{ m.label }}</span>
              </div>
            </div>
          </div>

          <!-- Role Card Expanded Impact Deep Dive -->
          <div v-if="expandedRoles[role.id]" class="card-body">
            <!-- Navigation Sub-Tabs -->
            <div class="role-nav-tabs" role="tablist">
              <button
                class="tab-btn"
                :class="{ active: getActiveTab(role.id) === 'overview' }"
                @click="setActiveTab(role.id, 'overview')"
                role="tab"
              >
                📊 Context & Responsibilities
              </button>
              <button
                class="tab-btn"
                :class="{ active: getActiveTab(role.id) === 'architecture' }"
                @click="setActiveTab(role.id, 'architecture')"
                role="tab"
              >
                ⚙️ Problems & Architecture
              </button>
              <button
                class="tab-btn"
                :class="{ active: getActiveTab(role.id) === 'bug-dive' }"
                @click="setActiveTab(role.id, 'bug-dive')"
                role="tab"
              >
                🐛 Bugs Fixed & Lessons
              </button>
            </div>

            <!-- Tab 1: Context, Responsibilities & Achievements -->
            <div v-if="getActiveTab(role.id) === 'overview'" class="tab-pane">
              <div class="two-col">
                <div class="info-block">
                  <h4 class="block-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Business Context
                  </h4>
                  <p class="body-text">{{ role.businessContext }}</p>
                </div>

                <div class="info-block">
                  <h4 class="block-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Core Responsibilities
                  </h4>
                  <ul class="bullet-list">
                    <li v-for="(resp, i) in role.responsibilities" :key="i">{{ resp }}</li>
                  </ul>
                </div>
              </div>

              <div class="info-block full-width highlight-block">
                <h4 class="block-heading text-emerald">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  Major Engineering Achievements
                </h4>
                <ul class="check-list">
                  <li v-for="(ach, i) in role.achievements" :key="i">{{ ach }}</li>
                </ul>
              </div>
            </div>

            <!-- Tab 2: Problems Solved, Architecture & Tech Stack -->
            <div v-if="getActiveTab(role.id) === 'architecture'" class="tab-pane">
              <div class="info-block full-width">
                <h4 class="block-heading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                  System Architecture Topology
                </h4>
                <p class="body-text code-font-bg">{{ role.architecture }}</p>
              </div>

              <div class="two-col">
                <div class="info-block">
                  <h4 class="block-heading text-amber">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    Key Engineering Problems Solved
                  </h4>
                  <ul class="bullet-list">
                    <li v-for="(prob, i) in role.problemsSolved" :key="i">{{ prob }}</li>
                  </ul>
                </div>

                <div class="info-block">
                  <h4 class="block-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
                    Technologies & Infrastructure
                  </h4>
                  <div class="tech-tags-wrapper">
                    <span v-for="t in role.technologies" :key="t" class="tech-pill">
                      {{ t }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 3: Interesting Bug Fixed & Lessons Learned -->
            <div v-if="getActiveTab(role.id) === 'bug-dive'" class="tab-pane">
              <div class="bug-box">
                <div class="bug-box-header">
                  <svg class="bug-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="6" width="8" height="12" rx="4"></rect><path d="m19 7-3 3"></path><path d="m5 7 3 3"></path><path d="m19 19-3-3"></path><path d="m5 19 3-3"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1-2"></path><path d="m14 4-1-2"></path></svg>
                  <div>
                    <span class="bug-tag">PROD BUG CASE STUDY</span>
                    <h4 class="bug-title">{{ role.interestingBugsFixed.title }}</h4>
                  </div>
                </div>

                <div class="bug-body">
                  <div class="bug-step">
                    <strong>The Root Cause & Behavior:</strong>
                    <p>{{ role.interestingBugsFixed.description }}</p>
                  </div>
                  <div class="bug-step solution-step">
                    <strong>Architectural Fix:</strong>
                    <p>{{ role.interestingBugsFixed.solution }}</p>
                  </div>
                </div>
              </div>

              <div class="info-block full-width wisdom-block">
                <h4 class="block-heading text-indigo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  Architectural Lesson Learned
                </h4>
                <p class="wisdom-text">"{{ role.lessonsLearned }}"</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  width: 100%;
  padding: 4rem 1.5rem;
  background: var(--bg-primary, #ffffff);
}

.exp-container {
  max-width: 1100px;
  margin: 0 auto;
}

.exp-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 3rem;
}

.section-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #5776f6;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--text-secondary, #64748b);
  line-height: 1.6;
}

/* Timeline Line & Node Layout */
.timeline-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-left: 2rem;
}

.timeline-line {
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 11px;
  width: 2px;
  background: linear-gradient(180deg, #5776f6 0%, rgba(87, 118, 246, 0.2) 100%);
}

.timeline-card {
  position: relative;
  background: var(--bg-card, #ffffff);
  border: 1px solid rgba(120, 120, 120, 0.18);
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.timeline-card:hover {
  border-color: rgba(87, 118, 246, 0.4);
}

.timeline-card.expanded {
  border-color: #5776f6;
  box-shadow: 0 8px 30px rgba(87, 118, 246, 0.08);
}

.timeline-node {
  position: absolute;
  left: -2.7rem;
  top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #5776f6;
  border: 3px solid var(--bg-primary, #ffffff);
  box-shadow: 0 0 0 3px rgba(87, 118, 246, 0.25);
}

.node-number {
  display: none;
}

/* Card Header */
.card-header {
  padding: 1.5rem;
}

.role-top-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.period-pill {
  font-size: 0.775rem;
  font-weight: 800;
  color: #ffffff;
  background: #5776f6;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.company-badge {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  background: rgba(120, 120, 120, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.type-pill, .location-pill {
  font-size: 0.75rem;
  color: var(--text-secondary, #64748b);
  background: var(--bg-primary, #f1f5f9);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.role-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.role-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  margin: 0;
  letter-spacing: -0.01em;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(87, 118, 246, 0.1);
  color: #5776f6;
  border: none;
  font-size: 0.825rem;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-toggle:hover {
  background: #5776f6;
  color: #ffffff;
}

.chevron {
  transition: transform 0.2s ease;
}

.chevron.rotated {
  transform: rotate(180deg);
}

/* Metrics Bar */
.metrics-bar {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.metric-chip {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  min-width: 120px;
}

.metric-val {
  font-size: 1.1rem;
  font-weight: 800;
  color: #10b981;
}

.metric-lbl {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
  font-weight: 600;
  text-transform: uppercase;
}

/* Card Body & Tabs */
.card-body {
  border-top: 1px solid rgba(120, 120, 120, 0.15);
  padding: 1.5rem;
  background: rgba(120, 120, 120, 0.02);
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.role-nav-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(120, 120, 120, 0.15);
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary, #64748b);
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  color: var(--text-primary, #0f172a);
  background: rgba(120, 120, 120, 0.08);
}

.tab-btn.active {
  color: #5776f6;
  background: rgba(87, 118, 246, 0.12);
}

/* Content Blocks */
.tab-pane {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.info-block {
  background: var(--bg-card, #ffffff);
  border: 1px solid rgba(120, 120, 120, 0.12);
  padding: 1.25rem;
  border-radius: 10px;
}

.info-block.full-width {
  grid-column: 1 / -1;
}

.block-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  margin-bottom: 0.75rem;
}

.text-emerald { color: #10b981; }
.text-amber { color: #f59e0b; }
.text-indigo { color: #6366f1; }

.body-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary, #475569);
  margin: 0;
}

.code-font-bg {
  font-family: 'Fira Code', monospace, sans-serif;
  font-size: 0.85rem;
  background: rgba(120, 120, 120, 0.05);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #5776f6;
}

.bullet-list, .check-list {
  padding-left: 1.2rem;
  margin: 0;
}

.bullet-list li, .check-list li {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-secondary, #475569);
  margin-bottom: 0.4rem;
}

.highlight-block {
  border-left: 4px solid #10b981;
}

/* Tech Tags */
.tech-tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill {
  font-size: 0.8rem;
  font-weight: 600;
  color: #5776f6;
  background: rgba(87, 118, 246, 0.1);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

/* Bug Box */
.bug-box {
  background: #0f172a;
  color: #f8fafc;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.25rem;
}

.bug-box-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
}

.bug-icon {
  color: #ef4444;
  margin-top: 2px;
}

.bug-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #ef4444;
  letter-spacing: 0.05em;
}

.bug-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0.2rem 0 0;
}

.bug-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.bug-step strong {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 0.25rem;
}

.bug-step p {
  font-size: 0.875rem;
  line-height: 1.55;
  color: #cbd5e1;
  margin: 0;
}

.solution-step p {
  color: #34d399;
}

/* Wisdom Box */
.wisdom-block {
  background: rgba(99, 102, 241, 0.05);
  border-left: 4px solid #6366f1;
}

.wisdom-text {
  font-size: 0.95rem;
  font-style: italic;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .timeline-wrapper {
    padding-left: 1.25rem;
  }

  .timeline-line {
    left: 4px;
  }

  .timeline-node {
    left: -1.8rem;
  }

  .two-col {
    grid-template-columns: 1fr;
  }

  .role-title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-toggle {
    width: 100%;
    justify-content: center;
  }
}
</style>
