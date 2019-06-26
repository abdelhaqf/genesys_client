<template>
  <div class="form-update-user">
    <table v-if="this.$store.getters.user.username">
      <tr>
        <td>profile</td>
        <td>
          <label for="fileToUpload">{{theFile.name?theFile.name+' ':'click to open file dialog '}}</label>
          <input
            v-show="theFile.name"
            type="submit"
            @click.prevent="theFile = $refs.fileupload.files[0];upload()"
            name="submit"
            value="upload"
          >
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div style="width:0px; overflow:hidden;height: 0px;">
            <input
              type="file"
              ref="fileupload"
              id="fileToUpload"
              @change="theFile = $refs.fileupload.files[0]"
              style="width:0px; overflow:hidden;height: 0px;"
            >
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div class="image-container" v-if="profileURL">
            <img :src="profileURL" alt>
          </div>
        </td>
      </tr>
      <tr>
        <td>user id</td>
        <td>{{user.user_id}}</td>
      </tr>
      <tr>
        <td>username</td>
        <td>{{user.username}}</td>
      </tr>
      <tr>
        <td>new password</td>
        <td>
          <input type="password" v-model="user.password">
        </td>
      </tr>

      <tr>
        <td>e-mail</td>
        <td>
          <input type="text" v-model="user.email">
        </td>
      </tr>
      <tr>
        <td>company name</td>
        <td>
          <input type="text" v-model="user.company_name">
        </td>
      </tr>
      <tr>
        <td>first name</td>
        <td>
          <input type="text" v-model="user.first_name">
        </td>
      </tr>
      <tr>
        <td>last name</td>
        <td>
          <input type="text" v-model="user.last_name">
        </td>
      </tr>

      <tr>
        <td>phone</td>
        <td>
          <input type="text" v-model="user.phone_number">
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="submit" value="SAVE" @click="updateUser" class="submit">
        </td>
      </tr>
    </table>
    <span style="width:0;height:0;overflow:hidden;">{{theUser}}</span>
  </div>
</template>
<script>
import md5 from "md5";
import axios from "axios";
export default {
  name: "formUpdateUser",
  mounted() {},
  computed: {
    theUser() {
      Object.assign(this.user, this.$store.getters.user);
      this.user.password = "";
      return this.user;
    }
  },
  data() {
    return {
      user: {
        username: ""
      },
      theFile: {},
      profileURL: ""
    };
  },
  methods: {
    upload() {
      console.log("uploading");
      let formData = new FormData();
      formData.append("file", this.theFile);
      axios({
        method: "post",
        url: "http://localhost/genesys_api/upload.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(data => {
          this.profileURL =
            "http://localhost/genesys_api/upload/" + this.theFile.name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async updateUser() {
      this.user.img = this.theFile.name;
      if (this.user.password.length == 0) {
        this.user.password = await this.$store.getters.user.password;
      } else {
        this.user.password = md5(this.user.password);
      }
      var help = {};
      Object.assign(help, this.user);

      await this.$store.dispatch("updateUser", help);
    }
  }
};
</script>
<style lang='scss' scoped>
table{
  background-color: rgba(azure, 0.8);
}
.form-update-user {
  .image-container {
    margin-left: 2em;
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
  table {
    td:first-child {
      font-size: 0.8em;
      color: grey;
    }
    td {
      padding: 0.5em;
      input {
        padding: 0.5em 1em;
      }
      .submit {
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
