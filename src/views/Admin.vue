<template>
  <div class="admin-dashboard" v-if="user">
    <div class="nav">
      <h2>admin dashboard</h2>
      <span @click="nav='user'">users</span>
      <span @click="nav='campaign'">campaigns</span>
      <span @click="nav='payment'">payments</span>
      <span @click="nav='report'">reports</span>
      <span @click="nav='review'">reviews</span>
    </div>
    <div class="content">
      <div class="users" v-if="nav=='user'">
        <TableUser></TableUser>
      </div>
      <div class="campaigns" v-if="nav=='campaign'">
        <RadialCampaignAdmin class="radial-campaign"></RadialCampaignAdmin>
        <PieServiceAdmin class="pie-service"></PieServiceAdmin>
        <TableCampaign class="table-campaign"></TableCampaign>
      </div>
      <div class="payments" v-if="nav=='payment'">
        <TablePayment></TablePayment>
      </div>
      <div class="reports" v-if="nav=='report'">
        <BarActionAdmin></BarActionAdmin>
        <BarIncomeAdmin></BarIncomeAdmin>
      </div>
      <div class="reviews" v-if="nav=='review'">
        <TableReviewAdmin></TableReviewAdmin>
      </div>
    </div>
  </div>
</template>
<script>
import TableCampaign from "@/components/TableCampaign";
import TablePayment from "@/components/TablePayment";
import TableUser from "@/components/TableUser";
import TableReviewAdmin from "@/components/TableReviewAdmin";

import RadialCampaignAdmin from "@/components/charts/RadialCampaignAdmin";
import BarIncomeAdmin from "@/components/charts/BarIncomeAdmin";
import BarActionAdmin from "@/components/charts/BarActionAdmin";
import PieServiceAdmin from "@/components/charts/PieServiceAdmin";

export default {
  name: "adminDashboard",
  data() {
    return { nav: "campaign" };
  },
  components: {
    TableCampaign,
    TableUser,
    TablePayment,
    RadialCampaignAdmin,
    BarIncomeAdmin,
    BarActionAdmin,
    PieServiceAdmin,
    TableReviewAdmin
  },
  computed: {
    user() {
      if (this.$store.getters.user) {
        if (this.$store.getters.user.role == "admin")
          return this.$store.getters.user;
      }
      return null;
    }
  }
};
</script>
<style lang='scss' scoped>
.admin-dashboard {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;
  .nav {
    background-color: darkslategray;
    color: white;
    height: 1fr;
    padding-top: 6em;
    display: flex;
    flex-direction: column;
    h2 {
      padding: 1.2rem;
      cursor: default;
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
      align-content: start;
      justify-items: center;
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