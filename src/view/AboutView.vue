<script setup>
const experience = [
  {
    area: 'Backend Development',
    description: 'Building robust and scalable server-side applications using Node.js and Express.js'
  },
  {
    area: 'Database Design',
    description: 'Designing and optimizing MongoDB and MySQL databases for performance and reliability'
  },
  {
    area: 'API Development',
    description: 'Creating RESTful APIs with proper authentication, validation, and documentation'
  },
  {
    area: 'System Architecture',
    description: 'Designing microservices and distributed systems for high availability'
  }
]
</script>

<template>
  <div class="about">
    <div class="container">
      <!-- Header Section -->
      <section class="about-header">
        <h1 class="title">About Me</h1>
        <div class="intro">
          <div class="profile-section">
            <div class="profile-placeholder">
              <span class="initials">DK</span>
            </div>
            <div class="profile-info">
              <h2>Devanshu Koli</h2>
              <p class="role">Backend Engineer</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Bio Section -->
      <section class="bio-section">
        <h2 class="section-title">My Journey</h2>
        <div class="bio-content">
          <p>
            I'm a passionate backend engineer specializing in building high-performance server-side applications.
            With expertise in Node.js, Express.js, and database technologies like MongoDB and MySQL, I create
            scalable solutions that power modern web applications.
          </p>
          <p>
            My approach to software development is rooted in writing clean, maintainable code and following
            best practices. I believe in the importance of proper testing, documentation, and continuous learning
            to stay current with evolving technologies.
          </p>
          <p>
            Beyond coding, I'm committed to understanding business requirements and translating them into
            technical solutions that deliver real value. I thrive in collaborative environments where I can
            contribute to architectural decisions and mentor fellow developers.
          </p>
        </div>
      </section>

      <!-- Expertise Section -->
      <section class="expertise-section">
        <h2 class="section-title">Areas of Expertise</h2>
        <div class="expertise-grid">
          <div v-for="exp in experience" :key="exp.area" class="expertise-card">
            <h3>{{ exp.area }}</h3>
            <p>{{ exp.description }}</p>
          </div>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="tech-stack">
        <h2 class="section-title">Technology Stack</h2>
        <div class="tech-categories">
          <div class="tech-category">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>REST APIs</li>
              <li>WebSockets</li>
            </ul>
          </div>
          <div class="tech-category">
            <h3>Databases</h3>
            <ul>
              <li>MongoDB</li>
              <li>MySQL</li>
              <li>Redis</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
          <div class="tech-category">
            <h3>Tools & Others</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>JWT Authentication</li>
              <li>API Documentation</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Interests Section -->
      <section class="interests-section">
        <h2 class="section-title">What I'm Interested In</h2>
        <div class="interests-content">
          <ul class="interests-list">
            <li>🚀 Performance optimization and scalability</li>
            <li>🔐 Security best practices and implementation</li>
            <li>📊 System design and architecture patterns</li>
            <li>🌱 Learning new technologies and frameworks</li>
            <li>💡 Open source contributions</li>
            <li>📝 Technical writing and knowledge sharing</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
  padding: 4rem 2rem;
  background: var(--bg-primary);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Header Section */
.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.intro {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.profile-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5776f6 0%, #c59c35 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.profile-info h2 {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.role {
  font-size: 1.2rem;
  color: #c59c35;
  font-weight: 600;
}

/* Common Section Styles */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
}

section {
  margin-bottom: 4rem;
}

/* Bio Section */
.bio-content {
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.bio-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.bio-content p:last-child {
  margin-bottom: 0;
}

/* Expertise Section */
.expertise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.expertise-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: all 0.3s ease;
}

.expertise-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px var(--shadow-color);
}

.expertise-card h3 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
}

.expertise-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Tech Stack Section */
.tech-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.tech-category h3 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #c59c35;
  padding-bottom: 0.5rem;
}

.tech-category ul {
  list-style: none;
  padding: 0;
}

.tech-category li {
  font-size: 1.05rem;
  color: var(--text-secondary);
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.tech-category li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #5776f6;
  font-weight: bold;
}

/* Interests Section */
.interests-content {
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.interests-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.interests-list li {
  font-size: 1.1rem;
  color: var(--text-secondary);
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.interests-list li:hover {
  transform: translateX(8px);
  background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(87, 118, 246, 0.1) 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2.2rem;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .expertise-grid,
  .tech-categories,
  .interests-list {
    grid-template-columns: 1fr;
  }

  .bio-content,
  .interests-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }

  .profile-placeholder {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .profile-info h2 {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.4rem;
  }
}
</style>
