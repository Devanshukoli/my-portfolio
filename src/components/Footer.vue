<script setup></script>

<template>
  <footer>
    <div id="divider">
      <p>Made By Yours Truly - <strong>Devanshu Koli</strong></p>
      <ul>
        <li>
          <a href="https://twitter.com/Devanshukoli" target="_blank">
            <span>Twitter</span>
          </a>
        </li>
        <li>
          <a href="https://github.com/Devanshukoli" target="_blank">
            <span>GitHub</span>
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/Devanshukoli" target="_blank">
            <span>LinkedIn</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="css" scoped>
footer {
  background-color: #333;
  color: #fff;
  padding: 2rem;
  margin-top: 50px;
}

footer > #divider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 20px;
}

#divider > p {
  margin: 0;
}

#divider > ul {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

#divider > ul li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

#divider > ul li a:hover {
  color: #4b8cfb;
}

/* Responsive Fixes */
@media (max-width: 768px) {
  .styled-input {
    width: 98%;
  }

  footer > #divider {
    flex-direction: column;
    text-align: center;
  }

  #divider > ul {
    justify-content: center;
  }

  .input-container {
    padding: 10px;
  }
}

/* Markdown Content Styling */
.markdown-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.markdown-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.markdown-content h2 {
  font-size: 2rem;
  margin: 2rem 0 1rem;
  color: #444;
}

.markdown-content h3 {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: #555;
}

.markdown-content p {
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #666;
}

.markdown-content code {
  background: #f4f4f4;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: "Courier New", Courier, monospace;
}

.markdown-content pre {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content pre code {
  background: none;
  padding: 0;
}

.markdown-content a {
  color: #4b8cfb;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content ul,
.markdown-content ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content li {
  margin: 0.5rem 0;
  color: #666;
}
</style>
