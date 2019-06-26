<template>
  <div class="stepper">
    <div class="legend">
      <span
        v-for="(item,index) in legends"
        :key="index"
        :class="{active: step == index}"
      >{{index + 1}}.{{item}}</span>
    </div>
    <div v-show="step==0" style="width: 100%">
      <slot name="content1"></slot>
    </div>
    <div v-show="step==1" style="width: 100%">
      <slot name="content2"></slot>
    </div>
    <div v-show="step==2" style="width: 100%">
      <slot name="content3"></slot>
    </div>
    <div class="nav">
      <span id="prev" href="#" v-if="step > 0" @click.prevent="prev">prev</span>
      <span id="next" href="#" v-if="step < max -1" @click.prevent="next">next</span>
      <span id="next" href="#" v-if="step == max -1 && validation" @click.prevent="submit">submit</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "stepper",
  props: ["legends", "validation"],
  data() {
    return { step: 0, max: 0 };
  },
  mounted() {
    this.max = this.legends.length;
  },
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    submit() {
      this.$emit("submit");
      this.step = 0;
    }
  }
};
</script>
<style lang='scss' scoped>
.stepper {
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding: 1rem;
  .legend {
    span {
      padding: 0.5em 1em;
      border-bottom: 2px solid azure;
      display: inline-block;
    }
    .active {
      border-bottom: 2px solid salmon !important;
    }
  }
  .content {
    width: 100%;
    min-height: 100px;
    margin: 2em;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-row-gap: 10px;
    * {
      padding: 0.5rem;
    }
    .agreement {
      grid-column: 1 / span 2;
      height: 200px;
      border: 1px solid black;
      border-radius: 6px;
      overflow-y: scroll;
      padding: 1rem;
      text-align: justify;
    }
    .agree {
      grid-column: 1 / span 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .nav {
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    #prev {
      grid-column: 1/1;
      color: dodgerblue !important;
      border: 2px solid dodgerblue;
    }
    #next {
      grid-column: 2/2;
      background-color: dodgerblue;
    }
    // span {
    //   padding: 0.5em 1em;
    //   cursor: pointer;
    //   border: 2px solid rgba(black, 0);
    //   &:hover {
    //     border-bottom: 2px solid salmon;
    //   }
    // }
    span {
      padding: 0.5em 1em;
      // border: 0;
      color: white;
      margin-top: 1em;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: deepskyblue;
      }
    }
  }
}
</style>