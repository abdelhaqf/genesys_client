<template>
  <div class="form-progress">
    <table>
      <tr>
        <td>campaign id</td>
        <td>{{$store.getters.campaign.campaign_id}}</td>
      </tr>
      <tr>
        <td>view</td>
        <td>
          <input type="number" v-model="progress.current_view">
        </td>
      </tr>
      <tr>
        <td>click</td>
        <td>
          <input type="number" v-model="progress.current_click">
        </td>
      </tr>
      <tr>
        <td>like</td>
        <td>
          <input type="number" v-model="progress.current_like">
        </td>
      </tr>
      <tr>
        <td>remaja</td>
        <td>
          <input type="number" v-model="progress.remaja">
        </td>
      </tr>
      <tr>
        <td>dewasa</td>
        <td>
          <input type="number" v-model="progress.dewasa">
        </td>
      </tr>
      <tr>
        <td>orang tua</td>
        <td>
          <input type="number" v-model="progress.orang_tua">
        </td>
      </tr>
      <tr>
        <td>pria</td>
        <td>
          <input type="number" v-model="progress.pria">
        </td>
      </tr>
      <tr>
        <td>wanita</td>
        <td>
          <input type="number" v-model="progress.wanita">
        </td>
      </tr>
      <tr>
        <td>pegawai</td>
        <td>
          <input type="number" v-model="progress.pegawai">
        </td>
      </tr>
      <tr>
        <td>karyawan</td>
        <td>
          <input type="number" v-model="progress.karyawan">
        </td>
      </tr>
      <tr>
        <td>pengusaha</td>
        <td>
          <input type="number" v-model="progress.pengusaha">
        </td>
      </tr>
      <tr>
        <td>facebook</td>
        <td>
          <input type="number" v-model="progress.facebook">
        </td>
      </tr>
      <tr>
        <td>twitter</td>
        <td>
          <input type="number" v-model="progress.twitter">
        </td>
      </tr>
      <tr>
        <td>instagram</td>
        <td>
          <input type="number" v-model="progress.instagram">
        </td>
      </tr>
      <tr>
        <td>Date</td>
        <td>
          <date-pick
            v-model="progress.created_at"
            :format="format"
            :parseDate="parseDate"
            :formatDate="formatDate"
            :inputAttributes="{size: 32,readonly:true}"
          ></date-pick>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="submit" value="submit" @click="submit">
          <!-- <input type="submit" value="dummy data" @click="submitDummy"> -->
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import DatePick from "vue-date-pick";
import fecha from "fecha";
import "vue-date-pick/dist/vueDatePick.css";
export default {
  name: "formProgress",
  components: { DatePick },
  mounted() {
    this.init();
  },
  data() {
    return { progress: { created_at: "" }, format: "YYYY-MM-DD", rep: 0 };
  },
  methods: {
    init() {
      this.progress.campaign_id = this.$store.getters.campaign.campaign_id;
      // this.progress.created_at = fecha.format(new Date(), "YYYY-MM-DD");
      this.rep = Math.ceil(
        parseInt(this.$store.getters.campaign.time_period) / 7
      );
      // console.log(this.rep);
    },
    submit() {
      this.$store.dispatch("submitProgress", this.progress);
      this.progress = {};
      this.init();
      this.$snotify.success("progress made!");
    },
    async submitDummy() {
      await this.$store.dispatch("submitProgress", this.progress);

      this.progress.current_view = parseInt(this.progress.current_view);
      this.progress.current_click = parseInt(this.progress.current_click);
      this.progress.current_like = parseInt(this.progress.current_like);
      this.progress.remaja = parseInt(this.progress.remaja);
      this.progress.dewasa = parseInt(this.progress.dewasa);
      this.progress.orang_tua = parseInt(this.progress.orang_tua);
      this.progress.pria = parseInt(this.progress.pria);
      this.progress.wanita = parseInt(this.progress.wanita);
      this.progress.pegawai = parseInt(this.progress.pegawai);
      this.progress.karyawan = parseInt(this.progress.karyawan);
      this.progress.pengusaha = parseInt(this.progress.pengusaha);
      this.progress.facebook = parseInt(this.progress.facebook);
      this.progress.twitter = parseInt(this.progress.twitter);
      this.progress.instagram = parseInt(this.progress.instagram);
      for (var i = 0; i < this.rep; i++) {
        this.progress.current_view += Math.floor(Math.random() * 200);
        this.progress.current_click += Math.floor(Math.random() * 200);
        this.progress.current_like += Math.floor(Math.random() * 200);
        this.progress.remaja += Math.floor(Math.random() * 200);
        this.progress.dewasa += Math.floor(Math.random() * 200);
        this.progress.orang_tua += Math.floor(Math.random() * 200);
        this.progress.pria += Math.floor(Math.random() * 200);
        this.progress.wanita += Math.floor(Math.random() * 200);
        this.progress.pegawai += Math.floor(Math.random() * 200);
        this.progress.karyawan += Math.floor(Math.random() * 200);
        this.progress.pengusaha += Math.floor(Math.random() * 200);
        this.progress.facebook += Math.floor(Math.random() * 200);
        this.progress.twitter += Math.floor(Math.random() * 200);
        this.progress.instagram += Math.floor(Math.random() * 200);

        this.progress.created_at = this.formatDate(
          this.parseDate(this.progress.created_at, this.format).setDate(
            this.parseDate(this.progress.created_at, this.format).getDate() + 7
          ),
          this.format
        );

        // this.progress.created_at = this.parseDate(
        //   new Date(this.progress.created_at).setDate(7).toString(),
        //   this.format
        // );

        // .setDate(7);
        await this.$store.dispatch("submitProgress", this.progress);
        console.log(this.progress);
      }
      // this.progress = {};
      this.init();
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    }
  }
};
</script>
<style lang='scss' scoped>
.form-progress {
  table {
    td:first-child {
      font-size: 0.8em;
      color: grey;
    }
    td {
      padding: 0.2em;
      input {
        padding: 0.2em 1em;
        width: 100%;
      }

      input[type="submit"] {
        margin: 0.5em 1em;
        width: 90%;

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