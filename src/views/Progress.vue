<template>
  <div class="progress" v-if="user">
    <div class="info">
      <LineActionUser class="line-action"></LineActionUser>

      <table class="table-info">
        <caption>Campaign info</caption>
        <tr>
          <td>campaign id</td>
          <td>{{campaign.campaign_id}}</td>
        </tr>
        <tr>
          <td>company</td>
          <td>{{campaign.company_name}}</td>
        </tr>
        <tr>
          <td>custom status</td>
          <td>{{campaign.custom_status}}</td>
        </tr>
        <tr>
          <td>service</td>
          <td>{{campaign.service_type}}</td>
        </tr>
        <tr>
          <td>audience</td>
          <td>{{campaign.target_audience}}</td>
        </tr>
        <tr>
          <td>gender</td>
          <td>{{campaign.gender}}</td>
        </tr>

        <tr>
          <td>job</td>
          <td>{{campaign.job}}</td>
        </tr>
        <tr>
          <td>socmed</td>
          <td>{{campaign.social_medias}}</td>
        </tr>
        <tr>
          <td>target view</td>
          <td>{{campaign.target_view | num}}</td>
        </tr>
        <tr>
          <td>target click</td>
          <td>{{campaign.target_click | num}}</td>
        </tr>
        <tr>
          <td>target like</td>
          <td>{{campaign.target_like | num}}</td>
        </tr>
        <tr>
          <td>estimated time</td>
          <td>{{campaign.time_period}} day(s)</td>
        </tr>
        <tr>
          <td>total price</td>
          <td>{{campaign.final_cost | rp}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>

    <div class="content">
      <div class="tab">
        <span @click="nav='update';">update</span>
        <span @click="nav='summary';">report</span>
      </div>

      <RadialActionUser v-show="nav=='summary'"></RadialActionUser>
      <RadialProgressUser v-show="nav=='summary'"></RadialProgressUser>
      <PieGenderUser v-show="nav=='summary'"></PieGenderUser>
      <PieJobUser v-show="nav=='summary'"></PieJobUser>
      <PieSocialMediaUser v-show="nav=='summary'"></PieSocialMediaUser>
      <FormProgress
        class="form-progress"
        v-show="nav=='update'"
        v-if="campaign.result != 'finished' && user.role=='admin'"
      ></FormProgress>
      <TableProgress v-show="nav=='update'" class="table-progress"></TableProgress>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FormProgress from "@/components/FormProgress";
import TableProgress from "@/components/TableProgress";
import PieSocialMediaUser from "@/components/charts/PieSocialMediaUser";
import PieGenderUser from "@/components/charts/PieGenderUser";
import PieJobUser from "@/components/charts/PieJobUser";
import LineActionUser from "@/components/charts/LineActionUser";
import RadialActionUser from "@/components/charts/RadialActionUser";
import RadialProgressUser from "@/components/charts/RadialProgressUser";

export default {
  name: "progressView",
  components: {
    FormProgress,
    TableProgress,
    PieSocialMediaUser,
    PieGenderUser,
    PieJobUser,
    LineActionUser,
    RadialActionUser,

    RadialProgressUser
  },
  computed: {
    ...mapGetters(["campaign"]),
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return { nav: "summary" };
  }
};
</script>
<style lang='scss' scoped>
.progress {
  padding: 1em;
  padding-top: 6em;
  display: grid;
  grid-template-columns: 2fr 2fr;
  // grid-template-rows: auto auto auto;
  // grid-row-gap: 1em;
  // .table-info {
  //   grid-row: 1 / span 2;
  // }
  table {
    td {
      padding: 0.1em 1em;
    }
    td:first-child {
      font-size: 0.8em;
      color: grey;
    }
  }
  // .table-progress {
  //   grid-row: 3 / 3;
  //   grid-column: 1/1;
  // }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    grid-template-rows: auto auto;
    align-content: start;
    // align-items: center;
    // justify-items: stretch;
    .table-info {
      grid-column: 1 / span 2;
      // width: 100%;
    }
    .line-action {
      grid-column: 1 / span 2;
    }
    div,
    table {
      caption {
        border: 1px dotted rgba(black, 0.2);
        border-bottom: none;
        color: grey;
        padding: 0.5em 1em;
        border-radius: 6px 6px 0 0;
      }
      padding: 1em;
      border: 1px dotted rgba(black, 0.2);
      border-radius: 0 0 6px 6px;
    }
    div {
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.content {
  padding-left: 1em;
  padding-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: start;

  grid-gap: 1em;
  * {
    border: 1px dotted rgba(black, 0.2);
    border-radius: 6px;

    padding: 0.5em;
    span {
      margin-right: 1em;
    }
  }
  .tab {
    grid-column: 1 / span 2;
    border: none;
    padding: 0;
  }

  .table-progress {
    grid-column: 1 / span 2;
  }
  .form-progress {
    grid-column: 1 / span 2;
  }
}
</style>