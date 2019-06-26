<template>
  <div class="register">
    <div class="ourregister" v-scroll-reveal.reset>
      <div class="ourregister-list">
        <div class="ourregister-card">
          <p>Glad you join us!</p>
          <!-- <input type="text" placeholder="username" v-model="username">
          <input type="password" placeholder="password" v-model="password">
          <input type="submit" value="Log In" @click="register">-->
          <FormRegister></FormRegister>

          <router-link to="/login">Already have an account?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FormRegister from "@/components/FormRegister";

export default {
  name: "register",
  components: { FormRegister }
  // mounted() {},
  // data() {
  //   return {
  //     username: "",
  //     password: "",
  //     user: {}
  //   };
  // },
  // methods: {
  //   reset() {
  //     this.username = "";
  //     this.password = "";
  //   },
  //   register() {
  //     let formData = new FormData();
  //     formData.append("username", this.username);
  //     formData.append("password", this.password);
  //     formData.append("method", "register");

  //     axios({
  //       method: "post",
  //       url: "http://localhost/genesys7/user.php",
  //       data: formData,
  //       config: { headers: { "Content-Type": "multipart/form-data" } }
  //     })
  //       .then(resp => {
  //         console.log(resp);
  //         this.$snotify.success("Login success!");
  //         this.reset();
  //         this.user = resp.data;
  //         this.$ls.set("user", resp.data);
  //         setTimeout(() => {
  //           this.$router.push("/user/dashboard");
  //         }, 1000);
  //       })
  //       .catch(err => {
  //         this.$snotify.warning("Wrong register!");
  //         console.log(err);
  //       });
  //   }
  // }
};
</script>
<style lang='scss' scoped>
.register {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px repeat(2, minmax(100px, auto));
  grid-row-gap: 100px;
  grid-template-areas:
    ". . . . . ."
    ". ourregister ourregister ourregister ourregister  .";
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

  .ourregister {
    grid-area: ourregister;
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
    .ourregister-list {
      display: flex;
      flex-wrap: wrap;

      .ourregister-card {
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
        input {
          font-size: 1.5em;
        }
        input[type="submit"] {
          background-color: dodgerblue;
          color: white;
          border: none;
          font-size: 1em;
          padding: 0.5em 1em;
          margin: 1em 2em 0.5em 2em;
          border-radius: 6px;
          // width: 90% !important;
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