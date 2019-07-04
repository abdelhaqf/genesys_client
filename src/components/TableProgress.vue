<template>
  <div class="table-progress">
    <FormConfirm
      ref="confirmation2"
      @yes="$store.dispatch('finishCampaign',$store.getters.campaign);$snotify.success('campaign done!');"
    >
      <div slot="msg">Are you sure to finish Campaign?</div>
    </FormConfirm>
    <span
      v-if="$store.getters.campaign.result != 'finished' && $store.getters.user.role=='admin'"
      class="btnEdit"
      @click="isEditable= !isEditable"
      :class="{btnEditActive: isEditable}"
    >{{isEditable?'lock':'edit'}}</span>
    <span
      class="btnFinish"
      v-if="$store.getters.campaign.result != 'finished' && $store.getters.user.role=='admin'"
      @click="$refs.confirmation2.open()"
    >finish</span>

    <table>
      <tr>
        <th>No</th>
        <th>view</th>
        <th>click</th>
        <th>like</th>
        <th>facebook</th>
        <th>twitter</th>
        <th>instagram</th>
        <th>proof</th>
      </tr>
      <tr v-for="(item,index) in results" :key="item.result_id" @click="detailProgress(item)">
        <td>{{index+1}}</td>
        <td>{{item.current_view}}</td>
        <td>{{item.current_click}}</td>
        <td>{{item.current_like}}</td>
        <td>{{item.facebook}}</td>
        <td>{{item.twitter}}</td>
        <td>{{item.instagram}}</td>
        <td v-if="isEditable && index>0" class="delete" @click.self.stop="deleteProgress(item)">x</td>
        <td>
          <a
            v-if="item.proof"
            href="#"
            @click.self.stop="showImage('http://localhost/genesys_api/upload/'+item.proof)"
          >link</a>
        </td>
      </tr>
    </table>
    <FormConfirm
      ref="confirmation"
      @yes="$store.dispatch('deleteResult',selectedProgress);$snotify.warning('progress removed');"
    >
      <div slot="msg">
        Are you sure to delete Progress
        <b>{{selectedProgress.created_at}}</b>?
      </div>
    </FormConfirm>
    <FormDetail ref="detail">
      <table slot="content" class="content">
        <tr>
          <td>id</td>
          <td>{{selectedProgress.result_id}}</td>
        </tr>
        <tr>
          <td>campaign id</td>
          <td>{{selectedProgress.campaign_id}}</td>
        </tr>
        <tr>
          <td>created at</td>
          <td>{{selectedProgress.created_at}}</td>
        </tr>
        <tr>
          <td>view</td>
          <td>{{selectedProgress.current_view}}</td>
        </tr>
        <tr>
          <td>click</td>
          <td>{{selectedProgress.current_click}}</td>
        </tr>
        <tr>
          <td>like</td>
          <td>{{selectedProgress.current_like}}</td>
        </tr>
        <tr>
          <td>remaja</td>
          <td>{{selectedProgress.remaja}}</td>
        </tr>
        <tr>
          <td>dewasa</td>
          <td>{{selectedProgress.dewasa}}</td>
        </tr>
        <tr>
          <td>orang_tua</td>
          <td>{{selectedProgress.orang_tua}}</td>
        </tr>
        <tr>
          <td>pria</td>
          <td>{{selectedProgress.pria}}</td>
        </tr>
        <tr>
          <td>wanita</td>
          <td>{{selectedProgress.wanita}}</td>
        </tr>
        <tr>
          <td>pegawai</td>
          <td>{{selectedProgress.pegawai}}</td>
        </tr>
        <tr>
          <td>karyawan</td>
          <td>{{selectedProgress.karyawan}}</td>
        </tr>
        <tr>
          <td>pengusaha</td>
          <td>{{selectedProgress.pengusaha}}</td>
        </tr>
        <tr>
          <td>facebook</td>
          <td>{{selectedProgress.facebook}}</td>
        </tr>
        <tr>
          <td>twitter</td>
          <td>{{selectedProgress.twitter}}</td>
        </tr>
        <tr>
          <td>instagram</td>
          <td>{{selectedProgress.instagram}}</td>
        </tr>
        <tr>
          <td>proof</td>
          <td>
            <div
              class="img-container"
              @click="showImage('http://localhost/genesys_api/upload/'+selectedProgress.proof) "
            >
              <img :src="'http://localhost/genesys_api/upload/'+selectedProgress.proof" alt>
            </div>
          </td>
        </tr>
      </table>
    </FormDetail>
  </div>
</template>
<script>
import FormConfirm from "@/components/FormConfirm";
import FormDetail from "@/components/FormDetail";

export default {
  name: "tableProgress",
  components: { FormConfirm, FormDetail },
  data() {
    return { isEditable: false, selectedProgress: {} };
  },
  created() {
    this.$store.dispatch(
      "getResults",
      this.$store.getters.campaign.campaign_id
    );
  },
  computed: {
    results() {
      return this.$store.getters.results;
    }
  },
  methods: {
    showImage(url) {
      window.open(url, "_blank");
    },
    deleteProgress(progress) {
      this.selectedProgress = progress;
      this.$refs.confirmation.open();
    },
    detailProgress(progress) {
      this.selectedProgress = progress;
      console.log(this.selectedProgress);
      this.$refs.detail.open();
    }
  },
};
</script>
<style lang='scss' scoped>
.table-progress {
  .img-container {
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
  padding: 1em;
  .btnEdit {
    padding: 0.5em 1em;
    cursor: pointer;
    border: 2px solid dodgerblue;
    color: dodgerblue;
    border-radius: 6px;
    margin-bottom: 0.5em;
  }
  .btnFinish {
    padding: 0.5em 1em;
    cursor: pointer;
    background-color: crimson;
    // border: 2px solid dodgerblue;
    color: white;
    border-radius: 6px;
    margin-bottom: 0.5em;
    margin-left: 2em;
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
      background-color: salmon !important;
      color: white;
      border: 12px solid azure;
      border-left: 1px solid silver;
      font-size: 0.7em;
      font-weight: bold;
      &:hover {
        background-color: crimson !important;
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
.table-progress > table > tr:hover > td {
  cursor: pointer;
  background-color: rgba(dodgerblue, 0.2);
}
</style>

