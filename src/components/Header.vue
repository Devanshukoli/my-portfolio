<script setup>
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
<header>
  <h1 href="#">Devanshu Koli</h1>
  <ul>
    <li><a href="./about.html">About</a></li>
    <li><a href="./project.html">Project</a></li>
    <li><a href="./blog.html">Blogs</a></li>
    <li><a href="./contact.html">Contact</a></li>
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
