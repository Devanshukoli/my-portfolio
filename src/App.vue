<script setup>
import Header from "./components/Header.vue";
import BlogView from "./view/BlogView.vue";
import ContactView from "./view/ContactView.vue";
import Footer from "./components/Footer.vue";
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

    <section id="services" class="services section-bg">
      <div class="container">
        <header class="section-header">
          <h3>Services</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
            saepe, assumenda commodi non modi aliquid debitis sunt quidem ipsum
            praesentium quo! Modi assumenda architecto magnam tempora provident
            voluptatum ratione fuga?
          </p>
        </header>

        <!-- This below is card -->
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="box">
              <div class="icon" style="background: #000">
                <i
                  class="fa fa-clipboard service-icon"
                  style="color: #c59c35"
                ></i>
              </div>

              <h4 class="title"><a href="">Service 2</a></h4>

              <p class="description">
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="box">
              <div class="icon" style="background: #000">
                <i
                  class="fa fa-clipboard service-icon"
                  style="color: #c59c35"
                ></i>
              </div>

              <h4 class="title"><a href="">Service 2</a></h4>

              <p class="description">
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="box">
              <div class="icon" style="background: #000">
                <i
                  class="fa fa-clipboard service-icon"
                  style="color: #c59c35"
                ></i>
              </div>

              <h4 class="title"><a href="">Service 2</a></h4>

              <p class="description">
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="box">
              <div class="icon" style="background: #000">
                <i
                  class="fa fa-clipboard service-icon"
                  style="color: #c59c35"
                ></i>
              </div>

              <h4 class="title"><a href="">Service 2</a></h4>

              <p class="description">
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="box">
              <div class="icon" style="background: #000">
                <i
                  class="fa fa-clipboard service-icon"
                  style="color: #c59c35"
                ></i>
              </div>

              <h4 class="title"><a href="">Service 2</a></h4>

              <p class="description">
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="box">
              <div class="icon" style="background: #000">
                <i
                  class="fa fa-clipboard service-icon"
                  style="color: #c59c35"
                ></i>
              </div>

              <h4 class="title"><a href="">Service 2</a></h4>

              <p class="description">
                Laudem latine persequeris id sed, ex fabulas delectus quo. No
                vel partiendo abhorreant vituperatoribus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BlogView />
    <ContactView />
    
  </main>

  <Footer />
</template>

<style lang="css" scoped></style>
