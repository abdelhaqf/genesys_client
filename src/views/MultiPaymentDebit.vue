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
          <span>Transfer Details</span>
        </td>
      </tr>
      <tr>
        <td>account name</td>
        <td>
          <input type="text" v-model="payment.account_name">
        </td>
      </tr>
      <tr>
        <td>account number</td>
        <td>
          <input type="text" v-model="payment.account_number">
        </td>
      </tr>
      <tr>
        <td>bank</td>
        <td>
          <input type="text" v-model="payment.bank">
        </td>
      </tr>
      <tr>
        <td>receipt</td>
        <td>
          <label
            class="label"
            style="text-align:center !important;"
            for="fileToUpload"
          >{{theFile.name?theFile.name+' ':'click to open file dialog '}}</label>
        </td>
        <td>
          <input
            v-show="theFile.name"
            type="submit"
            @click.prevent="theFile = $refs.fileupload.files[0];upload()"
            name="submit"
            value="upload"
          >
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div style="width:0px; overflow:hidden;height: 0px;">
            <input
              type="file"
              ref="fileupload"
              id="fileToUpload"
              @change="theFile = $refs.fileupload.files[0]"
              style="width:0px; overflow:hidden;height: 0px;"
            >
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div class="image-container" v-if="profileURL">
            <img :src="profileURL" alt>
          </div>
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
import axios from "axios";
export default {
  name: "payment",
  data() {
    return { payment: {}, theFile: {}, profileURL: "" };
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
    upload() {
      console.log("uploading");
      let formData = new FormData();
      formData.append("file", this.theFile);
      axios({
        method: "post",
        url: "http://localhost/genesys_api/upload.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(data => {
          this.profileURL =
            "http://localhost/genesys_api/upload/" + this.theFile.name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    pay() {
      this.campaigns.forEach(item => {
        var payment = {};
        this.payment.ammount = item.final_cost;
        this.payment.payment_id = item.campaign_id;
        this.payment.payment_type = "debit";
        this.payment.holder = "";
        this.payment.card_number = "";
        this.payment.card_exp = "";
        this.payment.cvv = "";
        this.payment.receipt = this.theFile.name;

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
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;

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
    td {
      padding: 0.5em;
      input,
      select {
        padding: 0.5em 1em;
        width: 100%;
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
  .image-container {
    margin-left: 2em;
    text-align: center;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    border-radius: 6px 6px 0 0;
    overflow: hidden;
    img {
      width: 200px;
    }
  }
}
</style>