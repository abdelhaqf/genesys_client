<template>
  <div class="login">
    <div class="ourlogin" v-scroll-reveal.reset>
      <div class="ourlogin-list">
        <div class="ourlogin-card">
          <p>Welcome Back!</p>
          <FormLogin></FormLogin>

          <router-link to="/register">Create an Account!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormLogin from "@/components/FormLogin";
import axios from "axios";
import LoremIpsum from "vue-lorem-ipsum";
export default {
  name: "login",
  components: { lorem: LoremIpsum, FormLogin }
};
</script>
<style lang='scss' scoped>
.login {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(2, minmax(100px, auto));
  grid-row-gap: 100px;
  grid-template-areas:
    ". . . . . ."
    ". . ourlogin ourlogin . .";

  .ourlogin {
    grid-area: ourlogin;
    .title {
      text-align: center;
      font-size: 2em;
      color: black;
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
    .ourlogin-list {
      display: flex;
      flex-wrap: wrap;

      .ourlogin-card {
        border: 2px solid grey;
        border-radius: 6px;
        padding: 1.5em 1em 0.5em 1em;
        flex-basis: 100%;
        min-width: 300px;
        flex-grow: 1;
        margin: 2em 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        * {
          width: 100%;
          text-align: center;
          margin-bottom: 0.5em;
        }
        p {
          font-size: 1.5em;
          position: absolute;
          top: 0.5em;
          background-color: azure;
          min-width: 200px;
          width: auto;
          padding: 0 10px;
        }
        a {
          text-decoration: none;
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>