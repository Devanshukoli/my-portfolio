<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);

const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  errorMessage.value = '';
  successMessage.value = '';
  if (!name.value || !email.value || !message.value) {
    errorMessage.value = 'All fields are required.';
    return;
  }
  if (!validateEmail(email.value)) {
    errorMessage.value = 'Please enter a valid email address.';
    return;
  }
  loading.value = true;
  try {
    const res = await fetch(`${process.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, message: message.value })
    });
    const data = await res.json();
    if (data.success) {
      successMessage.value = 'Message sent! I will get back to you soon.';
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      errorMessage.value = data.error || 'Failed to send message.';
    }
  } catch (err) {
    errorMessage.value = 'Failed to send message.';
  }
  loading.value = false;
};
</script>

<template>
  <section id="contactus">
    <div class="contact-container">
      <h2>Contact Me!</h2>
      <h4>Just send me what you like to discuss</h4>

      <form @submit="handleSubmit">
        <input type="text" v-model="name" placeholder="Your Name" required />
        <input type="email" v-model="email" placeholder="Your Email" required />
        <textarea
          rows="5"
          v-model="message"
          placeholder="Your Message"
          required
        ></textarea>
        <button type="submit" :disabled="loading">{{ loading ? 'Sending...' : 'Send' }}</button>
        <div v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</div>
        <div v-if="successMessage" style="color: green; margin-top: 10px;">{{ successMessage }}</div>
      </form>
    </div>
  </section>
</template>

<style scoped>
#contactus {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-container {
  background: var(--bg-card);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px var(--shadow-color);
  max-width: 500px;
  width: 100%;
}

h2 {
  margin-top: 0;
  color: var(--text-primary);
}

h4 {
  margin-bottom: 20px;
  color: var(--text-secondary);
  font-weight: normal;
}

form {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s;
}

input:focus,
textarea:focus {
  border-color: #5776f6;
  outline: none;
}

button {
  padding: 12px;
  background-color: #5776f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3e5fe0;
}
</style>
