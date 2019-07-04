<template>
  <div class="table-payment">
    <!-- <span
      class="btnEdit"
      @click="isEditable= !isEditable"
      :class="{btnEditActive: isEditable}"
    >{{isEditable?'lock':'edit'}}</span>-->
    <table>
      <tr>
        <th>No</th>
        <th>type</th>
        <th>card number</th>
        <th>card_exp</th>
        <th>account number</th>
        <th>account name</th>
        <th>ammount</th>
      </tr>
      <tr
        v-for="(item,index) in payments"
        :key="item.campaign_id"
        v-show="item.payment_type"
        @click="detailCampaign(item)"
      >
        <td>{{index+1}}</td>
        <td v-if="item.payment_type=='debit'">transfer</td><td v-else>{{item.payment_type}}</td>
        <td>{{item.card_number}}</td>
        <td>{{item.card_exp}}</td>
        <td>{{item.account_name}}</td>
        <td>{{item.account_number}}</td>
        <td>{{item.ammount | rp}}</td>
        <!-- <td>{{item.is_paid=='1'?'paid':item.result}}</td> -->
        <td v-if="isEditable" class="delete" @click="deleteCampaign(item)">x</td>
      </tr>
    </table>
    <FormConfirm ref="confirmation" @yes="$store.dispatch('deleteCampaign',selectedPayment)">
      <div slot="msg">
        Are you sure to delete Payment
        <b>{{selectedPayment.payment_id}}</b>?
      </div>
    </FormConfirm>
    <FormDetail ref="detail">
      <table slot="content" class="content">
        <tr>
          <td>payment id</td>
          <td>{{selectedPayment.payment_id}}</td>
        </tr>
        <tr>
          <td>payment type</td>
          <td>{{selectedPayment.payment_type}}</td>
        </tr>
        <tr v-show="selectedPayment.payment_type == 'credit'">
          <td>card number</td>
          <td>{{selectedPayment.card_number}}</td>
        </tr>
        <tr v-show="selectedPayment.payment_type == 'credit'">
          <td>card exp</td>
          <td>{{selectedPayment.card_exp}}</td>
        </tr>
        <tr v-show="selectedPayment.payment_type == 'debit'">
          <td>account name</td>
          <td>{{selectedPayment.account_name}}</td>
        </tr>
        <tr v-show="selectedPayment.payment_type == 'debit'">
          <td>account number</td>
          <td>{{selectedPayment.account_number}}</td>
        </tr>
        <tr v-if="selectedPayment.payment_type == 'debit'">
          <td>receipt</td>
          <td>
            <div
              class="img-container"
              @click="showImage('http://localhost/genesys_api/upload/'+selectedPayment.receipt) "
            >
              <img :src="'http://localhost/genesys_api/upload/'+selectedPayment.receipt" alt>
            </div>
          </td>
        </tr>

        <tr>
          <td>ammount</td>
          <td>{{selectedPayment.ammount | rp}}</td>
        </tr>
      </table>
    </FormDetail>
  </div>
</template>
<script>
import FormConfirm from "@/components/FormConfirm";
import FormDetail from "@/components/FormDetail";
export default {
  name: "tablePayment",
  components: { FormConfirm, FormDetail },
  data() {
    return { isEditable: false, selectedPayment: {} };
  },
  created() {
    this.$store.dispatch("getPayments");
  },
  computed: {
    payments() {
      return this.$store.getters.payments;
    }
  },
  methods: {
    showImage(url) {
      window.open(url, "_blank");
    },
    deleteCampaign(campaign) {
      console.log(234);
      this.selectedPayment = campaign;
      this.$refs.confirmation.open();
    },
    detailCampaign(campaign) {
      this.selectedPayment = campaign;
      console.log(this.selectedPayment);
      this.$refs.detail.open();
    }
  }
};
</script>
<style lang='scss' scoped>
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
.table-payment {
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
    background-color: rgba(azure, 0.8);
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
  }
}
.table-payment > table > tr:hover > td {
  cursor: pointer;
  background-color: rgba(dodgerblue, 0.2);
}
</style>