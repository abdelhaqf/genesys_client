<template>
  <div v-if="show" class="detail-container">
    <div class="box">
      <div class="head">
        <slot name="action">&nbsp</slot>
        <span @click="close">x</span>
      </div>

      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return { show: false };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.detail-container {
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
    z-index: 99999999;
    border-radius: 6px;
    background-color: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      // background-color: black;
    }
    span {
      padding: 0.5em 1em;
      cursor: pointer;
      color: crimson;

      margin-bottom: 1em;
      border: 2px solid rgba(black, 0);
      &:hover {
        border-bottom: 2px solid salmon;
      }
    }
    .accept {
      color: dodgerblue;
      border: 2px solid rgba(black, 0);
      &:hover {
        border-bottom: 2px solid dodgerblue;
      }
    }
    .content {
      max-height: 300px;
      overflow-x: auto;

      max-width: 500px;
      overflow: auto;
      * {
        white-space: nowrap;
      }
      table,
      td {
        border: none !important;
        white-space: pre-wrap !important;
      }
      td:first-child {
        color: grey;
        font-size: 0.9em;
        white-space: nowrap !important;
      }
    }
  }
}
.progress {
  color: dodgerblue !important;
  border: 2px solid rgba(black, 0);

  &:hover {
    border-bottom: 2px solid dodgerblue !important;
  }
}
</style>