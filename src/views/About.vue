<template>
  <div class="about">
    <div class="about-us" v-scroll-reveal.reset>
      <div class="word-container">
        <p class="title">About Us</p>
        <p>The demand for information services for advertising and brand marketing on social media is increasing, this service includes the ease of accessing information needed by companies and ease in various actions such as registering to market a brand or any activity that concerns activities on social media.</p>
        <!-- <lorem add="6s"></lorem> -->
      </div>
    </div>
    <div class="team" v-scroll-reveal.reset>
      <p class="title">TEAM</p>
      <p class="sub-title">Team work builds trust and trust builds growth</p>
      <div class="team-list">
        <div class="team-card">
          <div class="img-container">
            <img src="person1.jpg" alt>
          </div>
          <p class="name">Galeh Adien Nugroho</p>
          <p>
            Genesys digital marketing agency that helps you promote your products or services online.
            We always help our happy clients to boost their brand awareness, to increase their sales by generating more leads, and to growth-hack their revenue.
          </p>
        </div>
        <div class="team-card">
          <div class="img-container">
            <img src="person2.jpg" alt>
          </div>
          <p class="name">Rully Setiawan</p>
          <p>
            Digital marketing agency that helps you promote your products or services online.
            We always help our happy clients to boost their brand awareness, to increase their sales by generating more leads, and to growth-hack their revenue.
          </p>
        </div>
        <div class="team-card">
          <div class="img-container">
            <img src="person3.jpg" alt>
          </div>
          <p class="name">Muhammad Fachry</p>
          <p>We find it interesting and challenging in seeing how we do business. We leverage our business by leveraging our clients business in various industries. We lift up small enterprise to medium enterprise, medium enterprise to growing enterprise and big companies to sustain and keep growing.</p>
        </div>
        <div class="team-card"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LoremIpsum from "vue-lorem-ipsum";
export default {
  name: "about",
  components: { lorem: LoremIpsum },
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
.about {
  * {
    text-align: center !important;
  }
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(3, minmax(100px, auto));
  grid-row-gap: 100px;
  grid-template-areas:
    ". . . . . ."
    ". about about about about ."
    ". team team team team .";
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

  .about-us {
    grid-area: about;
    display: flex;
    flex-wrap: wrap;
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
        text-align: center;
      }
    }
  }
  .team {
    grid-area: team;
    .title {
      text-align: center;
      font-size: 2em;
      color: dodgerblue;
      margin-bottom: 0.5em;
    }
    .sub-title {
      text-align: center;
      font-size: 1em;
      margin-bottom: 1em;
    }
    .team-list {
      display: flex;
      flex-wrap: wrap;

      .team-card {
        flex-basis: 45%;
        flex-grow: 1;
        margin: 2em 1em;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 200px 50px auto;
        .img-container {
          border-radius: 6px 6px 0 0;
          width: 50%;
          margin: 0 auto;
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
