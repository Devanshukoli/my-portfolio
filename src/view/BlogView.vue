<script setup></script>

<template>
  <section class="blog-section">
    <div class="container">
      <div class="section-title">
        <h2>Latest Blogs</h2>
        <p>Thoughts, learnings & experiences</p>
      </div>

      <div class="blog-grid">
        <article class="blog-card">
          <div class="card-img">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Blog thumbnail"
            />
            <span class="tag">JavaScript</span>
          </div>
          <div class="card-content">
            <h3>Understanding Modern JavaScript</h3>
            <p>
              Exploring the latest features and best practices in modern
              JavaScript development...
            </p>
            <div class="card-footer">
              <span class="date">June 15, 2024</span>
              <a href="#" class="read-more">Read More →</a>
            </div>
          </div>
        </article>

        <article class="blog-card">
          <div class="card-img">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Blog thumbnail"
            />
            <span class="tag">Web Dev</span>
          </div>
          <div class="card-content">
            <h3>CSS Grid Mastery</h3>
            <p>
              A comprehensive guide to mastering CSS Grid layout system for
              modern web design...
            </p>
            <div class="card-footer">
              <span class="date">June 10, 2024</span>
              <a href="#" class="read-more">Read More →</a>
            </div>
          </div>
        </article>
      </div>

      <!-- here comes the 'read more' button which will take it blog page of portfolio. -->
      <div class="btn-frame">
        <button class="custom-btn btn">
          <a href="./blog.html">Read More</a>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-section {
  padding: 4rem 0;
  background-color: var(--bg-secondary);
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title h2 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-title p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.blog-card {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px var(--shadow-color);
}

.card-img {
  position: relative;
}

.card-img img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--accent-color);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.card-content {
  padding: 1.5rem;
}

.card-content h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.card-content p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.date {
  color: #888;
  font-size: 0.9rem;
}

.read-more {
  color: #4b8cfb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #3670c9;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
  }

  .section-title h2 {
    font-size: 2rem;
  }
}

.btn-frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}

.btn-frame > button {
  margin: 20px;
}

.btn-frame > button > a {
  all: unset;
}

.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow:
    inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn {
  background: rgb(96, 9, 240);
  background: linear-gradient(
    0deg,
    rgba(96, 9, 240, 1) 0%,
    rgba(129, 5, 240, 1) 100%
  );
  border: none;
}
.btn:before {
  height: 0%;
  width: 2px;
}
.btn:hover {
  box-shadow:
    4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.5),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
}
</style>
