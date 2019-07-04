<template>
  <div class="table-review">
    <span
      class="btnEdit"
      @click="isEditable= !isEditable"
      :class="{btnEditActive: isEditable}"
    >{{isEditable?'lock':'edit'}}</span>
    <table>
      <tr>
        <th>no</th>
        <th>name</th>
        <th>company</th>
        <th>rating</th>
        <th>result</th>
      </tr>
      <tr v-for="(item,index) in reviews" :key="item.review_id" @click="detailReview(item)">
        <td>{{index+1}}</td>
        <td>{{item.name}}</td>
        <td>{{item.company}}</td>
        <td>{{item.rating}}</td>
        <td>{{item.result}}</td>
        <td v-if="isEditable" class="delete" @click.self.stop="deleteReview(item)">x</td>
      </tr>
    </table>
    <FormConfirm
      ref="confirmation"
      @yes="$store.dispatch('deleteReview',selectedReview.testimonial_id);$snotify.warning('review deleted!')"
    >
      <div slot="msg">
        Are you sure to delete review
        <b>{{selectedReview.reviewname}}</b> ?
      </div>
    </FormConfirm>
    <FormDetail ref="detail">
      <table slot="content">
        <tr>
          <td>review id</td>
          <td>{{selectedReview.testimonial_id}}</td>
        </tr>
        <tr>
          <td>name</td>
          <td>{{selectedReview.name}}</td>
        </tr>
        <tr>
          <td>company</td>
          <td>{{selectedReview.company}}</td>
        </tr>
        <tr>
          <td>rating</td>
          <td>{{selectedReview.rating}}</td>
        </tr>
        <tr>
          <td>comment</td>
          <td>{{selectedReview.comment}}</td>
        </tr>
        <tr>
          <td>result</td>
          <td>{{selectedReview.result}}</td>
        </tr>
        <tr v-if="selectedReview.result=='reviewed'">
          <td></td>
          <td>
            <span
              class="accept"
              @click="$store.dispatch('acceptReview',selectedReview);$refs.detail.close();$snotify.info('review accepted');"
            >accept</span>
            <span
              @click="$store.dispatch('declineReview',selectedReview);$refs.detail.close();$snotify.warning('review declined');"
            >decline</span>
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
  name: "tableReview",
  components: { FormConfirm, FormDetail },
  data() {
    return { isEditable: false, selectedReview: "" };
  },
  created() {
    this.$store.dispatch("getReviews");
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    }
  },
  methods: {
    deleteReview(review) {
      this.selectedReview = review;
      this.$refs.confirmation.open();
    },
    detailReview(review) {
      this.selectedReview = review;
      console.log(this.selectedReview);
      this.$refs.detail.open();
    }
  }
};
</script>
<style lang='scss' scoped>
.table-review {
  padding: 1em;
  .btnEdit {
    background-color: rgba(azure, 0.6);
    padding: 0.5em 1em;
    cursor: pointer;
    border: 2px solid dodgerblue;
    color: dodgerblue;
    border-radius: 6px;
    margin-bottom: 0.5em;
  }
  .btnEditActive {
    background-color: rgba(azure, 0.6);
    border: 2px solid salmon;
    color: salmon;
  }
  table {
    background-color: rgba(azure, 0.8);
    border-collapse: collapse;
    border: 1px solid silver !important;
    th {
      border: 1px solid silver;
      font-weight: bold;
      text-align: center;
      padding: 0.5em 1em;
      // background-color: aliceblue;
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
    }
  }
}
.table-review > table > tr:hover > td {
  cursor: pointer;
  background-color: rgba(dodgerblue, 0.2);
}
</style>