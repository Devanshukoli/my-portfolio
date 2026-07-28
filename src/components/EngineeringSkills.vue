<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { skillsByDiscipline } from '@/data/skillsData'

const router = useRouter()
const activeDiscipline = ref('all')
const activeTooltip = ref(null)

const disciplinesList = computed(() => {
  return [
    { id: 'all', name: 'All Disciplines' },
    ...skillsByDiscipline.map(d => ({ id: d.id, name: d.discipline }))
  ]
})

const filteredDisciplines = computed(() => {
  if (activeDiscipline.value === 'all') {
    return skillsByDiscipline
  }
  return skillsByDiscipline.filter(d => d.id === activeDiscipline.value)
})

const toggleTooltip = (skillName) => {
  if (activeTooltip.value === skillName) {
    activeTooltip.value = null
  } else {
    activeTooltip.value = skillName
  }
}

const navigateToLink = (url) => {
  if (!url) return
  if (url.startsWith('http')) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    router.push(url)
  }
}
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="skills-container">
      <div class="skills-header">
        <div class="section-tag">ENGINEERING COMPETENCIES</div>
        <h2 class="section-title">Technical Skills & Discipline Matrix</h2>
        <p class="section-subtitle">
          Categorized breakdown of battle-tested engineering stack, experience, production applications, and confidence metrics.
        </p>
      </div>

      <!-- Discipline Filter Pills -->
      <div class="discipline-filters" role="tablist" aria-label="Skill Disciplines">
        <button
          v-for="disc in disciplinesList"
          :key="disc.id"
          class="filter-pill"
          :class="{ active: activeDiscipline === disc.id }"
          @click="activeDiscipline = disc.id"
          role="tab"
          :aria-selected="activeDiscipline === disc.id"
        >
          {{ disc.name }}
        </button>
      </div>

      <!-- Disciplines Grid -->
      <div class="disciplines-grid">
        <div
          v-for="group in filteredDisciplines"
          :key="group.id"
          class="discipline-card"
        >
          <div class="discipline-card-header">
            <div class="disc-title-row">
              <h3 class="disc-name">{{ group.discipline }}</h3>
              <span class="count-badge">{{ group.skills.length }} Skills</span>
            </div>
            <p class="disc-desc">{{ group.description }}</p>
          </div>

          <div class="skills-list">
            <div
              v-for="skill in group.skills"
              :key="skill.name"
              class="skill-item"
            >
              <div class="skill-main-row">
                <div class="skill-title-group">
                  <span class="skill-name">{{ skill.name }}</span>
                  <button
                    class="info-tooltip-btn"
                    @click.stop="toggleTooltip(skill.name)"
                    :aria-label="`Tooltip info for ${skill.name}`"
                    :title="skill.tooltip"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  </button>
                </div>

                <div class="skill-badges">
                  <span class="badge years-badge">{{ skill.years }}</span>
                  <span class="badge confidence-badge">{{ skill.confidence }}</span>
                </div>
              </div>

              <!-- Confidence Visual Bar -->
              <div class="confidence-bar-bg" :title="`Confidence: ${skill.confidence}`">
                <div
                  class="confidence-bar-fill"
                  :style="{ width: `${skill.confidenceValue}%` }"
                ></div>
              </div>

              <!-- Real-world project & link -->
              <div class="skill-footer-row">
                <div class="project-tag">
                  <span class="project-label">Project:</span>
                  <span class="project-name">{{ skill.project }}</span>
                </div>

                <button
                  v-if="skill.link"
                  class="project-link-btn"
                  @click="navigateToLink(skill.link.url)"
                >
                  <span>{{ skill.link.text }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>

              <!-- Inline Tooltip Explanation Panel -->
              <div
                v-if="activeTooltip === skill.name"
                class="skill-tooltip-panel"
              >
                <div class="tooltip-header">
                  <strong>Production Context:</strong>
                  <button class="tooltip-close" @click="activeTooltip = null">&times;</button>
                </div>
                <p>{{ skill.tooltip }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  width: 100%;
  padding: 4rem 1.5rem;
  background: var(--bg-primary, #ffffff);
}

.skills-container {
  max-width: 1140px;
  margin: 0 auto;
}

.skills-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2.5rem;
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
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
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

/* Filters */
.discipline-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter-pill {
  background: var(--bg-card, #f8fafc);
  color: var(--text-secondary, #475569);
  border: 1px solid rgba(120, 120, 120, 0.2);
  padding: 0.45rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  border-color: #5776f6;
  color: var(--text-primary, #0f172a);
}

.filter-pill.active {
  background: #5776f6;
  color: #ffffff;
  border-color: #5776f6;
  box-shadow: 0 2px 8px rgba(87, 118, 246, 0.25);
}

/* Grid */
.disciplines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.discipline-card {
  background: var(--bg-card, #ffffff);
  border: 1px solid rgba(120, 120, 120, 0.18);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.discipline-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
  border-color: rgba(87, 118, 246, 0.4);
}

.discipline-card-header {
  border-bottom: 1px solid rgba(120, 120, 120, 0.12);
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.disc-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.disc-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
}

.count-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: #5776f6;
  background: rgba(87, 118, 246, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.disc-desc {
  font-size: 0.85rem;
  color: var(--text-secondary, #64748b);
  line-height: 1.45;
  margin: 0;
}

/* Skill Item */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
  background: rgba(120, 120, 120, 0.03);
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(120, 120, 120, 0.1);
}

.skill-main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.skill-title-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.skill-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
}

.info-tooltip-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary, #94a3b8);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border-radius: 50%;
  transition: color 0.15s ease;
}

.info-tooltip-btn:hover {
  color: #5776f6;
}

.skill-badges {
  display: flex;
  gap: 0.4rem;
}

.badge {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.years-badge {
  background: rgba(120, 120, 120, 0.1);
  color: var(--text-primary, #334155);
}

.confidence-badge {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

/* Confidence Bar */
.confidence-bar-bg {
  width: 100%;
  height: 4px;
  background: rgba(120, 120, 120, 0.15);
  border-radius: 2px;
  overflow: hidden;
  margin: 0.2rem 0;
}

.confidence-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #5776f6, #10b981);
  border-radius: 2px;
}

/* Skill Footer */
.skill-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.2rem;
  font-size: 0.775rem;
}

.project-tag {
  color: var(--text-secondary, #64748b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}

.project-label {
  font-weight: 600;
  margin-right: 0.3rem;
}

.project-name {
  color: var(--text-primary, #334155);
  font-weight: 500;
}

.project-link-btn {
  background: transparent;
  border: none;
  color: #5776f6;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
}

.project-link-btn:hover {
  text-decoration: underline;
}

/* Tooltip Panel */
.skill-tooltip-panel {
  background: #0f172a;
  color: #f8fafc;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.45;
  margin-top: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  color: #38bdf8;
  font-size: 0.75rem;
}

.tooltip-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1;
}

.tooltip-close:hover {
  color: white;
}

.skill-tooltip-panel p {
  margin: 0;
  color: #e2e8f0;
}

@media (max-width: 640px) {
  .disciplines-grid {
    grid-template-columns: 1fr;
  }

  .skills-section {
    padding: 2.5rem 1rem;
  }
}
</style>
