<template>
  <div class="testimoni">
    <div class="testi">
      <p class="title">Testimonials</p>
      <p
        class="sub-title"
      >Berikut adalah beberapa testimoni dari para client yang sudah percaya untuk bekerjasama dengan kami</p>
      <!-- <lorem add="3s"></lorem> -->
      <div class="testi-list">
        <div
          class="testi-card"
          v-for="(item) in $store.getters.acceptedReviews"
          :key="item.testimonial_id"
        >
          <div class="img-container">
            <img :src="'http://localhost/genesys_api/upload/'+item.img" alt>
          </div>
          <p class="name">{{item.name}}</p>
          <p class="company">({{item.company}})</p>
          <star-rating :read-only="true" :star-size="20" v-model="item.rating"></star-rating>
          {{item.comment}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoremIpsum from "vue-lorem-ipsum";
export default {
  name: "testimoni",
  components: { lorem: LoremIpsum },
  mounted() {
    this.$store.dispatch("getAcceptedReviews");
  },
  data() {
    return {};
  },
  computed: {
    reiews() {
      var result = $store.getters.acceptedReviews;

      return result;
    }
  },
  methods: {
    getUserImg(id) {
      // return this.$store.getters
    }
  }
};
</script>
<style lang='scss' scoped>
.testimoni {
  * {
    text-align: center !important;
  }
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(1, minmax(100px, auto));
  grid-row-gap: 100px;
  grid-template-areas:
    ". . . . . ."
    ". testi testi testi testi ."
    ". . . . . .";

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

  .testi {
    grid-area: testi;
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
    .testi-list {
      display: flex;
      flex-wrap: wrap;

      .testi-card {
        flex-basis: 45%;
        flex-grow: 1;
        margin: 2em 1em;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 100px 38px auto auto;
        justify-items: center;
        .img-container {
          text-align: center;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: flex-start;

          border-radius: 6px 6px 0 0;
          overflow: hidden;
          img {
            width: 200px;
          }
        }
        .name {
          color: dimgray;
          font-size: 1.4em;
          font-weight: bold;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          align-items: center;
        }
        .company {
          // color: gold;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>