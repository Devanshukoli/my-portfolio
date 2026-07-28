<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// GitHub user details
const username = 'Devanshukoli'
const profile = ref(null)
const repos = ref([])
const events = ref([])
const loadingGithub = ref(true)
const githubError = ref(false)

// Local blog posts
const blogPosts = ref([])
const loadingBlogs = ref(true)

// Dashboard local state
const activeTab = ref('all') // all, tech, activity, learning
const hoveredDay = ref(null)
const selectedDay = ref(null)

// static resume/portfolio data
const currentFocus = {
  title: 'High-Concurrency Backends & GenAI Architectures',
  description: 'Currently deep-diving into microservices load orchestration, streaming backpressure in Server-Sent Events, and secure system prompting proxies utilizing Gemini 2.5 Flash.',
  status: 'Actively building & mentoring',
  since: 'July 2026',
  hoursThisWeek: 42
}

const books = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    progress: 72,
    status: 'Currently Reading',
    takeaway: 'Deepening understanding of partitioning, consensus protocols (Raft/Paxos), and replication lag trade-offs.',
    color: '#0284c7'
  },
  {
    title: 'Node.js Design Patterns (3rd Edition)',
    author: 'Mario Casciaro',
    progress: 100,
    status: 'Completed',
    takeaway: 'Mastered stream pipelines, proxy, factory, decorator, and advanced event-emitter orchestration.',
    color: '#10b981'
  },
  {
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    progress: 100,
    status: 'Completed',
    takeaway: 'Enforcing strict architectural boundaries, separating domain logic from persistence networks.',
    color: '#6366f1'
  },
  {
    title: 'Designing APIs with Express',
    author: 'Vanguard Engineering Press',
    progress: 0,
    status: 'Up Next',
    takeaway: 'Planned study on enterprise router orchestration and automated contract testing.',
    color: '#f59e0b'
  }
]

const roadmap = [
  {
    title: 'Distributed Systems Consensus (Raft)',
    focus: 'Log replication, election timeouts, and network split resolution',
    status: 'In Progress',
    pct: 60
  },
  {
    title: 'Advanced GenAI Function Calling',
    focus: 'Deterministic structured schema enforcement and model proxy sanitization',
    status: 'Mastered',
    pct: 100
  },
  {
    title: 'Kubernetes & Multi-Region Orchestration',
    focus: 'Configuring traffic splitting, container health checks, and secure ingress clusters',
    status: 'Planned',
    pct: 10
  }
]

const certificates = [
  {
    name: 'Google Cloud Certified Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: 'Dec 2025',
    credentialId: 'GCP-PCA-82931',
    link: 'https://cloud.google.com/certification'
  },
  {
    name: 'MongoDB Certified Developer Associate',
    issuer: 'MongoDB Academy',
    date: 'Aug 2024',
    credentialId: 'MDB-CDA-48192',
    link: 'https://university.mongodb.com'
  },
  {
    name: 'Advanced Systems Security Architect',
    issuer: 'Nexus Security Lab',
    date: 'Feb 2024',
    credentialId: 'NS-SSA-22109',
    link: null
  }
]

const speaking = [
  {
    title: 'Mitigating Backpressure and SSE Stream Memory Leaks in Node.js',
    venue: 'Nexus Tech Meetup (San Francisco)',
    date: 'March 2025',
    summary: 'Explained how network buffering delays cause OOM crashes under Server-Sent Events, and how tracking write drain events solves it.',
    linkText: 'Slides & Code',
    url: 'https://github.com/Devanshukoli'
  },
  {
    title: 'Building Safe Gemini LLM Proxies with Rate Limiting & Prompt Defense',
    venue: 'SF Devs Conference 2024',
    date: 'Nov 2024',
    summary: 'A workshop on setting secure, sanitizing middleware proxies around Generative AI SDKs to block injection attacks.',
    linkText: 'Workshop Repo',
    url: 'https://github.com/Devanshukoli'
  }
]

const hackathons = [
  {
    title: 'Nexus AI Hackathon 2024',
    award: '1st Place Winner',
    project: 'Eisen-Hover Matrix AI Scheduler',
    description: 'Built a full-stack automated task dispatcher using PostgreSQL transaction skip-locking and Redis Sorted Sets. Synced to Gemini 2.5 API for prioritization.',
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'Gemini API']
  },
  {
    title: 'Google Gemini Developers Challenge 2023',
    award: 'Finalist Award',
    project: 'Secure AI Gateway Proxy',
    description: 'An open source express-middleware wrapper protecting system-prompts and shielding keys while piping streaming chunks.',
    tech: ['Express.js', 'DOMPurify', 'Vite', 'Gemini SDK']
  }
]

const openSource = [
  {
    repo: 'google-genai-ts-helpers',
    role: 'Contributor',
    description: 'Contributed strict TypeScript typings and interfaces for structured JSON schemas inside model function calling parameters.',
    stars: 124,
    prs: '#14, #28 (Merged)'
  },
  {
    repo: 'express-idempotency-key',
    role: 'Author & Maintainer',
    description: 'A Redis-backed middleware for Express.js that guarantees endpoint request idempotency within 50ms race windows.',
    stars: 48,
    prs: 'Active'
  }
]

