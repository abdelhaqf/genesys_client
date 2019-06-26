
<template>
  <div class="user-dashboard" v-if="user">
    <div class="nav">
      <h2 v-if="user">
        {{user.username}}
        <p>{{user.company_name}}</p>
      </h2>
      <span @click="nav='profil'">profile</span>
      <span @click="nav='campaign'">campaigns</span>
      <span @click="nav='new'">create</span>
    </div>
    <div class="content">
      <div class="users" v-if="nav=='profil'">
        <FormUpdateUser></FormUpdateUser>
      </div>
      <div class="campaigns" v-if="nav=='campaign'">
        <TableCampaignUser></TableCampaignUser>
      </div>
      <div class="payments" v-if="nav=='new'">
        <FormCampaign @finish="nav='campaign'"></FormCampaign>
      </div>
    </div>
  </div>
</template>
<script>
import FormUpdateUser from "@/components/FormUpdateUser";
import FormCampaign from "@/components/FormCampaign";
import TableCampaignUser from "@/components/TableCampaignUser";
export default {
  name: "userDashboard",
  data() {
    return { nav: "campaign" };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: { FormCampaign, TableCampaignUser, FormUpdateUser }
};
</script>
<style lang='scss' scoped>
.user-dashboard {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;
  .nav {
    background-color: royalblue;
    color: white;
    height: 1fr;
    // padding: 1em;
    padding-top: 6em;
    display: flex;
    flex-direction: column;
    h2 {
      padding: 1.2rem;
      cursor: default;
      p {
        font-size: 0.8rem;
      }
    }
    span {
      cursor: pointer;
      padding: 0.5em 2em;
      &:hover {
        padding-left: 2.2em;
        background-color: rgba(azure, 0.3);
      }
    }
  }
  .content {
    height: 100%;
    overflow: auto;
    padding: 1em;
    padding-top: 6em;
    .campaigns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        "rc ps"
        "tc tc";

      .radial-campaign {
        grid-area: rc;
        // overflow: auto;
      }
      .pie-service {
        grid-area: ps;
        // overflow: auto;
      }
      .table-campaign {
        grid-area: tc;
      }
    }
  }
  // grid-template-areas: 1fr 4fr;
}
</style>