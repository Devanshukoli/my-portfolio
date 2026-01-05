<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import ThemeToggle from "./ThemeToggle.vue";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape" && mobileMenuOpen.value) {
    closeMobileMenu();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
});

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <header>
    <router-link to="/" class="logo" @click="closeMobileMenu">
      <h1>Devanshu Koli</h1>
    </router-link>

    <!-- Hamburger Menu Button -->
    <button
      class="mobile-menu-toggle"
      @click="toggleMobileMenu"
      :class="{ active: mobileMenuOpen }"
      aria-label="Toggle menu"
      :aria-expanded="mobileMenuOpen"
      aria-controls="main-navigation"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav :class="['nav-menu', { 'mobile-open': mobileMenuOpen }]">
      <ul>
        <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
        <li>
          <router-link to="/about" @click="closeMobileMenu">About</router-link>
        </li>
        <li>
          <router-link to="/project" @click="closeMobileMenu"
            >Projects</router-link
          >
        </li>
        <li>
          <router-link to="/blog" @click="closeMobileMenu">Blog</router-link>
        </li>
        <li>
          <router-link to="/tracker" @click="closeMobileMenu"
            >Tracker</router-link
          >
        </li>
        <li>
          <router-link to="/contact" @click="closeMobileMenu"
            >Contact</router-link
          >
        </li>
        <li class="theme-toggle-item">
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="css" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: var(--bg-primary);
  box-shadow: 0 2px 10px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  max-width: 100%;
}

/* Logo */
.logo {
  text-decoration: none;
  padding: 0;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo h1 {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
}

.logo:after {
  display: none;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.mobile-menu-toggle span {
  width: 28px;
  height: 3px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Navigation */
.nav-menu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.nav-menu ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
  gap: 0.5rem;
}

.nav-menu li {
  position: relative;
}

.nav-menu a {
  color: var(--text-primary);
  text-decoration: none;
  display: inline-block;
  padding: 0.8rem 1.2rem;
  position: relative;
  transition: color 0.3s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-menu a:after {
  content: "";
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  width: 0;
  height: 2px;
  background: #5776f6;
  transition:
    width 0.3s ease,
    left 0.3s ease;
}

.nav-menu a:hover:after,
.nav-menu a.router-link-active:after {
  width: 100%;
  left: 0;
}

.nav-menu a:hover {
  color: #5776f6;
}

.nav-menu a.router-link-active {
  color: #c59c35;
}

.theme-toggle-item {
  margin-left: 0.5rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  header {
    padding: 1.2rem 1.5rem;
  }

  .logo h1 {
    font-size: 1.4rem;
  }

  .nav-menu ul {
    gap: 0.2rem;
  }

  .nav-menu a {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  header {
    padding: 1rem 1.5rem;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--bg-secondary);
    box-shadow: -5px 0 15px var(--shadow-color);
    transition: right 0.3s ease;
    padding: 5rem 2rem 2rem;
    overflow-y: auto;
  }

  .nav-menu.mobile-open {
    right: 0;
  }

  .nav-menu ul {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }

  .nav-menu li {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-menu a {
    padding: 1.2rem 0;
    font-size: 1.1rem;
    width: 100%;
    display: block;
  }

  .nav-menu a:after {
    bottom: 0.8rem;
  }

  .theme-toggle-item {
    margin-left: 0;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
}

@media (max-width: 480px) {
  header {
    padding: 0.8rem 1rem;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .nav-menu {
    width: 100%;
    right: -100%;
  }

  .mobile-menu-toggle span {
    width: 24px;
  }
}
</style>
