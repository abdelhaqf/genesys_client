<template>
  <div class="table-user">
    <span
      class="btnEdit"
      @click="isEditable= !isEditable"
      :class="{btnEditActive: isEditable}"
    >{{isEditable?'lock':'edit'}}</span>
    <table>
      <tr>
        <th>ID</th>
        <th>username</th>
        <th>e-mail</th>
        <!-- <th>first name</th>
        <th>last name</th>-->
        <th>company</th>
        <!-- <th></th> -->
      </tr>
      <tr v-for="(item) in users" :key="item.user_id" @click="detailUser(item)">
        <td>{{item.user_id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.email}}</td>
        <!-- <td>{{item.first_name}}</td>
        <td>{{item.last_name}}</td>-->
        <td>{{item.company_name}}</td>
        <td v-if="isEditable" class="delete" @click.self.stop="deleteUser(item)">x</td>
      </tr>
    </table>
    <FormConfirm
      ref="confirmation"
      @yes="$store.dispatch('deleteUser',selectedUser.user_id);$snotify.warning('user deleted!')"
    >
      <div slot="msg">
        Are you sure to delete user
        <b>{{selectedUser.username}}</b> ?
      </div>
    </FormConfirm>
    <FormDetail ref="detail">
      <table slot="content">
        <tr>
          <td>user id</td>
          <td>{{selectedUser.user_id}}</td>
        </tr>
        <tr>
          <td>e-mail</td>
          <td>{{selectedUser.email}}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{{selectedUser.username}}</td>
        </tr>
        <tr>
          <td>company name</td>
          <td>{{selectedUser.company_name}}</td>
        </tr>
        <tr>
          <td>first name</td>
          <td>{{selectedUser.first_name}}</td>
        </tr>
        <tr>
          <td>last name</td>
          <td>{{selectedUser.last_name}}</td>
        </tr>

        <tr>
          <td>phone</td>
          <td>{{selectedUser.phone_number}}</td>
        </tr>
      </table>
    </FormDetail>
  </div>
</template>
<script>
import FormConfirm from "@/components/FormConfirm";
import FormDetail from "@/components/FormDetail";
export default {
  name: "tableUser",
  components: { FormConfirm, FormDetail },
  data() {
    return { isEditable: false, selectedUser: "" };
  },
  created() {
    this.$store.dispatch("getUsers");
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    deleteUser(user) {
      this.selectedUser = user;
      this.$refs.confirmation.open();
    },
    detailUser(user) {
      this.selectedUser = user;
      console.log(this.selectedUser);
      this.$refs.detail.open();
    }
  }
};
</script>
<style lang='scss' scoped>
.table-user {
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
.table-user > table > tr:hover > td {
  cursor: pointer;
  background-color: rgba(dodgerblue, 0.2);
}
</style>