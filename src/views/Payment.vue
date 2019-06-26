<template>
  <div class="payment">
    <table>
      <tr>
        <td>campaign id</td>
        <td>{{$store.getters.campaign.campaign_id}}</td>
      </tr>
      <tr>
        <td>estimated time</td>
        <td>{{$store.getters.campaign.time_period}} day(s)</td>
      </tr>
      <tr>
        <td>total price</td>
        <td>{{$store.getters.campaign.final_cost | rp}}</td>
      </tr>
      <tr>
        <td>payment method</td>
        <td>
          <select v-model="payment.payment_type">
            <option value="credit">credit</option>
            <option value="debit">debit</option>
          </select>
        </td>
      </tr>
      <tr v-if="payment.payment_type=='credit'">
        <td>card number</td>
        <td>
          <input type="text" v-model="payment.card_number">
        </td>
      </tr>
      <tr v-if="payment.payment_type=='credit'">
        <td>card exp</td>
        <td>
          <input type="text" v-model="payment.card_exp">
        </td>
      </tr>
      <tr v-if="payment.payment_type=='credit'">
        <td>cvv</td>
        <td>
          <input type="text" v-model="payment.cvv">
        </td>
      </tr>
      <tr v-if="payment.payment_type=='debit'">
        <td>account name</td>
        <td>
          <input type="text" v-model="payment.account_name">
        </td>
      </tr>
      <tr v-if="payment.payment_type=='debit'">
        <td>account number</td>
        <td>
          <input type="text" v-model="payment.account_number">
        </td>
      </tr>
      <tr v-if="payment.payment_type">
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
  mounted() {},
  methods: {
    pay() {
      this.payment.ammount = this.$store.getters.campaign.final_cost;

      this.payment.payment_id = this.$store.getters.campaign.campaign_id;
      this.payment.receipt = "";

      this.$store.dispatch("payBill", this.payment);
      this.$store.dispatch("payCampaign", this.$store.getters.campaign);
      var progress = {
        campaign_id: this.$store.getters.campaign.campaign_id,
        created_at: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      };
      this.$store.dispatch("submitProgress", progress);
      this.$store.dispatch("unselectCampaign");
      this.$snotify.success("payment success!");
      this.$router.push("/user/dashboard");
    }
  }
};
</script>
<style lang='scss' scoped>
.payment {
  padding: 1em;
  padding-top: 6em !important;
  min-height: 500px;
  table {
    td:first-child {
      font-size: 0.8em;
      color: grey;
    }
    td {
      padding: 0.5em;
      input,
      select {
        padding: 0.5em 1em;
        width: 100%;
      }
      select {
      }
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