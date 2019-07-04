<template>
  <div class="invoice">
    <table>
      <tr>
        <td></td>
        <td>
          <span>Invoice Details</span>
        </td>
      </tr>
      <tr>
        <td>campaign id</td>
        <td>
          <input type="text" v-model="campaign.campaign_id">
        </td>
      </tr>
      <tr>
        <td>company</td>
        <td>
          <input type="text" v-model="campaign.company_name">
        </td>
      </tr>
      <tr>
        <td>custom status</td>
        <td>
          <input type="text" v-model="campaign.custom_status">
        </td>
      </tr>
      <tr>
        <td>service</td>
        <td>
          <input type="text" v-model="campaign.service_type">
        </td>
      </tr>
      <tr>
        <td>target view</td>
        <td>
          <input type="text" v-model="campaign.target_view">
        </td>
      </tr>
      <tr>
        <td>target klik</td>
        <td>
          <input type="text" v-model="campaign.target_click">
        </td>
      </tr>
      <tr>
        <td>target like</td>
        <td>
          <input type="text" v-model="campaign.target_like">
        </td>
      </tr>
      <tr>
        <td>estimated time</td>
        <td>
          <input type="text" v-model="campaign.time_period">
        </td>
      </tr>
      <tr>
        <td>total price</td>
        <td>
          <input type="text" v-model="campaign.final_cost">
        </td>
      </tr>
      <tr>
        <td>result</td>
        <td>
          <input type="text" v-model="campaign.result">
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="submit" @click="print" value="print">
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "invoice",
  data() {
    return { payment: {} };
  },
  mounted() {
    // this.$store.dispatch("getCampaign");
    console.log(this.campaign);
    
  },
  computed: {
    campaign() {
      return this.$store.getters.campaign;
    },
  },
  methods: {
    print() {
      console.log('fungsi print');
      
    }
  }
};
</script>
<style lang='scss' >
.invoice {
  background-image: url("../../public/background2.jpg");
  background-repeat: no-repeat;
  // position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;


  padding: 1em;
  padding-top: 6em !important;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  span {
    color: rgb(199, 189, 189);
    font-size: 1.2em;
    margin: 1em;
  }
  table {
    width: 500px;
    padding: 10px;
    margin: 50px;
    background-color: rgba(rgb(33, 34, 34), 0.6);
    border-collapse: collapse;
    td {
      font-size: 1em;
      color: rgb(199, 189, 189);
    }
    tr{
      padding: 20px;
    }
    .sum {
      // td {
      //   border-top: 1px solid black !important;
      // }
      text-transform: uppercase;
      font-weight: bold;
    }
    .exp {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1em;
      // input {
      //   // width: 50%;
      // }
    }
    td {
      padding: 0.5em;
      margin: 0 0 0 10px;
      input,
      select {
        border: none;
        color: white;
        background-color: rgba(rgb(33, 34, 34), 0.2);
        padding: 0.2em 0.5em;
        width: 100%;
      }
      // input{
        
      // }
      // select {
      // }
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
}
</style>