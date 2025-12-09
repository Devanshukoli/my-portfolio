<script setup></script>

<template>
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
              Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
              partiendo abhorreant vituperatoribus.
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
              Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
              partiendo abhorreant vituperatoribus.
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
              Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
              partiendo abhorreant vituperatoribus.
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
              Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
              partiendo abhorreant vituperatoribus.
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
              Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
              partiendo abhorreant vituperatoribus.
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
              Laudem latine persequeris id sed, ex fabulas delectus quo. No vel
              partiendo abhorreant vituperatoribus.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#services > .container {
  max-width: 1320px;
}

.section-bg {
  background: var(--bg-secondary);
}

.section-header {
  all: unset;
}

.section-header > h3 {
  font-size: 2.5rem;
  color: var(--text-primary);
  text-align: center;
  font-weight: 700;
  position: relative;
  margin-bottom: 0.5rem;
}

.section-header > p {
  text-align: center;
  margin: auto;
  padding-bottom: 50px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  width: 70%;
}

@media (max-width: 767px) {
  .section-header p {
    width: 100%;
  }
}

#services > .container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1rem;
}

#services .row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

#services .col-md-6.col-lg-4 {
  flex: 1 1 300px;
  max-width: 350px;
  min-width: 250px;
  margin: 0 0 2rem 0;
  display: flex;
}

#services .box {
  padding: 30px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin: 0 10px 40px 10px;
  background: var(--bg-card);
  box-shadow: 0 10px 29px 0 var(--shadow-color);
  transition: all 0.3s ease-in-out;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

#services .box:hover {
  transform: scale(1.1);
}

#services .icon {
  margin: 0 auto 15px auto;
  padding-top: 12px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

#services .icon .service-icon {
  font-size: 36px;
  line-height: 1;
}

#services .title {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
}

#services .title a {
  color: var(--text-primary);
}

#services .box:hover .title a {
  color: #c59c35;
}
#services .box:hover .title a:hover {
  text-decoration: none;
}
#services .description {
  font-size: 14px;
  line-height: 28px;
  margin-bottom: 0;
  text-align: left;
}

@media (max-width: 1024px) {
  #services .row {
    gap: 1.2rem;
  }
  #services .col-md-6.col-lg-4 {
    max-width: 100%;
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  #services {
    padding: 40px 0 20px 0;
  }
  #services .row {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  #services .col-md-6.col-lg-4 {
    max-width: 100%;
    min-width: 0;
    margin: 0 0 1.5rem 0;
  }
  #services .box {
    padding: 20px;
    font-size: 15px;
  }
  .section-header > h3 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  #services .box {
    padding: 12px;
    font-size: 14px;
  }
  .section-header > h3 {
    font-size: 1.3rem;
  }
  .section-header > p {
    font-size: 1rem;
    padding-bottom: 30px;
  }
}

.intro-header {
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
  background: url("https://40.media.tumblr.com/1b916597d3e174399cb7adadddb66ede/tumblr_nt5uk4psl31ud7rr3o1_1280.jpg")
    no-repeat center center fixed;
  background-size: cover;
  height: 855px;
}

.bg-overlay {
  background: rgba(0, 0, 0, 0.3);
  height: 855px;
}

.intro-message {
  position: relative;
  padding-top: 20%;
  padding-bottom: 20%;
}

.intro-message > h1 {
  margin-top: -50px;
  text-shadow: 2px 1px 2px #000;
  font-size: 4em;
  color: gray;
}

@media (max-width: 767px) {
  .intro-message {
    padding-bottom: 15%;
  }

  .intro-message > h1 {
    font-size: 3em;
  }

  ul.intro-social-buttons > li {
    display: block;
    margin-bottom: 20px;
    padding: 0;
  }

  ul.intro-social-buttons > li:last-child {
    margin-bottom: 0;
  }

  .intro-divider {
    width: 100%;
  }
}
</style>
