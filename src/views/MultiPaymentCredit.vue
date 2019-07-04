<template>
  <div class="payment">
    <table>
      <tr v-for="(item) in campaigns" :key="item.campaign_id">
        <td>{{item.service_type}}</td>
        <td>{{item.social_medias}}</td>
        <td>{{item.time_period+' day(s)'}}</td>
        <td>{{item.final_cost | rp}}</td>
      </tr>
      <tr class="sum">
        <td>total</td>
        <td></td>
        <td>{{totalDays+' day(s)'}}</td>
        <td>{{totalCost | rp}}</td>
      </tr>
    </table>
    <table>
      <tr>
        <td></td>
        <td>
          <span>Credit Card Details</span>
        </td>
      </tr>
      <tr>
        <td>card holder</td>
        <td>
          <input type="text" v-model="payment.holder">
        </td>
      </tr>
      <tr>
        <td>card number</td>
        <td>
          <input type="text" v-model="payment.card_number">
        </td>
      </tr>
      <tr>
        <td>card exp</td>
        <td class="exp">
          <input type="text" v-model="payment.card_exp_m" placeholder="MM">
          <input type="text" v-model="payment.card_exp_y" placeholder="YY">
        </td>
      </tr>
      <tr>
        <td>cvv</td>
        <td>
          <input type="text" v-model="payment.cvv">
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="submit" @click="pay" value="pay">
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "payment",
  data() {
    return { payment: {} };
  },
  mounted() {
    this.$store.dispatch("getMyCampaigns", this.$store.getters.user.user_id);
  },
  computed: {
    campaigns() {
      var temp = this.$store.getters.myCampaigns;

      return temp.filter(item => {
        return item.result == "accepted" && item.is_paid == "0";
      });
    },
    totalCost() {
      var count = 0;
      var temp = this.campaigns;
      temp.forEach(x => {
        count += parseInt(x.final_cost);
      });
      return count;
    },
    totalDays() {
      var count = 0;
      var temp = this.campaigns;
      temp.forEach(x => {
        count += parseInt(x.time_period);
      });
      return count;
    }
  },
  methods: {
    pay() {
      this.campaigns.forEach(item => {
        var payment = {};
        this.payment.ammount = item.final_cost;
        this.payment.payment_id = item.campaign_id;
        this.payment.card_exp =
          this.payment.card_exp_m + "/" + this.payment.card_exp_y;
        this.payment.payment_type = "credit";
        this.payment.account_name = "";
        this.payment.account_number = "";
        this.payment.receipt = "";

        this.$store.dispatch("payBill", this.payment);
        this.$store.dispatch("payCampaign", item);
        var progress = {
          campaign_id: item.campaign_id,
          created_at: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        };
        this.$store.dispatch("submitProgress", progress);
        this.$snotify.success("payment success!");
        this.$router.push("/user/dashboard");
      });
      // this.payment.ammount = this.$store.getters.campaign.final_cost;

      // this.payment.payment_id = this.$store.getters.campaign.campaign_id;
      // this.$store.dispatch("payBill", this.payment);
      // this.$store.dispatch("payCampaign", this.$store.getters.campaign);
      // var progress = {
      //   campaign_id: this.$store.getters.campaign.campaign_id,
      //   created_at: new Date()
      //     .toISOString()
      //     .slice(0, 19)
      //     .replace("T", " ")
      // };
      // this.$store.dispatch("submitProgress", progress);
      // this.$store.dispatch("unselectCampaign");
      // this.$snotify.success("payment success!");
      // this.$router.push("/user/dashboard");
    }
  }
};
</script>
<style lang='scss' scoped>
.payment {
  background-image: url("../../public/background1.jpg");
  background-repeat: no-repeat;
  // position: fixed;
  // width: 100%;
  // height: 100%;
  // // background-size: cover;


  padding: 1em;
  padding-top: 6em !important;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    color: grey;
    font-size: 1.2em;
    margin: 1em;
  }
  table {
    border-collapse: collapse;
    td:first-child {
      font-size: 0.8em;
      color: grey;
    }
    .sum {
      td {
        border-top: 1px solid black !important;
      }
      text-transform: uppercase;
      font-weight: bold;
    }
    .exp {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1em;
      // input {
      //   // width: 50%;
      // }
    }
    td {
      padding: 0.5em;
      input,
      select {
        padding: 0.5em 1em;
        width: 100%;
      }
      // select {
      // }
      input[type="submit"] {
        width: 100%;
        background-color: dodgerblue;
        border: none;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
        &:hover {
          background-color: deepskyblue;
        }
      }
    }
  }
}
</style>