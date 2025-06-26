<script setup>
import Header from "./components/Header.vue";
import BlogView from "./view/BlogView.vue";
import ContactView from "./view/ContactView.vue";
import Footer from "./components/Footer.vue";
import ServiceView from "./view/ServiceView.vue";
</script>

<template>
  <Header />

  <main>
    <a id="button"></a>

    <section>
      <!-- Here I want to put my visualizer or similar-->
      <div class="intro-header">
        <div class="bg-overlay">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="intro-message">
                  <h1>Softwar Engineer</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- /.container -->
        </div>
      </div>
    </section>

    <ServiceView />
    <BlogView />
    <ContactView />
    
  </main>

  <Footer />
</template>

<style lang="css" scoped></style>
