<template>
  <div class="home">
    <div class="jumbotron" :class="{'slide1': slide==1,'slide2': slide==2,'slide3': slide==3}">
      <div class="slide" v-if="slide == 1">
        <p>welcome to genesys</p>
        <p>we are team of digital marketing agency</p>
        <router-link to="/register" v-if="!user">
          <a class="button" href="#">Join Now</a>
        </router-link>
      </div>
      <div class="slide" v-if="slide == 2">
        <p>we deliver the best result</p>
        <p>because our customer satisfaction is number one</p>
        <router-link to="/register">
          <a class="button" href="#" v-if="!user">Join Now</a>
        </router-link>
      </div>
      <div class="slide" v-if="slide == 3">
        <p>lets work together</p>
        <!-- <p>register now!</p> -->
        <router-link to="/register" v-if="!user">
          <a class="button" href="#">Join Now</a>
        </router-link>
      </div>
      <div class="slide-nav">
        <span @click="slide = 1" :class="{'active-slide-nav': slide==1}">-</span>
        <span @click="slide = 2" :class="{'active-slide-nav': slide==2}">-</span>
        <span @click="slide = 3" :class="{'active-slide-nav': slide==3}">-</span>
      </div>
    </div>
    <div class="about" v-scroll-reveal.reset>
      <div class="img-container">
        <img src="about.jpg">
      </div>
      <div class="word-container">
        <p class="title">Few Words About Us</p>
        <!-- <lorem add="6s"></lorem> -->
        <p>The demand for information services for advertising and brand marketing on social media is increasing, this service includes the ease of accessing information needed by companies and ease in various actions such as registering to market a brand or any activity that concerns activities on social media.</p>
        <router-link to="/register" v-if="!user">
          <a class="button">Join Now</a>
        </router-link>
      </div>
    </div>
    <div class="feature" v-scroll-reveal.reset>
      <p class="title">Features</p>
      <div class="feature-list">
        <div class="feature-card">
          <div class="icon">
            <ios-heart-icon w="30px" h="30px" animate="beat" style="color: red;"/>
          </div>
          <div class="title">Easy Access</div>
          <div class="content">
            <p>Kami berfokus pada strategi online marketing yang efektif dan mudah di akses serta terukur dan berdasarkan hasil.</p>
            <!-- <lorem add="4s"></lorem> -->
          </div>
        </div>
        <div class="feature-card">
          <div class="icon">
            <ios-pulse-icon w="30px" h="30px" animate="beat" style="color: salmon;"/>
          </div>
          <div class="title">Engagement</div>
          <div class="content">
            <p>Kami menghubungkan merek produk anda melalui miliaran pengguna di berbagai saluran pemasaran internet yg efektif.</p>
            <!-- <lorem add="4s"></lorem> -->
          </div>
        </div>
        <div class="feature-card">
          <div class="icon">
            <ios-phone-portrait-icon w="30px" h="30px" animate="shake" style="color: grey;"/>
          </div>
          <div class="title">Responsive</div>
          <div class="content">
            <p>Jasa marketing online yang menyangkut semua dari berbagai kalangan serta responsive dalam melakukan pelayanan promotion dengan pilihan yang sesuai dengan target pasar.</p>
            <!-- <lorem add="4s"></lorem> -->
          </div>
        </div>
        <div class="feature-card">
          <div class="icon">
            <ios-rocket-icon w="30px" h="30px" animate="beat" style="color: gold;"/>
          </div>
          <div class="title">Fast Response</div>
          <div class="content">
            <p>Kami siap siaga 24 jam dengan memperhatikan produk yg di promosikan dan merespon dengan cepat agar produk yang di pasarkan melalui jasa digital marketing kami, dan membantu anda terlibat dengan audiens anda.</p>
            <!-- <lorem add="4s"></lorem> -->
          </div>
        </div>
      </div>
    </div>
    <div class="result" v-scroll-reveal.reset="{beforeReveal: () => {resets()}}">
      <p class="title">Results</p>
      <p class="sub-title">What We Do With Heart Will Never Betray Us</p>
      <div class="result-list">
        <div class="card">
          <p class="number">
            <countTo ref="count1" :startVal="0" separator="." :endVal="478" :duration="3000"></countTo>
          </p>
          <p class="content">Clients</p>
        </div>
        <div class="card">
          <p class="number">
            <countTo ref="count2" :startVal="0" separator="." :endVal="1722" :duration="3000"></countTo>
          </p>
          <p class="content">Projects</p>
        </div>

        <div class="card">
          <p class="number">
            <countTo
              ref="count3"
              :startVal="0"
              separator="."
              :endVal="56000"
              suffix="+"
              :duration="3000"
            ></countTo>
          </p>
          <p class="content">Hours of Support</p>
        </div>
        <div class="card">
          <p class="number">
            <countTo ref="count4" :startVal="0" separator="." :endVal="339" :duration="3000"></countTo>
          </p>
          <p class="content">Hard Workers</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoremIpsum from "vue-lorem-ipsum";
