import './assets/style.css'

import {createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount(`#app`)

// Handle blog read more button click
// document.addEventListener("DOMContentLoaded", () => {
//   const readMoreBtn = document.querySelector(".custom-btn.btn");
//   if (readMoreBtn) {
//     readMoreBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       window.location.href = "/blog.html";
//     });
//   }
// });
