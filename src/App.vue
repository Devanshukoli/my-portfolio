<script setup>
import Header from "./components/Header.vue";
import IntroductionView from "./view/IntroductionView.vue";
import ServiceView from "./view/ServiceView.vue";
import BlogView from "./view/BlogView.vue";
import ContactView from "./view/ContactView.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />

  <main>
    <a id="button"></a>
    <IntroductionView />
    <ServiceView />
    <BlogView />
    <ContactView />
    
  </main>

  <Footer />
</template>

<style lang="css" scoped></style>