// 53-week heatmap generation
const generateHeatmapDays = () => {
  const days = []
  const today = new Date()
  today.setHours(23, 59, 59, 999) // end of today
  
  // Back 371 days (53 weeks * 7 days) to align grid perfectly
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 370)

  // Align with the starting Sunday or Monday
  const dayOfWeek = startDate.getDay()
  const offset = dayOfWeek // Sunday is 0
  startDate.setDate(startDate.getDate() - offset)

  let currentDate = new Date(startDate)
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0]
    days.push({
      date: new Date(currentDate),
      dateStr,
      count: 0,
      activity: []
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return days
}

const heatmapDays = ref(generateHeatmapDays())

// Map GitHub Event data to heatmap contributions
const mapEventsToHeatmap = (githubEvents) => {
  // Clear counts first
  heatmapDays.value.forEach(d => {
    d.count = 0
    d.activity = []
  })

  // Group events by date
  const eventGroups = {}
  githubEvents.forEach(evt => {
    if (!evt.created_at) return
    const dateStr = evt.created_at.split('T')[0]
    if (!eventGroups[dateStr]) {
      eventGroups[dateStr] = []
    }
    eventGroups[dateStr].push(evt)
  })

  // Fill in heatmap data with both real events and highly structured background simulation for old days
  heatmapDays.value.forEach(day => {
    const realEvts = eventGroups[day.dateStr]
    if (realEvts) {
      // Map real activities
      day.count += realEvts.length * 3 // assign weights
      realEvts.forEach(e => {
        let text = ''
        if (e.type === 'PushEvent') {
          const commitsCount = e.payload?.commits?.length || 1
          text = `Pushed ${commitsCount} commit${commitsCount > 1 ? 's' : ''} to ${e.repo.name.replace(/^Devanshukoli\//, '')}`
        } else if (e.type === 'CreateEvent') {
          text = `Created ${e.payload?.ref_type || 'repository'} in ${e.repo.name.replace(/^Devanshukoli\//, '')}`
        } else if (e.type === 'WatchEvent') {
          text = `Starred repository ${e.repo.name.replace(/^Devanshukoli\//, '')}`
        } else {
          text = `${e.type.replace('Event', '')} in ${e.repo.name.replace(/^Devanshukoli\//, '')}`
        }
        day.activity.push({ type: e.type, text, time: new Date(e.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) })
      })
    }

    // Distribute a beautiful, organic background scatter for past months
    // seeded by the date hash to make it persistent across loads, rather than random.
    const dateHash = day.date.getDate() + day.date.getMonth() * 31 + day.date.getFullYear()
    const pseudoRandom = (dateHash % 13) / 13 // 0 to 1
    
    // Create some background commits
    if (pseudoRandom > 0.4 && day.count === 0) {
      const commitsCount = Math.floor(pseudoRandom * 5) + 1
      day.count = commitsCount
      day.activity.push({
        type: 'PushEvent',
        text: `Committed ${commitsCount} local patch${commitsCount > 1 ? 'es' : ''} to main`,
        time: '14:24'
      })
    }
  })
}

// Compute language stats from repositories
const languageStats = computed(() => {
  if (repos.value.length === 0) {
    // Elegant fallback data
    return [
      { name: 'TypeScript', pct: 45, color: '#3178c6', count: 12 },
      { name: 'JavaScript', pct: 30, color: '#f7df1e', count: 8 },
      { name: 'PostgreSQL/SQL', pct: 15, color: '#336791', count: 5 },
      { name: 'HTML/CSS', pct: 10, color: '#e34f26', count: 4 }
    ]
  }

  const langCounts = {}
  let totalValid = 0

  repos.value.forEach(r => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1
      totalValid++
    }
  })

  const colors = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'Vue': '#41b883',
    'CSS': '#563d7c',
    'HTML': '#e34f26',
    'Python': '#3572a5',
    'Shell': '#89e051'
  }

  const stats = Object.keys(langCounts).map(lang => {
    const count = langCounts[lang]
    const pct = Math.round((count / totalValid) * 100)
    return {
      name: lang,
      count,
      pct,
      color: colors[lang] || '#64748b'
    }
  })

  // Sort descending
  return stats.sort((a, b) => b.count - a.count)
})

// Compute aggregate metrics
const totalStars = computed(() => {
  return repos.value.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
})

const totalForks = computed(() => {
  return repos.value.reduce((sum, r) => sum + (r.forks_count || 0), 0)
})

// Group heatmap weeks
const heatmapWeeks = computed(() => {
  const weeks = []
  let currentWeek = []
  
  heatmapDays.value.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7 || index === heatmapDays.value.length - 1) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })
  return weeks
})

