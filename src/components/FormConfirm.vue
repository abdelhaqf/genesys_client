<template>
  <div v-if="show" class="confirmation-container">
    <div class="box">
      <slot name="msg"></slot>
      <div class="nav">
        <span @click="yes" class="yes">yes</span>
        <span @click="no" class="no">no</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "confirmation",
  data() {
    return { show: false };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    yes() {
      this.$emit("yes");
      this.close();
    },
    no() {
      this.$emit("no");
      this.close();
    }
  }
};
</script>
<style lang='scss' scoped>
.confirmation-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(black, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    // width: 200px;
    // height: 200px;
    border-radius: 6px;
    background-color: white;
    padding: 1em;
    .nav {
      display: flex;
      justify-content: space-between;
      // border-top: 1px solid dimgray;
      span {
        padding: 0.5em 1em;
        cursor: pointer;
        color: crimson;
        margin-top: 1em;
        border: 2px solid rgba(black, 0);
        &:hover {
          border-bottom: 2px solid salmon;
        }
      }
      .no {
        padding: 0.5em 1em;
        cursor: pointer;
        color: dodgerblue;
        margin-top: 1em;
        border: 2px solid rgba(black, 0);
        &:hover {
          border-bottom: 2px solid dodgerblue;
        }
      }
    }
  }
}
</style>