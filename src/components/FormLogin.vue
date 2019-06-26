<template>
  <div class="form-login">
    <input type="text" v-model="user.username" placeholder="username">
    <input type="password" v-model="user.password" placeholder="password">
    <input type="submit" value="login" @click="login">
  </div>
</template>
<script>
import md5 from "md5";
export default {
  name: "formLogin",
  data() {
    return { user: {} };
  },
  computed: {
    curUser() {
      // if(this.$store.getters)
      return this.$store.getters.user;
    }
  },
  methods: {
    login() {
      this.user.password = md5(this.user.password);
      this.$store.dispatch("loginUser", this.user);
      // setTimeout(() => {
      //   this.$snotify.info("let's login!");
      // }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.form-login {
  display: flex;
  flex-direction: column;
  padding: 1em;
  * {
    margin-bottom: 0.5em;
  }
  input {
    padding: 0.5em 1em;
  }
  input[type="submit"] {
    background-color: dodgerblue;
    border: 0;
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
</style>