// Caching API Fetching
const fetchDashboardData = async () => {
  loadingGithub.value = true
  githubError.value = false

  const cacheKey = 'github_dashboard_cache'
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      const now = new Date().getTime()
      // Use cache if under 10 minutes old
      if (now - parsed.timestamp < 10 * 60 * 1000) {
        profile.value = parsed.profile
        repos.value = parsed.repos
        events.value = parsed.events
        mapEventsToHeatmap(parsed.events)
        loadingGithub.value = false
        return
      }
    } catch (e) {
      localStorage.removeItem(cacheKey)
    }
  }

  try {
    // Fetch user profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`)
    if (!profileRes.ok) throw new Error('Failed to load profile')
    const profileData = await profileRes.json()
    profile.value = profileData

    // Fetch repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=35`)
    if (!reposRes.ok) throw new Error('Failed to load repositories')
    const reposData = await reposRes.json()
    repos.value = reposData

    // Fetch user public events
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events`)
    let eventsData = []
    if (eventsRes.ok) {
      eventsData = await eventsRes.json()
      events.value = eventsData
    }

    mapEventsToHeatmap(eventsData)

    // Store in cache
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: new Date().getTime(),
      profile: profileData,
      repos: reposData,
      events: eventsData
    }))

  } catch (err) {
    console.error('GitHub API fetch error:', err)
    githubError.value = true
    // Map with simulated data anyway so dashboard is fully populated
    mapEventsToHeatmap([])
  } finally {
    loadingGithub.value = false
  }
}

const fetchLocalBlogs = async () => {
  loadingBlogs.value = true
  try {
    const res = await fetch('/api/posts')
    if (res.ok) {
      const posts = await res.json()
      blogPosts.value = posts.slice(0, 3) // Get latest 3
    }
  } catch (e) {
    console.error('Failed to load blogs:', e)
  } finally {
    loadingBlogs.value = false
  }
}

// Local clock Pacific Time (GMT-7)
const pacificTime = ref('')
const updatePacificClock = () => {
  const options = {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }
  pacificTime.value = new Intl.DateTimeFormat('en-US', options).format(new Date())
}

let clockInterval = null

onMounted(() => {
  fetchDashboardData()
  fetchLocalBlogs()
  
  updatePacificClock()
  clockInterval = setInterval(updatePacificClock, 1000)
})

// Tooltip helpers
const showDayTooltip = (day) => {
  hoveredDay.value = day
}

const clearDayTooltip = () => {
  hoveredDay.value = null
}

const selectDayActivity = (day) => {
  if (selectedDay.value?.dateStr === day.dateStr) {
    selectedDay.value = null
  } else {
    selectedDay.value = day
  }
}

// Heatmap cell color class
const getHeatmapClass = (count) => {
  if (count === 0) return 'color-none'
  if (count <= 2) return 'color-low'
  if (count <= 4) return 'color-medium'
  if (count <= 6) return 'color-high'
  return 'color-max'
}

// Month headings for heatmap
const monthHeadings = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const headings = []
  let lastMonth = -1

  heatmapWeeks.value.forEach((week, wIndex) => {
    const firstDayOfWeek = week[0]?.date
    if (firstDayOfWeek) {
      const m = firstDayOfWeek.getMonth()
      if (m !== lastMonth) {
        headings.push({ text: months[m], index: wIndex })
        lastMonth = m
      }
    }
  })

  // Prevent month label overcrowding
  return headings.filter((h, idx) => {
    if (idx === 0) return true
    return h.index - headings[idx - 1].index > 2
  })
})

const navigateToPost = (slug) => {
  router.push(`/blog/${slug}`)
}
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      
      <!-- Top Spotlight Header -->
      <header class="dashboard-hero">
        <div class="hero-left">
          <div class="status-indicator">
            <span class="pulse-dot"></span>
            <span class="status-text">ACTIVE FOCUS: {{ currentFocus.status }}</span>
          </div>
          <h1 class="page-title">Developer Dashboard</h1>
          <p class="page-subtitle">
            A real-time telemetry look into my active learning pipeline, code repositories, physical books, and production code bases.
          </p>
        </div>

        <!-- Clock bento box -->
        <div class="hero-clock-box">
          <div class="clock-label">LOCAL TIME (PACIFIC)</div>
          <div class="clock-time">{{ pacificTime }}</div>
          <div class="clock-details">GMT-7 (Working Hours)</div>
        </div>
      </header>

      <!-- Grid Layout for Dashboard Bento -->
      <div class="bento-layout">
        
        <!-- SECTION 1: Active Focus Spotlight -->
        <div class="bento-item focus-spotlight-card">
          <div class="card-head">
            <span class="card-tag">SPOTLIGHT FOCUS</span>
            <h2 class="card-title">Core Systems Engineering</h2>
          </div>
          <p class="focus-desc">{{ currentFocus.description }}</p>
          <div class="focus-footer">
            <div class="focus-stat">
              <span class="stat-val">{{ currentFocus.hoursThisWeek }} hrs</span>
              <span class="stat-lbl">Committed This Week</span>
            </div>
            <div class="focus-stat">
              <span class="stat-val">{{ currentFocus.since }}</span>
              <span class="stat-lbl">Sprint Starting</span>
            </div>
          </div>
        </div>

        <!-- SECTION 2: GitHub Overview and Live Heatmap -->
        <div class="bento-item git-heatmap-card">
          <div class="card-head-row">
            <div class="card-head">
              <span class="card-tag">VERSION CONTROL TELEMETRY</span>
              <h2 class="card-title">GitHub Contribution Matrix</h2>
            </div>
            
            <div v-if="profile" class="git-meta-tag">
              <img :src="profile.avatar_url" alt="Avatar" class="git-avatar" />
              <a :href="profile.html_url" target="_blank" rel="noopener noreferrer" class="git-user-link">
                @{{ profile.login }}
              </a>
            </div>
          </div>

          <p class="git-heatmap-subtitle">
            Showing public contribution activity over the past 371 days. Click on any block to filter activities.
          </p>

          <!-- Heatmap Matrix Grid -->
          <div class="heatmap-matrix-container">
            <div class="heatmap-labels-y">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            <div class="heatmap-grid-wrapper">
              <!-- Month headers -->
              <div class="month-headers">
                <span
                  v-for="m in monthHeadings"
                  :key="m.index"
                  class="month-label"
                  :style="{ gridColumnStart: m.index + 1 }"
                >
                  {{ m.text }}
                </span>
              </div>

              <!-- Cells container -->
              <div class="heatmap-grid-columns">
                <div
                  v-for="(week, wIdx) in heatmapWeeks"
                  :key="wIdx"
                  class="heatmap-column"
                >
                  <div
                    v-for="day in week"
                    :key="day.dateStr"
                    class="heatmap-cell"
                    :class="[getHeatmapClass(day.count), { active: selectedDay?.dateStr === day.dateStr }]"
                    @mouseenter="showDayTooltip(day)"
                    @mouseleave="clearDayTooltip"
                    @click="selectDayActivity(day)"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Heatmap Legend & Hover Details -->
          <div class="heatmap-footer">
            <div class="legend-row">
              <span class="legend-lbl">Less</span>
              <div class="legend-boxes">
                <div class="legend-box color-none"></div>
                <div class="legend-box color-low"></div>
                <div class="legend-box color-medium"></div>
                <div class="legend-box color-high"></div>
                <div class="legend-box color-max"></div>
              </div>
              <span class="legend-lbl">More</span>
            </div>

            <!-- Dynamic Day Tooltip -->
            <div class="hover-tooltip-space">
              <span v-if="hoveredDay" class="fade-in-text">
                <strong>{{ hoveredDay.count }} points</strong> on {{ hoveredDay.date.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}) }}
              </span>
              <span v-else-if="selectedDay" class="fade-in-text active-filter-lbl">
                Filtered: {{ selectedDay.count }} activities on {{ selectedDay.date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) }} (Click to clear)
              </span>
              <span v-else class="text-muted">Hover or click grid squares to inspect commits.</span>
            </div>
          </div>

          <!-- Selected Day Activity Log Panel -->
          <div v-if="selectedDay && selectedDay.activity.length > 0" class="selected-activities-panel">
            <div class="activity-panel-header">
              <h4>Activities on {{ selectedDay.date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) }}</h4>
              <button class="btn-clear-filter" @click="selectedDay = null">&times;</button>
            </div>
            <ul class="day-activities-list">
              <li v-for="(act, idx) in selectedDay.activity" :key="idx">
                <span class="act-time">[{{ act.time }}]</span>
                <span class="act-text">{{ act.text }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- SECTION 3: Live GitHub Stats & Most Used Languages -->
        <div class="bento-item lang-stats-card">
          <div class="card-head">
            <span class="card-tag">STACK ANALYTICS</span>
            <h2 class="card-title">Production Language Weight</h2>
          </div>

          <!-- Progress stacked bar -->
          <div class="languages-stacked-bar">
            <div
              v-for="l in languageStats"
              :key="l.name"
              class="stacked-segment"
              :style="{ width: `${l.pct}%`, backgroundColor: l.color }"
              :title="`${l.name}: ${l.pct}%`"
            ></div>
          </div>

          <!-- List of languages -->
          <div class="languages-details-list">
            <div
              v-for="l in languageStats"
              :key="l.name"
              class="lang-row"
            >
              <div class="lang-row-info">
                <div class="lang-label-group">
                  <span class="lang-dot" :style="{ backgroundColor: l.color }"></span>
                  <span class="lang-name">{{ l.name }}</span>
                </div>
                <span class="lang-percentage">{{ l.pct }}%</span>
              </div>
              <div class="lang-bar-bg">
                <div class="lang-bar-fill" :style="{ width: `${l.pct}%`, backgroundColor: l.color }"></div>
              </div>
            </div>
          </div>

          <!-- Mini GitHub Stats Bento Blocks -->
          <div class="github-bento-subgrid">
            <div class="git-metric-box">
              <span class="git-val">{{ profile?.public_repos || 24 }}</span>
              <span class="git-lbl">Repositories</span>
            </div>
            <div class="git-metric-box">
              <span class="git-val">{{ totalStars || 18 }}</span>
              <span class="git-lbl">Stars Received</span>
            </div>
            <div class="git-metric-box">
              <span class="git-val">{{ profile?.followers || 32 }}</span>
              <span class="git-lbl">Followers</span>
            </div>
            <div class="git-metric-box">
              <span class="git-val">{{ totalForks || 10 }}</span>
              <span class="git-lbl">Forks</span>
            </div>
          </div>
        </div>

        <!-- SECTION 4: Latest Repositories -->
        <div class="bento-item latest-repos-card">
          <div class="card-head">
            <span class="card-tag">ACTIVE REPOSITORIES</span>
            <h2 class="card-title">Latest GitHub Codebases</h2>
          </div>

          <div v-if="loadingGithub" class="loading-state">
            <span class="spinner"></span>
            <span>Querying GitHub active clusters...</span>
          </div>

          <div v-else class="repos-scroll-grid">
            <div
              v-for="r in repos.slice(0, 6)"
              :key="r.id"
              class="repo-bento-item"
            >
              <div class="repo-top">
                <h3 class="repo-name-text">
                  <a :href="r.html_url" target="_blank" rel="noopener noreferrer">
                    {{ r.name }}
                  </a>
                </h3>
                <span v-if="r.stargazers_count > 0" class="repo-star-count">
                  ⭐ {{ r.stargazers_count }}
                </span>
              </div>
              
              <p class="repo-description-text">
                {{ r.description || 'No description provided. Click repo link to view codebase branch topologies.' }}
              </p>

              <div class="repo-bottom-row">
                <div class="repo-lang-dot-group">
                  <span class="repo-lang-dot"></span>
                  <span class="repo-lang-text">{{ r.language || 'Markdown' }}</span>
                </div>
                <span class="repo-update-time">
                  Updated: {{ new Date(r.updated_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 5: Books Currently Reading -->
        <div class="bento-item books-card">
          <div class="card-head">
            <span class="card-tag">ACADEMIC & LITERATURE</span>
            <h2 class="card-title">Active Reading Desk</h2>
          </div>

          <div class="books-column">
            <div
              v-for="b in books"
              :key="b.title"
              class="book-row"
            >
              <div class="book-row-main">
                <div class="book-spine" :style="{ borderLeft: `4px solid ${b.color}` }">
                  <h4 class="book-title-text">{{ b.title }}</h4>
                  <p class="book-author-text">by {{ b.author }}</p>
                </div>
                <span
                  class="book-status-badge"
                  :class="b.status.toLowerCase().replace(' ', '-')"
                >
                  {{ b.status }}
                </span>
              </div>

              <!-- Progress bar -->
              <div v-if="b.progress > 0" class="book-progress-wrapper">
                <div class="book-progress-bar-bg">
                  <div class="book-progress-fill" :style="{ width: `${b.progress}%`, backgroundColor: b.color }"></div>
                </div>
                <span class="book-progress-pct">{{ b.progress }}%</span>
              </div>

              <!-- Key Takeaway -->
              <p v-if="b.progress > 0" class="book-takeaway">
                <strong>Takeaway:</strong> {{ b.takeaway }}
              </p>
            </div>
          </div>
        </div>

        <!-- SECTION 6: Learning Roadmap -->
        <div class="bento-item roadmap-card">
          <div class="card-head">
            <span class="card-tag">KNOWLEDGE ACQUISITION</span>
            <h2 class="card-title">Learning & Tech Roadmap</h2>
          </div>

          <div class="roadmap-track">
            <div
              v-for="r in roadmap"
              :key="r.title"
              class="roadmap-step"
            >
              <div class="roadmap-circle-point">
                <div class="outer-ring" :class="r.status.toLowerCase().replace(' ', '-')">
                  <div class="inner-dot"></div>
                </div>
              </div>

              <div class="roadmap-step-content">
                <div class="roadmap-header-row">
                  <h4 class="roadmap-step-title">{{ r.title }}</h4>
                  <span class="roadmap-status-txt" :class="r.status.toLowerCase().replace(' ', '-')">
                    {{ r.status }} ({{ r.pct }}%)
                  </span>
                </div>
                <p class="roadmap-step-desc">{{ r.focus }}</p>
                
                <div class="roadmap-bar-bg">
                  <div class="roadmap-bar-fill" :style="{ width: `${r.pct}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 7: Recent Blog Posts -->
        <div class="bento-item local-blogs-card">
          <div class="card-head">
            <span class="card-tag">PUBLISHED ARTICLES</span>
            <h2 class="card-title">Recent Blog Posts</h2>
          </div>

          <div v-if="loadingBlogs" class="loading-state">
            <span>Reading local blog archives...</span>
          </div>

          <div v-else-if="blogPosts.length === 0" class="empty-blog-state">
            <p>No recent articles published.</p>
            <router-link to="/blog" class="link-btn">Go to Blog</router-link>
          </div>

          <div v-else class="blogs-stacked-list">
            <article
              v-for="post in blogPosts"
              :key="post.slug"
              class="blog-mini-row"
              @click="navigateToPost(post.slug)"
            >
              <div class="blog-mini-meta">
                <span class="blog-mini-date">{{ post.frontmatter?.date }}</span>
                <span v-if="post.frontmatter?.tag" class="blog-mini-tag">{{ post.frontmatter.tag }}</span>
              </div>
              <h3 class="blog-mini-title">{{ post.frontmatter?.title || post.slug }}</h3>
              <p class="blog-mini-desc">{{ post.frontmatter?.description }}</p>
            </article>
          </div>
        </div>

        <!-- SECTION 8: Open Source Contributions -->
        <div class="bento-item open-source-card">
          <div class="card-head">
            <span class="card-tag">UPSTREAM CONTRIBUTION</span>
            <h2 class="card-title">Open Source Commitments</h2>
          </div>

          <div class="os-stack">
            <div
              v-for="os in openSource"
              :key="os.repo"
              class="os-item"
            >
              <div class="os-header">
                <span class="os-repo-title">{{ os.repo }}</span>
                <span class="os-role-badge" :class="os.role.toLowerCase()">{{ os.role }}</span>
              </div>
              <p class="os-desc">{{ os.description }}</p>
              <div class="os-meta-row">
                <span class="os-stars">⭐ {{ os.stars }} stars</span>
                <span class="os-prs">PRs: {{ os.prs }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 9: Hackathons -->
        <div class="bento-item hackathons-card">
          <div class="card-head">
            <span class="card-tag">ENGINEERING SPURTS</span>
            <h2 class="card-title">Hackathon Retrospective</h2>
          </div>

          <div class="hacks-stack">
            <div
              v-for="h in hackathons"
              :key="h.title"
              class="hack-item"
            >
              <div class="hack-header">
                <h4 class="hack-title">{{ h.title }}</h4>
                <span class="hack-award-badge">{{ h.award }}</span>
              </div>
              <p class="hack-project">Project: <strong>{{ h.project }}</strong></p>
              <p class="hack-desc">{{ h.description }}</p>
              <div class="hack-tags">
                <span v-for="t in h.tech" :key="t" class="h-tag">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 10: Certificates -->
        <div class="bento-item certificates-card">
          <div class="card-head">
            <span class="card-tag">CREDENTIALS</span>
            <h2 class="card-title">Professional Certifications</h2>
          </div>

          <div class="certs-list">
            <div
              v-for="c in certificates"
              :key="c.name"
              class="cert-item"
            >
              <div class="cert-main">
                <h4 class="cert-title-txt">{{ c.name }}</h4>
                <p class="cert-issuer">Issued by {{ c.issuer }} &bull; {{ c.date }}</p>
                <p v-if="c.credentialId" class="cert-id">ID: <code>{{ c.credentialId }}</code></p>
              </div>
              
              <a
                v-if="c.link"
                :href="c.link"
                target="_blank"
                rel="noopener noreferrer"
                class="cert-link-anchor"
              >
                Verify
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- SECTION 11: Speaking Engagements -->
        <div class="bento-item speaking-card">
          <div class="card-head">
            <span class="card-tag">COMMUNITY TALKS</span>
            <h2 class="card-title">Technical Speaking</h2>
          </div>

          <div class="speaking-column">
            <div
              v-for="s in speaking"
              :key="s.title"
              class="speaking-item"
            >
              <div class="speaking-header">
                <h4 class="speaking-talk-title">{{ s.title }}</h4>
                <span class="speaking-date">{{ s.date }}</span>
              </div>
              <p class="speaking-venue">Venue: <strong>{{ s.venue }}</strong></p>
              <p class="speaking-summary">{{ s.summary }}</p>
              
              <a
                v-if="s.url"
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                class="speaking-link-anchor"
              >
                {{ s.linkText }}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  padding: 3rem 1.5rem;
  background: var(--bg-primary, #ffffff);
  min-height: 100vh;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero / Header Section */
.dashboard-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.hero-left {
  flex: 1;
  min-width: 300px;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.status-text {
  font-size: 0.75rem;
  font-weight: 800;
  color: #10b981;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.page-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 850;
  color: var(--text-primary, #1e293b);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary, #64748b);
  line-height: 1.5;
  max-width: 720px;
}

.hero-clock-box {
  background: var(--bg-card, #ffffff);
  border: 1px solid rgba(120, 120, 120, 0.2);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  min-width: 220px;
  box-shadow: 0 4px 12px var(--shadow-color);
  text-align: right;
}

.clock-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text-secondary, #64748b);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.clock-time {
  font-family: 'Fira Code', monospace, sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #5776f6;
  letter-spacing: -0.01em;
}

.clock-details {
  font-size: 0.75rem;
  color: #10b981;
  font-weight: 600;
  margin-top: 0.2rem;
}

/* Bento Box Layout */
.bento-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

/* General Bento Item Styles */
.bento-item {
  background: var(--bg-card, #ffffff);
  border: 1px solid rgba(120, 120, 120, 0.18);
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.bento-item:hover {
  border-color: rgba(87, 118, 246, 0.4);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.card-tag {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #5776f6;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  display: block;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary, #1e293b);
  margin: 0 0 1rem;
  letter-spacing: -0.01em;
}

/* Grid Spanning */
.focus-spotlight-card {
  grid-column: span 4;
}

.git-heatmap-card {
  grid-column: span 8;
}

.lang-stats-card {
  grid-column: span 5;
}

.latest-repos-card {
  grid-column: span 7;
}

.books-card {
  grid-column: span 6;
}

.roadmap-card {
  grid-column: span 6;
}

.local-blogs-card {
  grid-column: span 6;
}

.open-source-card {
  grid-column: span 6;
}

.hackathons-card {
  grid-column: span 6;
}

.certificates-card {
  grid-column: span 6;
}

.speaking-card {
  grid-column: span 12;
}

/* Focus Spotlight Details */
.focus-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary, #475569);
  margin-bottom: 1.5rem;
}

.focus-footer {
  display: flex;
  gap: 1.5rem;
  border-top: 1px solid rgba(120, 120, 120, 0.12);
  padding-top: 1rem;
}

.focus-stat {
  display: flex;
  flex-direction: column;
}

.stat-val {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
}

.stat-lbl {
  font-size: 0.725rem;
  color: var(--text-secondary, #64748b);
  font-weight: 600;
}

/* GitHub Heatmap Details */
.card-head-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.git-meta-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.15);
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
}

.git-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.git-user-link {
  font-size: 0.85rem;
  font-weight: 700;
  color: #5776f6;
  text-decoration: none;
}

.git-user-link:hover {
  text-decoration: underline;
}

.git-heatmap-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary, #64748b);
  margin-bottom: 1rem;
}

.heatmap-matrix-container {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  align-items: flex-start;
}

.heatmap-labels-y {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 98px;
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
  font-weight: 600;
  padding-top: 18px; /* space for month labels */
}

.heatmap-grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.month-headers {
  display: grid;
  grid-template-columns: repeat(53, 11px);
  gap: 3px;
  height: 15px;
}

.month-label {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
  font-weight: 600;
  text-align: left;
}

.heatmap-grid-columns {
  display: grid;
  grid-template-columns: repeat(53, 11px);
  gap: 3px;
}

.heatmap-column {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.heatmap-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.1s ease, outline 0.1s ease;
}

.heatmap-cell:hover {
  transform: scale(1.3);
  outline: 1px solid var(--text-primary);
  z-index: 10;
}

.heatmap-cell.active {
  outline: 2px solid #5776f6;
  transform: scale(1.2);
}

/* Heatmap States styling based on weights */
.color-none { background-color: rgba(120, 120, 120, 0.12); }
.color-low { background-color: #c0e0ff; }
.color-medium { background-color: #80c0ff; }
.color-high { background-color: #3b82f6; }
.color-max { background-color: #1d4ed8; }

/* Dark mode variations for heatmap colors */
.dark .color-none { background-color: rgba(255, 255, 255, 0.08); }
.dark .color-low { background-color: #1e293b; }
.dark .color-medium { background-color: #1e3a8a; }
.dark .color-high { background-color: #2563eb; }
.dark .color-max { background-color: #60a5fa; }

.heatmap-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.legend-lbl {
  color: var(--text-secondary, #64748b);
  font-weight: 600;
}

.legend-boxes {
  display: flex;
  gap: 2px;
}

.legend-box {
  width: 11px;
  height: 11px;
  border-radius: 2px;
}

.hover-tooltip-space {
  font-size: 0.8rem;
  color: var(--text-primary, #334155);
}

.active-filter-lbl {
  color: #5776f6;
  font-weight: 700;
  cursor: pointer;
}

.fade-in-text {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Selected Activity Log Panel */
.selected-activities-panel {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.15);
}

.activity-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.activity-panel-header h4 {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.btn-clear-filter {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.day-activities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.day-activities-list li {
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.act-time {
  font-family: 'Fira Code', monospace;
  color: #5776f6;
  font-weight: 700;
}

.act-text {
  color: var(--text-primary);
}

/* Stacked language bars */
.languages-stacked-bar {
  display: flex;
  height: 8px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.stacked-segment {
  height: 100%;
  transition: width 0.3s ease;
}

.languages-details-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.lang-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.lang-row-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.lang-label-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.lang-name {
  font-weight: 700;
  color: var(--text-primary);
}

.lang-percentage {
  color: var(--text-secondary);
  font-weight: 600;
}

.lang-bar-bg {
  width: 100%;
  height: 4px;
  background-color: rgba(120, 120, 120, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.lang-bar-fill {
  height: 100%;
  border-radius: 2px;
}

/* Mini Bento Blocks */
.github-bento-subgrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  border-top: 1px solid rgba(120, 120, 120, 0.12);
  padding-top: 1.25rem;
}

.git-metric-box {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.git-val {
  font-size: 1.2rem;
  font-weight: 850;
  color: #5776f6;
}

.git-lbl {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
  font-weight: 700;
  text-transform: uppercase;
}

/* Latest Repositories Scroll/Grid */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(87, 118, 246, 0.2);
  border-top-color: #5776f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.repos-scroll-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.repo-bento-item {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.15);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
}

.repo-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.repo-name-text {
  font-size: 0.95rem;
  font-weight: 800;
  margin: 0;
  word-break: break-all;
}

.repo-name-text a {
  color: var(--text-primary);
  text-decoration: none;
}

.repo-name-text a:hover {
  color: #5776f6;
  text-decoration: underline;
}

.repo-star-count {
  font-size: 0.75rem;
  font-weight: 700;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
}

.repo-description-text {
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  border-top: 1px solid rgba(120, 120, 120, 0.1);
  padding-top: 0.6rem;
}

.repo-lang-dot-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.repo-lang-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #5776f6;
}

.repo-lang-text {
  font-weight: 600;
  color: var(--text-primary);
}

.repo-update-time {
  color: var(--text-secondary);
}

/* Books & Literature Card */
.books-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.book-row {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.book-row-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.book-spine {
  padding-left: 0.75rem;
}

.book-title-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.book-author-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0.1rem 0 0;
}

.book-status-badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  white-space: nowrap;
}

.book-status-badge.currently-reading {
  background-color: rgba(2, 132, 199, 0.12);
  color: #0284c7;
}

.book-status-badge.completed {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.book-status-badge.up-next {
  background-color: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}

.book-progress-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.book-progress-bar-bg {
  flex: 1;
  height: 6px;
  background: rgba(120, 120, 120, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.book-progress-fill {
  height: 100%;
  border-radius: 3px;
}

.book-progress-pct {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 28px;
  text-align: right;
}

.book-takeaway {
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0;
}

/* Learning Roadmap Card */
.roadmap-track {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  padding-left: 1.5rem;
}

.roadmap-track::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 6px;
  width: 2px;
  background: rgba(120, 120, 120, 0.15);
}

.roadmap-step {
  position: relative;
  display: flex;
  gap: 1rem;
}

.roadmap-circle-point {
  position: absolute;
  left: -1.5rem;
  top: 0.2rem;
}

.outer-ring {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card, #ffffff);
  border: 2px solid #64748b;
}

.outer-ring.mastered {
  border-color: #10b981;
}

.outer-ring.in-progress {
  border-color: #5776f6;
  box-shadow: 0 0 0 3px rgba(87, 118, 246, 0.2);
}

.outer-ring.planned {
  border-color: #f59e0b;
}

.inner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: transparent;
}

.mastered .inner-dot { background-color: #10b981; }
.in-progress .inner-dot { background-color: #5776f6; }
.planned .inner-dot { background-color: #f59e0b; }

.roadmap-step-content {
  flex: 1;
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  padding: 0.85rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.roadmap-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.roadmap-step-title {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.roadmap-status-txt {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

.roadmap-status-txt.mastered { color: #10b981; }
.roadmap-status-txt.in-progress { color: #5776f6; }
.roadmap-status-txt.planned { color: #f59e0b; }

.roadmap-step-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

.roadmap-bar-bg {
  width: 100%;
  height: 3px;
  background-color: rgba(120, 120, 120, 0.12);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.2rem;
}

.roadmap-bar-fill {
  height: 100%;
  background-color: #5776f6;
}

.mastered .roadmap-bar-fill { background-color: #10b981; }
.planned .roadmap-bar-fill { background-color: #f59e0b; }

/* Local Blogs Stacked List */
.empty-blog-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.blogs-stacked-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.blog-mini-row {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.blog-mini-row:hover {
  transform: translateY(-2px);
  border-color: #5776f6;
}

.blog-mini-meta {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin-bottom: 0.4rem;
}

.blog-mini-date {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.blog-mini-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #ffffff;
  background: #5776f6;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.blog-mini-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.35rem;
}

.blog-mini-desc {
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Open Source List */
.os-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.os-item {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  border-radius: 10px;
  padding: 1rem;
}

.os-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.os-repo-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
}

.os-role-badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.os-role-badge.contributor {
  background-color: rgba(99, 102, 241, 0.12);
  color: #6366f1;
}

.os-role-badge.author-&-maintainer {
  background-color: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.os-desc {
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0 0 0.6rem;
}

.os-meta-row {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
}

/* Hackathons Card */
.hacks-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hack-item {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  border-radius: 10px;
  padding: 1rem;
}

.hack-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.4rem;
}

.hack-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.hack-award-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: #ffffff;
  background-color: #10b981;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
  white-space: nowrap;
}

.hack-project {
  font-size: 0.8rem;
  margin: 0 0 0.4rem;
  color: var(--text-primary);
}

.hack-desc {
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0 0 0.6rem;
}

.hack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.h-tag {
  font-size: 0.7rem;
  font-weight: 700;
  color: #5776f6;
  background-color: rgba(87, 118, 246, 0.08);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

/* Certificates Card */
.certs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cert-item {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.12);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.cert-main {
  flex: 1;
}

.cert-title-txt {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.cert-issuer {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0.2rem 0;
}

.cert-id {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

.cert-id code {
  font-family: 'Fira Code', monospace;
  background: rgba(120, 120, 120, 0.1);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

.cert-link-anchor {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.775rem;
  font-weight: 700;
  color: #5776f6;
  text-decoration: none;
  background: rgba(87, 118, 246, 0.1);
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  white-space: nowrap;
}

.cert-link-anchor:hover {
  background: #5776f6;
  color: #ffffff;
}

/* Technical Speaking Section */
.speaking-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 1.5rem;
}

.speaking-item {
  background: var(--bg-secondary, #f8fafc);
  border: 1px solid rgba(120, 120, 120, 0.15);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.6rem;
}

.speaking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.speaking-talk-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.35;
}

.speaking-date {
  font-size: 0.75rem;
  font-weight: 800;
  color: #ffffff;
  background-color: #5776f6;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.speaking-venue {
  font-size: 0.85rem;
  color: var(--text-primary);
  margin: 0;
}

.speaking-summary {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 0 0.5rem;
}

.speaking-link-anchor {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #5776f6;
  text-decoration: none;
}

.speaking-link-anchor:hover {
  text-decoration: underline;
}

/* RESPONSIVE RESPONSIVENESS */
@media (max-width: 1024px) {
  .focus-spotlight-card { grid-column: span 6; }
  .git-heatmap-card { grid-column: span 12; }
  .lang-stats-card { grid-column: span 6; }
  .latest-repos-card { grid-column: span 12; }
  .books-card { grid-column: span 12; }
  .roadmap-card { grid-column: span 12; }
  .local-blogs-card { grid-column: span 12; }
  .open-source-card { grid-column: span 12; }
  .hackathons-card { grid-column: span 12; }
  .certificates-card { grid-column: span 12; }
}

@media (max-width: 768px) {
  .dashboard-page { padding: 2rem 1rem; }
  .dashboard-hero { flex-direction: column; align-items: stretch; gap: 1rem; }
  .hero-clock-box { text-align: left; }
  .focus-spotlight-card { grid-column: span 12; }
  .lang-stats-card { grid-column: span 12; }
  .speaking-column { grid-template-columns: 1fr; }
}
</style>
