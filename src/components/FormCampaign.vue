<template>
  <div class="form-campaign">
    <Stepper :legends="['Service','Audience','Target']" :validation="validated" @submit="submit">
      <div slot="content1" class="content">
        <a>company</a>
        <p>{{campaign.company_name}}</p>
        <a>status</a>
        <input type="text" v-model="campaign.custom_status ">
        <a>service</a>
        <select v-model="campaign.service_type">
          <option value="social media marketing">social media marketing</option>
          <option value="pay per click ads">pay per click ads</option>
        </select>
      </div>

      <div slot="content2" class="content">
        <a>audience</a>
        <select v-model="campaign.target_audience">
          <option value="remaja">remaja</option>
          <option value="dewasa">dewasa</option>
          <option value="orang tua">orang tua</option>
        </select>
        <a>gender</a>
        <select v-model="campaign.gender">
          <option value="pria">pria</option>
          <option value="wanita">wanita</option>
        </select>
        <a>job</a>
        <select v-model="campaign.job">
          <option value="pegawai">pegawai</option>
          <option value="karyawan">karyawan</option>
          <option value="pengusaha">pengusaha</option>
        </select>
      </div>

      <div slot="content3" class="content">
        <a>socmed</a>
        <div>
          <input type="checkbox" value="facebook" v-model="campaign.social_medias" id="fb">
          <label for="fb">facebook</label>
          <input type="checkbox" value="twitter" v-model="campaign.social_medias" id="tw">
          <label for="tw">twitter</label>
          <input type="checkbox" value="instagram" v-model="campaign.social_medias" id="ig">
          <label for="ig">instagram</label>
        </div>
        <a>target view</a>
        <input type="number" min="10000" max="1000000" step="10000" v-model="campaign.target_view">
        <a>target click</a>
        <input type="number" min="1000" max="100000" step="1000" v-model="campaign.target_click">
        <a>target like</a>
        <input type="number" min="100" max="10000" step="100" v-model="campaign.target_like">
        <a>final cost</a>
        {{final_cost | rp}}
        <a>estimated time</a>
        {{time_period}} day(s)
      </div>
    </Stepper>
  </div>
</template>
<script>
import axios from "axios";
import uuid from "uuid/v4";
import Stepper from "@/components/Stepper";
export default {
  name: "formCampaign",
  components: { Stepper },
  data() {
    return {
      campaign: {
        target_view: 10000,
        target_click: 1000,
        target_like: 100,
        social_medias: []
      }
    };
  },
  created() {
    this.initCampaign();
  },
  methods: {
    initCampaign() {
      this.campaign = {
        campaign_id: uuid(),
        target_view: 10000,
        target_click: 1000,
        target_like: 100,
        social_medias: [],
        user_id: this.$store.getters.user.user_id,
        company_name: this.$store.getters.user.company_name
      };
    },
    submit() {
      this.$store.dispatch("submitCampaign", this.campaign);
      var bill = {
        payment_id: this.campaign.campaign_id,
        ammount: parseInt(this.campaign.final_cost)
      };
      this.$store.dispatch("createBill", bill);

      this.initCampaign();
      this.$snotify.success("campaign created!");
      this.$emit("finish");
    },
    calcTime() {
      // var view = this.campaign.target_view * 1;
      // var click = this.campaign.target_click * 10;
      // var like = this.campaign.target_like * 500;
      // var weightedLoad = Math.max(view, click, like);
      // var time = Math.ceil(weightedLoad / 41667);
      // this.campaign.time_period = time;
      // return time;
      var day = 1;
      var view = 0;
      var click = 0;
      var like = 0;
      if (
        this.campaign.target_view <= 10000 &&
        this.campaign.target_click <= 1000 &&
        this.campaign.target_like <= 100
      ) {
        this.campaign.time_period = day;
        return day;
      }
      if (this.campaign.target_view >= 15000) {
        view = Math.floor((this.campaign.target_view - 10000) / 5000) * 1;
      }
      if (this.campaign.target_click >= 1500) {
        click = Math.floor((this.campaign.target_click - 1000) / 500) * 2;
      }
      if (this.campaign.target_like >= 150) {
        like = Math.floor((this.campaign.target_like - 100) / 50) * 3;
      }
      this.campaign.time_period = day + view + click + like;
      return day + view + click + like;
    },
    calcCost() {
      // var result = this.calcTime() * 500000;
      // this.campaign.final_cost = result;

      // return result;
      var day = 1000000;
      var view = 0;
      var click = 0;
      var like = 0;
      if (
        this.campaign.target_view <= 10000 &&
        this.campaign.target_click <= 1000 &&
        this.campaign.target_like <= 100
      ) {
        this.campaign.final_cost = day;

        return day;
      }
      if (this.campaign.target_view >= 15000) {
        view = Math.floor(
          ((this.campaign.target_view - 10000) / 5000) * 200000
        );
      }
      if (this.campaign.target_click >= 1500) {
        click = Math.floor(
          ((this.campaign.target_click - 1000) / 500) * 200000
        );
      }
      if (this.campaign.target_like >= 150) {
        like = Math.floor(((this.campaign.target_like - 100) / 50) * 200000);
      }
      this.campaign.final_cost = day + view + click + like;

      return day + view + click + like;
    }
  },
  computed: {
    validated() {
      // return this.user.agree;
      return true;
    },
    time_period() {
      return this.calcTime();
    },
    final_cost() {
      return this.calcCost();
    }
  }
};
</script>
<style lang='scss' scoped>
</style>