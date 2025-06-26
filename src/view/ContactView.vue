<script setup></script>

<template>
  <section id="contactus">
    <div class="contact-container">
      <h2>Contact Me!</h2>
      <h4>Just send me what you like to discuss</h4>

      <form onsubmit="return validate(event)">
        <input type="text" id="your-name" placeholder="Your Name" required />
        <input type="email" id="email" placeholder="Your Email" required />
        <textarea
          rows="5"
          id="message"
          placeholder="Your Message"
          required
        ></textarea>
        <button type="submit">Send</button>
        <div id="errorMessage"></div>
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
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

h2 {
  margin-top: 0;
  color: #333;
}

h4 {
  margin-bottom: 20px;
  color: #666;
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
