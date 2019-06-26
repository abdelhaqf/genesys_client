<template>
  <div class="form-register">
    <Stepper :legends="['Credential','Bio','Agreement']" :validation="validated" @submit="register">
      <div slot="content1" class="content">
        <a>email</a>
        <input type="text" v-model="user.email">
        <a>username</a>
        <input type="text" v-model="user.username">
        <a>password</a>
        <input type="password" v-model="user.password">
        <a>re-enter</a>
        <input type="password" v-model="user.rePassword">
      </div>

      <div slot="content2" class="content">
        <a>company</a>
        <input type="text" v-model="user.company_name">
        <a>first name</a>
        <input type="text" v-model="user.first_name">
        <a>last name</a>
        <input type="text" v-model="user.last_name">
        <a>phone</a>
        <input type="text" v-model="user.phone_number">
      </div>

      <div slot="content3" class="content">
        <div class="agreement">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam debitis earum voluptas possimus exercitationem. Facere, possimus. Omnis ullam esse aut, quae maiores perspiciatis quis dolor odio soluta hic repellat voluptatum!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam debitis earum voluptas possimus exercitationem. Facere, possimus. Omnis ullam esse aut, quae maiores perspiciatis quis dolor odio soluta hic repellat voluptatum!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam debitis earum voluptas possimus exercitationem. Facere, possimus. Omnis ullam esse aut, quae maiores perspiciatis quis dolor odio soluta hic repellat voluptatum!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam debitis earum voluptas possimus exercitationem. Facere, possimus. Omnis ullam esse aut, quae maiores perspiciatis quis dolor odio soluta hic repellat voluptatum!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam debitis earum voluptas possimus exercitationem. Facere, possimus. Omnis ullam esse aut, quae maiores perspiciatis quis dolor odio soluta hic repellat voluptatum!
        </div>
        <div class="agree">
          <input type="checkbox" v-model="user.agree"> I agree
        </div>
      </div>
    </Stepper>
  </div>
</template>
<script>
import axios from "axios";
import Stepper from "@/components/Stepper";
export default {
  name: "formRegister",
  components: { Stepper },
  data() {
    return { user: {} };
  },
  mounted() {},
  methods: {
    register() {
      this.$store.dispatch("registerUser", this.user);
      this.user = {};
      this.$snotify.success("User created!");
      setTimeout(() => {
        this.$snotify.info("let's login!");
      }, 1000);
      setTimeout(() => {
        this.$router.push("/login");
      }, 2000);
    }
  },
  computed: {
    validated() {
      return this.user.agree;
    }
  }
};
</script>
<style lang='scss' scoped>
.form-register {
  display: flex;
  justify-content: center;
  // align-items: center;
}
</style>