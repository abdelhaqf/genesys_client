<template>
  <div class="service">
    <div class="ourService" v-scroll-reveal.reset>
      <p class="title">Our Service</p>
      <p class="sub-title">
        <router-link v-if="user" to="/user/dashboard/new">
          <a class="button" href="#">Order Now</a>
        </router-link>
        <router-link v-else to="/register">
          <a class="button" href="#">Order Now</a>
        </router-link>
      </p>
      <div class="ourService-list">
        <div class="ourService-card">
          <div class="img-container">
            <img src="service1.jpg" alt>
          </div>
          <p class="name">Pay Per Click</p>
          <p>Pay-per-click, also known as cost per click, is an internet advertising model used to drive traffic to websites, in which an advertiser pays a publisher when the ad is clicked. Pay-per-click is commonly associated with first-tier search engines.</p>
          <!-- <lorem add="7s"></lorem> -->
        </div>
        <div class="ourService-card">
          <div class="img-container">
            <img src="service2.jpg" alt>
          </div>
          <p class="name">Social Media Marketing</p>
          <p>Social media marketing is a powerful way for businesses of all sizes to reach prospects and customers. Your customers are already interacting with brands through social media, and if you're not speaking directly to your audience through social platforms like Facebook, Twitter, Instagram, and Pinterest, you're missing out! Great marketing on social media can bring remarkable success to your business, creating devoted brand advocates and even driving leads and sales.</p>
          <!-- <lorem add="7s"></lorem> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoremIpsum from "vue-lorem-ipsum";
export default {
  name: "service",
  components: { lorem: LoremIpsum },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.service {
  * {
    text-align: center !important;
  }
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(2, minmax(100px, auto));
  grid-row-gap: 100px;
  grid-template-areas:
    ". . . . . ."
    ". ourService ourService ourService ourService .";
  * {
    // background-color: red;
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

  .ourService {
    grid-area: ourService;
    .title {
      text-align: center;
      font-size: 2em;
      color: black;
      // margin-bottom: 0.5em;
    }
    .sub-title {
      text-align: center;
      font-size: 1em;
      margin-bottom: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .ourService-list {
      display: flex;
      flex-wrap: wrap;

      .ourService-card {
        flex-basis: 45%;
        flex-grow: 1;
        margin: 2em 1em;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 200px 50px auto;
        .img-container {
          border-radius: 6px 6px 0 0;

          width: 100%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .name {
          color: dimgray;
          font-size: 1.4em;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>