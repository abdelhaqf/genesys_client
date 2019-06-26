<template>
  <div class="review">
    <FormConfirm ref="confirmation" @yes="submit">
      <div slot="msg">
        Are you sure submit this review?
      </div>
    </FormConfirm>
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
      <table class="table-info">
        <caption>review</caption>
        <tr>
          <!-- <td></td>
          <td><input type="number" v-model="review.rating"></td> -->
          <td></td>
          <td><star-rating :star-size="20" v-model="review.rating"></star-rating></td>
        </tr>
        <tr>
          <td></td>
          <td><textarea name="" id="" cols="30" rows="10" v-model="review.comment"></textarea></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="submit" value="submit" @click="prepareSubmit"></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FormConfirm from "@/components/FormConfirm";

export default {
  name: "review",
  components: {FormConfirm},
  data(){return{review:{}} },
  computed: {
    ...mapGetters(["campaign"])
  },
  methods: {
    prepareSubmit() {
      this.$refs.confirmation.open();
    },
    submit() {
      this.review.campaign_id = this.campaign.campaign_id
      this.review.user_id = this.$store.getters.user.user_id
      this.review.img = this.$store.getters.user.img
      this.review.name = this.$store.getters.user.first_name + ' '+this.$store.getters.user.last_name
      this.review.company = this.$store.getters.user.company_name
      this.$store.dispatch('submitReview',this.review)
      this.$store.dispatch('reviewCampaign',this.campaign)
      this.$snotify.success('review submitted!')
      this.review = {}
      this.$router.push('/user/dashboard')
    }
  }
};
</script>
<style lang='scss' scoped>
.review {
  padding: 1em;
  padding-top: 6em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  textarea {
    width: 100%;
    padding: 1em;
  }
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
      input[type="submit"] {
    background-color: dodgerblue;
    border: 0;
    color: white;
    margin-top: 1em;
    padding: .5em 1em;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: deepskyblue;
    }
  }
    }
}
</style>