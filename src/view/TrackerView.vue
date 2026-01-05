<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'

const logs = ref([])
const newLogTitle = ref('')
const newLogContent = ref('')
const showForm = ref(false)
const selectedLog = ref(null)
const filter = ref('all') // 'all', 'today', 'week'

// Load logs from localStorage on mount
onMounted(() => {
  const savedLogs = localStorage.getItem('journal-logs')
  if (savedLogs) {
    logs.value = JSON.parse(savedLogs)
  }
})

// Save logs to localStorage
const saveLogs = () => {
  localStorage.setItem('journal-logs', JSON.stringify(logs.value))
}

// Add new log
const addLog = () => {
  if (!newLogTitle.value.trim() || !newLogContent.value.trim()) {
    alert('Please fill in both title and content')
    return
  }

  const newLog = {
    id: Date.now(),
    title: newLogTitle.value,
    content: newLogContent.value,
    date: new Date().toISOString(),
    displayDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  logs.value.unshift(newLog)
  saveLogs()

  // Reset form
  newLogTitle.value = ''
  newLogContent.value = ''
  showForm.value = false
}

// Delete log
const deleteLog = (id) => {
  if (confirm('Are you sure you want to delete this log?')) {
    logs.value = logs.value.filter(log => log.id !== id)
    saveLogs()
    if (selectedLog.value?.id === id) {
      selectedLog.value = null
    }
  }
}

// View log details
const viewLog = (log) => {
  selectedLog.value = selectedLog.value?.id === log.id ? null : log
}

// Render markdown
const renderMarkdown = (content) => {
  return marked(content)
}

// Filter logs
const filteredLogs = computed(() => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  return logs.value.filter(log => {
    const logDate = new Date(log.date)
    
    if (filter.value === 'today') {
      return logDate >= today
    } else if (filter.value === 'week') {
      return logDate >= weekAgo
    }
    return true
  })
})
</script>

<template>
  <div class="tracker">
    <div class="container">
      <!-- Header -->
      <header class="tracker-header">
        <h1 class="title">Daily Tracker</h1>
        <p class="subtitle">
          Keep track of your daily activities, learnings, and thoughts in markdown format
        </p>
      </header>

      <!-- Controls -->
      <div class="controls">
        <button class="btn btn-primary" @click="showForm = !showForm">
          {{ showForm ? '✕ Cancel' : '+ Add New Log' }}
        </button>
        
        <div class="filter-buttons">
          <button 
            :class="['filter-btn', { active: filter === 'all' }]" 
            @click="filter = 'all'"
          >
            All
          </button>
          <button 
            :class="['filter-btn', { active: filter === 'today' }]" 
            @click="filter = 'today'"
          >
            Today
          </button>
          <button 
            :class="['filter-btn', { active: filter === 'week' }]" 
            @click="filter = 'week'"
          >
            This Week
          </button>
        </div>
      </div>

      <!-- Add Log Form -->
      <transition name="slide">
        <div v-if="showForm" class="log-form">
          <h2>Create New Log</h2>
          <input 
            v-model="newLogTitle" 
            type="text" 
            placeholder="Log Title (e.g., 'Learning Vue.js')"
            class="input-title"
          />
          <textarea 
            v-model="newLogContent"
            placeholder="Write your log in markdown format...&#10;&#10;**Examples:**&#10;- Use **bold** and *italic*&#10;- Create lists&#10;- Add `code snippets`&#10;- # Headings"
            class="input-content"
            rows="12"
          ></textarea>
          <div class="form-actions">
            <button class="btn btn-primary" @click="addLog">Save Log</button>
            <button class="btn btn-secondary" @click="showForm = false">Cancel</button>
          </div>
        </div>
      </transition>

      <!-- Logs List -->
      <div v-if="filteredLogs.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>No logs yet</h3>
        <p>Start tracking your daily activities by creating your first log!</p>
      </div>

      <div v-else class="logs-grid">
        <div 
          v-for="log in filteredLogs" 
          :key="log.id" 
          class="log-card"
          :class="{ 'active': selectedLog?.id === log.id }"
        >
          <div class="log-header" @click="viewLog(log)">
            <h3 class="log-title">{{ log.title }}</h3>
            <span class="log-date">{{ log.displayDate }}</span>
          </div>

          <div class="log-preview" @click="viewLog(log)">
            {{ log.content.substring(0, 100) }}{{ log.content.length > 100 ? '...' : '' }}
          </div>

          <transition name="expand">
            <div v-if="selectedLog?.id === log.id" class="log-content">
              <div class="markdown-content" v-html="renderMarkdown(log.content)"></div>
            </div>
          </transition>

          <div class="log-actions">
            <button class="action-btn view-btn" @click="viewLog(log)">
              {{ selectedLog?.id === log.id ? 'Hide' : 'View' }}
            </button>
            <button class="action-btn delete-btn" @click.stop="deleteLog(log.id)">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">{{ logs.length }}</div>
          <div class="stat-label">Total Logs</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ filteredLogs.length }}</div>
          <div class="stat-label">Filtered Logs</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracker {
  width: 100%;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Header */
.tracker-header {
  text-align: center;
  margin-bottom: 3rem;
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
  line-height: 1.6;
}

/* Controls */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
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
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-primary);
}

.btn-secondary:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #5776f6;
  color: var(--text-primary);
}

.filter-btn.active {
  background: #5776f6;
  color: white;
  border-color: #5776f6;
}

/* Form */
.log-form {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
  margin-bottom: 2rem;
}

.log-form h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.input-title,
.input-content {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid var(--text-secondary);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
}

.input-title:focus,
.input-content:focus {
  outline: none;
  border-color: #5776f6;
}

.input-content {
  resize: vertical;
  font-family: 'Courier New', monospace;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-card);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Logs Grid */
.logs-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.log-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.log-card:hover {
  box-shadow: 0 8px 25px var(--shadow-color);
  border-color: #5776f6;
}

.log-card.active {
  border-color: #c59c35;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  cursor: pointer;
  gap: 1rem;
}

.log-title {
  font-size: 1.3rem;
  color: var(--text-primary);
  font-weight: 600;
  flex: 1;
}

.log-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.log-preview {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  cursor: pointer;
}

.log-content {
  padding-top: 1rem;
  border-top: 1px solid var(--text-secondary);
  margin-bottom: 1rem;
}

.markdown-content {
  color: var(--text-secondary);
  line-height: 1.8;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.markdown-content :deep(code) {
  background: var(--bg-primary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.markdown-content :deep(pre) {
  background: var(--bg-primary);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-left: 1.5rem;
}

.log-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.view-btn {
  background: #5776f6;
  color: white;
}

.view-btn:hover {
  background: #3e5fe0;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #5776f6;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-secondary);
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 800px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tracker {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-buttons {
    justify-content: center;
  }

  .log-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .log-date {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }

  .log-form {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
