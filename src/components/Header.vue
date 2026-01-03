<script setup>
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
<header>
  <router-link to="/" class="logo"><h1>Devanshu Koli</h1></router-link>
  <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
    <li><router-link to="/project">Projects</router-link></li>
    <li><router-link to="/blog">Blog</router-link></li>
    <li><router-link to="/tracker">Tracker</router-link></li>
    <li><router-link to="/contact">Contact</router-link></li>
    <li>
      <ThemeToggle />
    </li>
  </ul>
</header>
</template>

<style lang="css" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
}

.logo {
  text-decoration: none;
  padding: 0;
}

.logo h1 {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.logo:after {
  display: none;
}

header > ul {
  display: flex;
  padding: 0;
  list-style: none;
  text-align: center;
  align-items: center;
}

header > li {
  /* position: relative; */
  padding: 15px 0;
}

a {
  color: var(--text-primary);
  text-decoration: none;
  display: inline-block;
  padding: 15px 20px;
  position: relative;
  transition: color 0.3s ease;
}

a:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: var(--text-primary);
  transition:
    width 0.3s ease 0s,
    left 0.3s ease 0s;
  width: 0;
}

a:hover:after {
  width: 100%;
  left: 0;
}

@media screen and (max-height: 300px) {
  ul {
    margin-top: 40px;
  }
}

section {
  padding: 100px 0;
}

section h2.section-heading {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 40px;
}

section h3.section-subheading {
  margin-bottom: 75px;
  text-transform: none;
  font-family: "Droid Serif", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
}

@media (min-width: 768px) {
  section {
    padding: 150px 0;
  }
}
</style>
