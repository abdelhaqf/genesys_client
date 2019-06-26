<template>
  <div class="contact">
    <div class="ourcontact" v-scroll-reveal.reset>
      <p class="title">Our Contact & Location</p>
      <p class="sub-title"></p>
      <div class="ourcontact-list">
        <div class="ourcontact-card">
          <div class="img-container">
            <ios-phone-portrait-icon w="30px" h="30px" animate="shake" style="color: dodgerblue;"/>
          </div>
          <p class="name">0858 851 2344</p>
        </div>
        <div class="ourcontact-card">
          <div class="img-container">
            <ios-mail-icon w="30px" h="30px" animate="shake" style="color: dodgerblue;"/>
          </div>
          <p class="name">genesys@business.com</p>
        </div>
      </div>
    </div>
    <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4127104375225!2d106.73625305083651!3d-6.2091705625291835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f74583703251%3A0xf977128d7aa40090!2sUniversitas+Mercu+Buana!5e0!3m2!1sid!2sid!4v1560798304094!5m2!1sid!2sid"
        width="100%"
        height="450"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
<script>
import LoremIpsum from "vue-lorem-ipsum";
export default {
  name: "contact",
  components: { lorem: LoremIpsum },
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.contact {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(2, minmax(100px, auto));
  grid-row-gap: 40px;
  grid-template-areas:
    ". . . . . ."
    ". ourcontact ourcontact ourcontact ourcontact ."
    "map map map map map map";
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

  .ourcontact {
    grid-area: ourcontact;
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
    .ourcontact-list {
      display: flex;
      flex-wrap: wrap;

      .ourcontact-card {
        flex-basis: 45%;
        flex-grow: 1;
        margin: 1em 1em;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 40px 50px;
        .img-container {
          text-align: center;
          width: 100%;
          img {
            width: 100%;
          }
        }
        .name {
          color: dimgray;
          font-size: 1.4em;
          font-weight: bold;
          // color: dodgerblue;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .map {
    grid-area: map;
    margin-bottom: 80px;
  }
}
</style>