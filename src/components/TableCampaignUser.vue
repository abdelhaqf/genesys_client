<template>
  <div class="table-campaign">
    <table>
      <tr>
        <th>No</th>
        <th>service</th>
        <th>custom status</th>
        <th>social media</th>
        <th>result</th>
      </tr>
      <tr v-for="(item,index) in campaigns" :key="item.campaign_id" @click="detailCampaign(item)">
        <td>{{index+1}}</td>
        <td>{{item.service_type}}</td>
        <td>{{truncText(item.custom_status,25)}}</td>
        <td>{{item.social_medias}}</td>
        <td>{{result(item)}}</td>
      </tr>
    </table>
    <FormConfirm ref="confirmation" @yes="$store.dispatch('deleteCampaign',selectedCampaign)">
      <div slot="msg">
        Are you sure to delete Campaign
        <b>{{selectedCampaign.campaign_id}}</b>?
      </div>
    </FormConfirm>
    <FormDetail ref="detail">
      <a slot="action" v-if="selectedCampaign.is_paid=='1'">
        <span
          class="progress"
          v-if="selectedCampaign.is_paid=='1'"
          href
          @click.prevent="toProgress"
        >progress</span>
        <span
          class="progress"
          v-if="selectedCampaign.result=='finished' && selectedCampaign.is_reviewed=='0'"
          @click.prevent="toReview"
        >review</span>
      </a>
      <span
        slot="action"
        v-if="selectedCampaign.is_paid=='0' && selectedCampaign.result == 'accepted'"
        @click="$store.dispatch('selectCampaign', selectedCampaign);$router.push('/payment')"
        class="accept"
      >payment</span>

      <table slot="content" class="content">
        <tr>
          <td>campaign id</td>
          <td>{{selectedCampaign.campaign_id}}</td>
        </tr>
        <tr>
          <td>company</td>
          <td>{{selectedCampaign.company_name}}</td>
        </tr>
        <tr>
          <td>custom status</td>
          <td>{{selectedCampaign.custom_status}}</td>
        </tr>
        <tr>
          <td>service</td>
          <td>{{selectedCampaign.service_type}}</td>
        </tr>
        <tr>
          <td>audience</td>
          <td>{{selectedCampaign.target_audience}}</td>
        </tr>
        <tr>
          <td>gender</td>
          <td>{{selectedCampaign.gender}}</td>
        </tr>

        <tr>
          <td>job</td>
          <td>{{selectedCampaign.job}}</td>
        </tr>
        <tr>
          <td>socmed</td>
          <td>{{selectedCampaign.social_medias}}</td>
        </tr>
        <tr>
          <td>target view</td>
          <td>{{selectedCampaign.target_view}}</td>
        </tr>
        <tr>
          <td>target click</td>
          <td>{{selectedCampaign.target_click}}</td>
        </tr>
        <tr>
          <td>target like</td>
          <td>{{selectedCampaign.target_like}}</td>
        </tr>
        <tr>
          <td>estimated time</td>
          <td>{{selectedCampaign.time_period}} day(s)</td>
        </tr>
        <tr>
          <td>total price</td>
          <td>{{selectedCampaign.final_cost | rp}}</td>
        </tr>
        <tr>
          <td>result</td>
          <td>{{selectedCampaign.result}}</td>
        </tr>
        <tr v-if="selectedCampaign.result == 'accepted'">
          <td>payment</td>
          <td>
            <a v-if="selectedCampaign.is_paid=='0'">not paid</a>
            <a v-else>paid</a>
          </td>
        </tr>
      </table>
    </FormDetail>
  </div>
</template>
<script>
import trunc from "trunc-text";

import FormConfirm from "@/components/FormConfirm";
import FormDetail from "@/components/FormDetail";
export default {
  name: "tableCampaign",
  components: { FormConfirm, FormDetail },
  data() {
    return { isEditable: false, selectedCampaign: {} };
  },
  mounted() {
    this.$store.dispatch("getMyCampaigns", this.$store.getters.user.user_id);
  },
  computed: {
    campaigns() {
      return this.$store.getters.myCampaigns;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    toProgress() {
      this.$store.commit("setCampaign", this.selectedCampaign);
      this.$router.push("/progress");
    },
    toReview() {
      this.$store.commit("setCampaign", this.selectedCampaign);
      this.$router.push("/review");
    },
    result(item) {
      if (item.result == "rated") return "rated";
      if (item.result == "finished") return "finished";
      if (item.is_paid == "1") return "paid";
      return item.result;
    },
    truncText(text, len) {
      return trunc(text, len);
    },
    deleteCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.$refs.confirmation.open();
    },
    detailCampaign(campaign) {
      this.selectedCampaign = campaign;
      console.log(this.selectedCampaign);
      this.$refs.detail.open();
    }
  }
};
</script>
<style lang='scss' scoped>
.table-campaign {
  padding: 1em;
  .btnEdit {
    padding: 0.5em 1em;
    cursor: pointer;
    border: 2px solid dodgerblue;
    color: dodgerblue;
    border-radius: 6px;
    margin-bottom: 0.5em;
  }
  .btnEditActive {
    border: 2px solid salmon;
    color: salmon;
  }
  table {
    border-collapse: collapse;
    border: 1px solid silver !important;
    th {
      border: 1px solid silver;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      padding: 0.5em 1em;
    }
    tr:nth-child(even) {
      background-color: honeydew;
    }
    .delete {
      cursor: pointer;
      background-color: salmon;
      color: white;
      border: 12px solid white;
      border-left: 1px solid silver;
      font-size: 0.7em;
      font-weight: bold;
      &:hover {
        background-color: crimson;
      }
    }
    td {
      border-left: 1px solid silver;
      border-right: 1px solid silver;
      padding: 0.5em 1em;
      white-space: nowrap;
    }
    td:first-child {
      // color: dodgerblue;
      // cursor: pointer;

      &:hover {
        // border: 1px dotted gold;
        // background-color: gold;
      }
    }
    tr {
    }
  }
}
.table-campaign > table > tr:hover > td {
  cursor: pointer;
  background-color: rgba(dodgerblue, 0.2);
}
</style>