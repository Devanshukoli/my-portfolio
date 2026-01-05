<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Devanshukoli', icon: 'fa-github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/Devanshukoli', icon: 'fa-linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/Devanshukoli', icon: 'fa-twitter' }
]

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/project' },
  { name: 'Contact', path: '/contact' }
]
</script>

<template>
  <footer>
    <div class="footer-content">
      <!-- Brand Section -->
      <div class="footer-section brand-section">
        <h2 class="brand-name">Devanshu Koli</h2>
        <p class="brand-tagline">Backend Engineer</p>
        <p class="brand-description">
          Building scalable and robust server-side applications with modern technologies.
        </p>
      </div>

      <!-- Quick Links Section -->
      <div class="footer-section links-section">
        <h3 class="section-title">Quick Links</h3>
        <ul class="quick-links">
          <li v-for="link in quickLinks" :key="link.path">
            <router-link :to="link.path">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Social Section -->
      <div class="footer-section social-section">
        <h3 class="section-title">Connect</h3>
        <div class="social-links">
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.url" 
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.name"
            class="social-link"
          >
            <i :class="['fa', social.icon]"></i>
          </a>
        </div>
        <p class="contact-email">
          <i class="fa fa-envelope"></i>
          devanshu@example.com
        </p>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p class="copyright">
        &copy; {{ currentYear }} Devanshu Koli. All rights reserved.
      </p>
      <p class="made-with">
        Built with <span class="heart">♥</span> using Vue.js
      </p>
    </div>
  </footer>
</template>

<style lang="css" scoped>
footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: var(--text-primary);
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
  border-top: 3px solid #5776f6;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Footer Sections */
.footer-section {
  display: flex;
  flex-direction: column;
}

/* Brand Section */
.brand-section {
  max-width: 400px;
}

.brand-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #c59c35;
  margin-bottom: 0.5rem;
}

.brand-tagline {
  font-size: 1rem;
  color: #5776f6;
  margin-bottom: 1rem;
  font-weight: 600;
}

.brand-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

/* Quick Links Section */
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background: #5776f6;
  border-radius: 2px;
}

.quick-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.quick-links li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  padding-left: 1rem;
}

.quick-links li a::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #5776f6;
  transition: all 0.3s ease;
}

.quick-links li a:hover {
  color: #c59c35;
  transform: translateX(5px);
}

.quick-links li a:hover::before {
  color: #c59c35;
}

/* Social Section */
.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-link {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.social-link:hover {
  background: #5776f6;
  color: white;
  transform: translateY(-5px);
  border-color: #5776f6;
  box-shadow: 0 8px 20px rgba(87, 118, 246, 0.4);
}

.contact-email {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.contact-email i {
  color: #5776f6;
}

/* Footer Bottom */
.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright,
.made-with {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.heart {
  color: #e74c3c;
  display: inline-block;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .brand-section {
    grid-column: 1 / -1;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  footer {
    padding: 2rem 1.5rem 1rem;
    margin-top: 3rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 1.5rem;
  }

  .brand-section {
    text-align: center;
  }

  .section-title {
    text-align: center;
  }

  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .quick-links {
    align-items: center;
  }

  .social-links {
    justify-content: center;
  }

  .contact-email {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    padding-top: 1.5rem;
  }
}

@media (max-width: 480px) {
  footer {
    padding: 1.5rem 1rem 0.8rem;
  }

  .brand-name {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .copyright,
  .made-with {
    font-size: 0.85rem;
  }
}
</style>
