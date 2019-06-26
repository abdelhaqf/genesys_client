<template>
  <div class="app">
    <vue-snotify>{{snoti}}</vue-snotify>
    <back-to-top visibleoffset="500" class="to-top">^</back-to-top>
    <div class="fixed-nav">
      <span style="cursor: default;">GENESYS</span>
      <div>
        <router-link to="/">HOME</router-link>
        <router-link to="/about" v-if="!user">ABOUT US</router-link>
        <router-link to="/service">SERVICES</router-link>
        <router-link to="/contact">CONTACT US</router-link>
        <router-link to="/testimoni">TESTIMONI</router-link>
        <a class="dd1" v-if="role=='user'">
          BILLING
          <a class="dd1content">
            <span @click="$router.push('/multipayment/credit')">CREDIT & DEBIT</span>
            <span @click="$router.push('/multipayment/debit')">TRANSFER</span>
          </a>
        </a>
        <router-link to="/login" v-if="!user">LOGIN</router-link>

        <router-link to="/user/dashboard" v-if="role=='user'">USER</router-link>
        <router-link to="/admin/dashboard" v-if="role=='admin'">ADMIN</router-link>
        <a
          v-if="user"
          style="cursor: pointer;"
          @click="$store.dispatch('logoutUser');$router.push('/login')"
        >LOGOUT</a>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="icons">
        <a href="https://www.facebook.com">
          <logo-facebook-icon w="30px" h="30px" style="color: white;"/>
        </a>
        <a href="https://www.twitter.com">
          <logo-twitter-icon w="30px" h="30px" style="color: white;"/>
        </a>
        <a href="https://www/instagram.com">
          <logo-instagram-icon w="30px" h="30px" style="color: white;"/>
        </a>
      </div>
      <p>
        © Copyright
        <b>Genesys</b>. All Rights Reserved 2019
      </p>
    </div>
  </div>
</template>
<script>
import BackToTop from "vue-backtotop";
export default {
  name: "app",
  components: { BackToTop },
  data() {
    return {};
  },
  mounted() {
    var user = this.$ls.get("user");
    if (user) {
      this.$store.dispatch("loginUser", user);
      this.$store.dispatch("getCampaigns");
      this.$store.dispatch("getMyCampaigns", user.user_id);
      var campaign = this.$ls.get("campaign");
      this.$store.dispatch("selectCampaign", campaign);
    }
  },
  computed: {
    snoti() {
      var temp = this.$store.getters.snotify;
      this.$store.commit("setSnotify", {});
      if (!temp.msg) return "";
      if (temp.type == "success") this.$snotify.success(temp.msg);
      if (temp.type == "error") this.$snotify.error(temp.msg);
      return temp;
    },
    user() {
      return this.$store.getters.user;
    },
    role() {
      if (this.user) return this.user.role;
      else return "guest";
    }
  }
};
</script>
<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Montserrat, sans-serif;
  line-height: 1.5em;
  text-align: justify;
}
html,
body,
.app {
  width: 100%;
  height: 100%;
  background-color: mintcream;
}
span {
  display: inline-block;
  cursor: pointer;
}
.router-link-exact-active {
  color: dodgerblue;
}

.app {
  .fixed-nav {
    z-index: 999;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: rgba(black, 1);
    color: white;
    padding: 0.5em 1em;
    span {
      font-size: 2.5em;
      margin-left: 5vw;
      font-weight: bold;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      margin-right: 5vw;
      font-size: 0.8em;
      a {
        flex-shrink: 0;
        padding: 0.5em 1em;
        text-decoration: none;
        color: white;
        border: 2px solid rgba(black, 0);
        &:hover {
          border-bottom: 2px solid lightseagreen;
        }
      }
      .router-link-exact-active {
        color: aquamarine;
      }
      .dd1 {
        position: relative;
        .dd1content {
          display: none;
          position: absolute;
          background-color: black;
          top: 30px;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 99999;
          padding: 0;
          border: none;

          span {
            padding: 0.7rem 1rem;
            width: 100%;
            // padding: 0;
            margin: 0;
            font-size: 0.8rem;
            &:hover {
              background-color: rgba(azure, 0.4);
            }
            // color: ;
          }
        }
        &:hover .dd1content {
          display: block !important;
          // background-color: red !important;
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: dodgerblue;
    color: white;
  }
  .to-top {
    font-size: 2em;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    background-color: rgba(gold, 0.7);
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
}
</style>