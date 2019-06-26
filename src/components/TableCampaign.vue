<template>
  <div class="table-campaign">
    <span
      class="btnEdit"
      @click="isEditable= !isEditable"
      :class="{btnEditActive: isEditable}"
    >{{isEditable?'lock':'edit'}}</span>
    <select
      class="filter"
      v-model="filterby"
      placeholder="filter"
      @change="$snotify.success('filter applied!')"
    >
      <option value="reviewed">reviewed</option>
      <option value="accepted">accepted</option>
      <option value="declined">declined</option>
      <option value="paid">paid</option>
      <option value="finished">finished</option>
      <option value="rated">rated</option>
      <option value="all">all</option>
    </select>
    <table>
      <tr>
        <th>No</th>
        <th>company</th>
        <th>service</th>
        <!-- <th>audience</th> -->
        <!-- <th>social media</th> -->
        <th>estimated time</th>
        <th>price</th>
        <th>result</th>
      </tr>
      <tr v-for="(item,index) in campaigns" :key="item.campaign_id" @click="detailCampaign(item)">
        <td>{{index+1}}</td>
        <td>{{item.company_name}}</td>
        <td>{{item.service_type}}</td>
        <!-- <td>{{item.target_audience}}</td> -->
        <!-- <td>{{item.social_medias}}</td> -->
        <td>{{item.time_period}} day(s)</td>
        <td>{{item.final_cost | rp}}</td>
        <td>{{result(item)}}</td>
        <td v-if="isEditable" class="delete" @click.self.stop="deleteCampaign(item)">x</td>
      </tr>
    </table>
    <FormConfirm
      ref="confirmation"
      @yes="$store.dispatch('deleteCampaign',selectedCampaign);$snotify.warning('campaign removed');"
    >
      <div slot="msg">
        Are you sure to delete Campaign
        <b>{{selectedCampaign.campaign_id}}</b>?
      </div>
    </FormConfirm>
    <FormDetail ref="detail">
      <span
        class="progress"
        slot="action"
        v-if="selectedCampaign.is_paid=='1'"
        href
        @click.prevent="toProgress"
      >progress</span>
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
          <td v-if="selectedCampaign.result == 'reviewed'">
            <span
              class="accept"
              @click="$store.dispatch('acceptCampaign',selectedCampaign);$refs.detail.close();$snotify.info('campaign accepted');"
            >accept</span>
            <span
              @click="$store.dispatch('declineCampaign',selectedCampaign);$refs.detail.close();$snotify.warning('campaign declined');"
            >decline</span>
          </td>
          <td v-else>{{result(selectedCampaign)}}</td>
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
    return { isEditable: false, selectedCampaign: {}, filterby: "all" };
  },
  created() {
    this.$store.dispatch("getCampaigns");
  },
  computed: {
    campaigns() {
      var temp = this.$store.getters.campaigns;
      if (this.filterby == "" || this.filterby == "all") return temp;
      if (this.filterby == "reviewed")
        return temp.filter(item => {
          return item.result == "reviewed" && item.is_paid == "0";
        });
      if (this.filterby == "accepted")
        return temp.filter(item => {
          return item.result == "accepted" && item.is_paid == "0";
        });
      if (this.filterby == "declined")
        return temp.filter(item => {
          return item.result == "declined" && item.is_paid == "0";
        });
      if (this.filterby == "paid")
        return temp.filter(item => {
          return item.result == "accepted" && item.is_paid == "1";
        });
      if (this.filterby == "finished")
        return temp.filter(item => {
          return item.result == "finished" && item.is_paid == "1";
        });
      if (this.filterby == "rated")
        return temp.filter(item => {
          return item.result == "rated" && item.is_paid == "1";
        });
    }
  },
  methods: {
    truncText(text, len) {
      return trunc(text, len);
    },
    result(item) {
      if (item.result == "rated") return "rated";

      if (item.result == "finished") return "finished";
      if (item.is_paid == "1") return "paid";
      return item.result;
    },
    toProgress() {
      this.$store.commit("setCampaign", this.selectedCampaign);
      this.$router.push("/progress");
    },
    deleteCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.$refs.confirmation.open();
    },
    detailCampaign(campaign) {
      this.selectedCampaign = campaign;
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
  .filter {
    padding: 0.5em 1em;
    margin-left: 1em;
    min-width: 12em;
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
      background-color: salmon !important;
      color: white;
      border: 12px solid azure;
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
  }
}
.table-campaign > table > tr:hover > td {
  cursor: pointer;
  background-color: rgba(dodgerblue, 0.2);
}
</style>