import countTo from "vue-count-to";
export default {
  name: "home",
  components: { lorem: LoremIpsum, countTo },
  mounted() {
    setInterval(() => {
      this.slide++;
      if (this.slide == 4) this.slide = 1;
    }, 4000);
  },
  data() {
    return { slide: 1 };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    resets() {
      this.$refs.count1.reset();
      this.$refs.count1.start();

      this.$refs.count2.reset();
      this.$refs.count2.start();

      this.$refs.count3.reset();
      this.$refs.count3.start();

      this.$refs.count4.reset();
      this.$refs.count4.start();
    }
  }
};
</script>
<style lang='scss' scoped>
.home {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 500px repeat(3, minmax(100px, auto));
  grid-row-gap: 100px;
  grid-template-areas:
    "jumbo jumbo jumbo jumbo jumbo jumbo"
    ". about about about about ."
    ". feature feature feature feature ."
    ". result result result result .";
  * {
    // background-color: red;
  }
  a {
    text-decoration: none;
  }
  .button {
    cursor: pointer;
    margin-top: 1.5em;
    text-decoration: none;
    color: dodgerblue !important;
    border: 2px solid dodgerblue;
    border-radius: 4px;
    font-size: 1.2em;
    padding: 0.5em 1em;
    display: grid;
    width: fit-content;
  }
  .button:hover {
    color: gold !important;
  }
  .jumbotron {
    grid-area: jumbo;

    background-color: black;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    * {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .slide {
      flex-direction: column;
      background-color: rgba(black, 0.5);
      width: 100%;
      height: 90%;
      p:first-child {
        font-size: 2em;
        font-weight: bold;
        text-transform: uppercase;
      }
      p:nth-child(2) {
        margin-top: 1em;
        color: rgba(white, 0.7);
      }
    }
    .slide-nav {
      background-color: rgba(black, 0.5);
      height: 10%;

      * {
        font-size: 2em;
        font-weight: bold;
        margin: 0 4px;
        cursor: pointer;
      }
      .active-slide-nav {
        color: teal;
      }
    }
  }
  .slide1 {
    background-image: url("~@/assets/city1.jpg");
  }
  .slide2 {
    background-image: url("~@/assets/city2.jpg");
  }
  .slide3 {
    background-image: url("~@/assets/city3.jpg");
  }
  .about {
    grid-area: about;
    display: flex;
    flex-wrap: wrap;
    .img-container {
      border: 4px solid white;
      border-radius: 4px;
      flex-basis: 50%;
      min-width: 350px;
      flex-grow: 1;
      height: 360px;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .word-container {
      flex-basis: 50%;
      min-width: 350px;
      flex-grow: 1;
      padding: 0.5em 1em;
      color: dimgray;
      .title {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 0.5em;
      }
    }
  }
  .feature {
    grid-area: feature;
    .title {
      text-align: center;
      font-size: 2em;
      color: dodgerblue;
      margin-bottom: 1em;
    }
    .feature-list {
      display: flex;
      flex-wrap: wrap;

      .feature-card {
        flex-basis: 45%;
        flex-grow: 1;
        margin: 1em 1em;
        display: grid;
        grid-template-columns: 40px auto;
        .icon {
        }
        .title {
          grid-column: 2 / 2;
          color: dimgray;
          font-size: 1.4em;
          font-weight: bold;
          text-align: left;
        }
        .content {
          grid-column: 2/2;
          grid-row: 2/2;
        }
      }
    }
  }
  .result {
    grid-area: result;
    margin-bottom: 60px;
    .title {
      text-align: center;
      font-size: 2em;
      font-weight: bold;
    }
    .sub-title {
      text-align: center;
      font-size: 1em;
      margin-bottom: 1em;
    }
    .result-list {
      display: flex;
      flex-wrap: wrap;
      .card {
        flex-basis: 24%;
        min-width: 150px;
        padding: 1em;
        flex-grow: 1;
        flex-shrink: 0;

        * {
          text-align: center;
        }
        .number {
          color: mediumspringgreen;
          font-size: 3em;
        }
        .content {
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>