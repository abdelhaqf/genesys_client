import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";
import Snotify from "vue-snotify";
import Storage from "vue-ls";

Vue.use(Storage);
Vue.use(router);
Vue.use(Snotify);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    user: null,
    reviews: [],
    review: {},
    campaigns: [],
    myCampaigns: [],
    campaign: {},
    payments: [],
    results: [],
    totalSocmeds: [],
    totalGenders: [],
    totalJobs: [],
    totalSMM: null,
    totalPPC: null,
    countIsPaid: null,
    countFinished: null,
    totalActions: [],
    totalAllActions: [],
    totalIncome: {},
    progressAction: {},
    snotify: {},
    acceptedReviews: []
  },
  mutations: {
    setSnotify(state, data) {
      state.snotify = data;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
      Vue.ls.set("user", user);
      if (user == null) return;
      if (user.role == "admin") router.push("/admin/dashboard");
      else if (user.role == "user") router.push("/user/dashboard");
    },
    setReviews(state, reviews) {
      state.reviews = reviews;
    },
    setAcceptedReviews(state, reviews) {
      state.acceptedReviews = reviews;
    },
    setReview(state, review) {
      state.review = review;
    },
    setCampaigns(state, campaigns) {
      state.campaigns = campaigns;
    },
    setMyCampaigns(state, campaigns) {
      state.myCampaigns = campaigns;
    },
    setCampaign(state, campaign) {
      state.campaign = campaign;
      Vue.ls.set("campaign", campaign);
    },
    setPayments(state, payments) {
      state.payments = payments;
    },
    setResults(state, results) {
      state.results = results;
    },
    setTotalSocmeds(state, data) {
      state.totalSocmeds = [
        parseInt(data.facebook),
        parseInt(data.twitter),
        parseInt(data.instagram)
      ];
    },
    setTotalGenders(state, data) {
      state.totalGenders = [parseInt(data.pria), parseInt(data.wanita)];
    },
    setTotalJobs(state, data) {
      state.totalJobs = [
        parseInt(data.pegawai),
        parseInt(data.pelajar),
        parseInt(data.pengusaha)
      ];
    },
    setTotalSMM(state, data) {
      state.totalSMM = parseInt(data.total);
    },
    setTotalPPC(state, data) {
      state.totalPPC = parseInt(data.total);
    },
    setCountIsPaid(state, data) {
      state.countIsPaid = parseInt(data.count);
    },
    setCountFinished(state, data) {
      state.countFinished = parseInt(data.count);
    },
    setTotalActions(state, data) {
      state.totalActions = {
        view: parseInt(data.view),
        click: parseInt(data.click),
        like: parseInt(data.like)
      };
    },
    setTotalAllActions(state, data) {
      state.totalAllActions = [
        parseInt(data.view),
        parseInt(data.click),
        parseInt(data.like)
      ];
    },
    setTotalIncome(state, data) {
      state.totalIncome = data;
    },
    setProgressAction(state, data) {
      state.progressAction = data;
    }
  },
  getters: {
    snotify: state => {
      return state.snotify;
    },
    users: state => {
      return state.users;
    },
    user: state => {
      return state.user;
    },
    reviews: state => {
      return state.reviews;
    },
    acceptedReviews: state => {
      return state.acceptedReviews;
    },
    review: state => {
      return state.review;
    },
    campaigns: state => {
      return state.campaigns;
    },
    myCampaigns: state => {
      return state.myCampaigns;
    },
    campaign: state => {
      return state.campaign;
    },
    payments: state => {
      return state.payments;
    },
    results: state => {
      return state.results;
    },
    totalSocmeds: state => {
      return state.totalSocmeds;
    },
    totalGenders: state => {
      return state.totalGenders;
    },
    totalJobs: state => {
      return state.totalJobs;
    },
    totalSMM: state => {
      return state.totalSMM;
    },
    totalPPC: state => {
      return state.totalPPC;
    },
    countIsPaid: state => {
      return state.countIsPaid;
    },
    countFinished: state => {
      return state.countFinished;
    },
    totalActions: state => {
      return state.totalActions;
    },
    totalAllActions: state => {
      return state.totalAllActions;
    },
    totalIncome: state => {
      return state.totalIncome;
    },
    progressAction: state => {
      return state.progressAction;
    }
  },
  actions: {
    getReviews({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "gets");
      dispatch("axiosGo", [
        form,
        "testi.php",
        data => {
          commit("setReviews", data);
        }
      ]);
    },
    getAcceptedReviews({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getsaccepted");
      dispatch("axiosGo", [
        form,
        "testi.php",
        data => {
          commit("setAcceptedReviews", data);
        }
      ]);
    },
    getReview({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "get");
      form.append("campaign_id", id);
      dispatch("axiosGo", [form, "testi.php"]);
    },
    async submitReview({ commit, dispatch }, review) {
      var form = await dispatch("toFormData", [review, "insert"]);
      dispatch("axiosGo", [
        form,
        "testi.php",
        () => {
          dispatch("getReviews");
          // dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },
    deleteReview({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "delete");
      form.append("testimonial_id", id);
      dispatch("axiosGo", [
        form,
        "testi.php",
        () => {
          dispatch("getReviews");
        }
      ]);
    },
    async acceptReview({ commit, dispatch }, review) {
      var form = await dispatch("toFormData", [review, "accept"]);
      dispatch("axiosGo", [
        form,
        "testi.php",
        () => {
          dispatch("getReviews");
        }
      ]);
    },
    async declineReview({ commit, dispatch }, review) {
      var form = await dispatch("toFormData", [review, "decline"]);
      dispatch("axiosGo", [
        form,
        "testi.php",
        () => {
          dispatch("getReviews");
        }
      ]);
    },
    getUsers({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "gets");
      dispatch("axiosGo", [
        form,
        "user.php",
        data => {
          commit("setUsers", data);
        }
      ]);
    },
    getUser({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "get");
      form.append("user_id", id);
      dispatch("axiosGo", [form, "user.php"]);
    },
    async loginUser({ commit, dispatch }, user) {
      var form = await dispatch("toFormData", [user, "login"]);
      dispatch("axiosGo", [
        form,
        "user.php",
        data => {
          console.log("berhasil login");
          commit("setUser", data);
          commit("setSnotify", {
            type: "success",
            msg: "login success!"
          });
        },
        async () => {
          console.log("gagal login");
          await dispatch("logoutUser");
          commit("setSnotify", {
            type: "error",
            msg: "login failed!"
          });
        }
      ]);
    },
    logoutUser({ commit, dispatch }) {
      commit("setUser", null);
      Vue.ls.clear();
    },
    deleteUser({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "delete");
      form.append("user_id", id);
      dispatch("axiosGo", [
        form,
        "user.php",
        () => {
          dispatch("getUsers");
        }
      ]);
    },
    async updateUser({ commit, dispatch }, user) {
      var form = await dispatch("toFormData", [user, "update"]);
      await dispatch("axiosGo", [
        form,
        "user.php",
        async () => {
          await dispatch("getUsers");
          await commit("setUser", user);
          commit("setSnotify", {
            type: "success",
            msg: "profile updated!"
          });
        }
      ]);
    },
    async registerUser({ commit, dispatch }, user) {
      var form = await dispatch("toFormData", [user, "insert"]);
      dispatch("axiosGo", [
        form,
        "user.php",
        () => {
          dispatch("getUsers");
        }
      ]);
    },

    async submitCampaign({ commit, dispatch }, campaign) {
      var form = await dispatch("toFormData", [campaign, "insert"]);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },
    getCampaigns({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "gets");
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setCampaigns", data);
        }
      ]);
    },
    getMyCampaigns({ commit, dispatch }, user_id) {
      var form = new FormData();
      form.append("operation", "getMine");
      form.append("user_id", user_id);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setMyCampaigns", data);
        }
      ]);
    },
    deleteCampaign({ commit, dispatch }, campaign) {
      var form = new FormData();
      form.append("operation", "delete");
      form.append("campaign_id", campaign.campaign_id);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },
    async acceptCampaign({ commit, dispatch }, campaign) {
      var form = await dispatch("toFormData", [campaign, "accept"]);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },
    async declineCampaign({ commit, dispatch }, campaign) {
      var form = await dispatch("toFormData", [campaign, "decline"]);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },
    async finishCampaign({ commit, dispatch }, campaign) {
      var form = await dispatch("toFormData", [campaign, "finish"]);
      campaign.result = "finished";
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
          commit("setCampaign", campaign);
        }
      ]);
    },
    async selectCampaign({ commit, dispatch }, campaign) {
      commit("setCampaign", campaign);
    },
    unselectCampaign({ commit, dispatch }) {
      commit("setCampaign", {});
    },
    async payCampaign({ commit, dispatch }, campaign) {
      var form = await dispatch("toFormData", [campaign, "pay"]);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },
    async reviewCampaign({ commit, dispatch }, campaign) {
      var form = await dispatch("toFormData", [campaign, "review"]);
      dispatch("axiosGo", [
        form,
        "campaign.php",
        () => {
          dispatch("getCampaigns");
          dispatch("getMyCampaigns", campaign.user_id);
        }
      ]);
    },

    async createBill({ commit, dispatch }, bill) {
      var form = await dispatch("toFormData", [bill, "insert"]);
      dispatch("axiosGo", [form, "payment.php", () => {}]);
    },
    getPayments({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "gets");
      dispatch("axiosGo", [
        form,
        "payment.php",
        data => {
          commit("setPayments", data);
        }
      ]);
    },
    async payBill({ commit, dispatch }, bill) {
      var form = await dispatch("toFormData", [bill, "pay"]);
      dispatch("axiosGo", [form, "payment.php", () => {}]);
    },

    async submitProgress({ commit, dispatch }, progress) {
      var form = await dispatch("toFormData", [progress, "insert"]);
      dispatch("axiosGo", [
        form,
        "result.php",
        () => {
          dispatch("getResults", progress.campaign_id);
        }
      ]);
    },
    getResults({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "getMine");
      form.append("campaign_id", id);
      dispatch("axiosGo", [
        form,
        "result.php",
        async data => {
          await commit("setResults", data);
          await dispatch("getTotalJobs", id);
          await dispatch("getTotalGenders", id);
          await dispatch("getTotalSocmeds", id);
          await dispatch("getTotalActions", id);
          await dispatch("getTotalAllActions", id);
        }
      ]);
    },
    deleteResult({ commit, dispatch }, result) {
      var form = new FormData();
      form.append("operation", "delete");
      form.append("result_id", result.result_id);
      dispatch("axiosGo", [
        form,
        "result.php",
        () => {
          dispatch("getResults", result.campaign_id);
        }
      ]);
    },

    getTotalSocmeds({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "getTotalSocmeds");
      form.append("campaign_id", id);
      dispatch("axiosGo", [
        form,
        "result.php",
        data => {
          commit("setTotalSocmeds", data);
        }
      ]);
    },
    getTotalGenders({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "getTotalGenders");
      form.append("campaign_id", id);
      dispatch("axiosGo", [
        form,
        "result.php",
        data => {
          commit("setTotalGenders", data);
        }
      ]);
    },
    getTotalJobs({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "getTotalJobs");
      form.append("campaign_id", id);
      dispatch("axiosGo", [
        form,
        "result.php",
        data => {
          commit("setTotalJobs", data);
        }
      ]);
    },
    getTotalSMM({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getTotalSMM");
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setTotalSMM", data);
        }
      ]);
    },
    getTotalPPC({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getTotalPPC");
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setTotalPPC", data);
        }
      ]);
    },
    getCountIsPaid({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getCountPaidCampaign");
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setCountIsPaid", data);
        }
      ]);
    },
    getCountFinished({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getCuontFinishedCampaign");
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setCountFinished", data);
        }
      ]);
    },
    getTotalActions({ commit, dispatch }, id) {
      var form = new FormData();
      form.append("operation", "getTotalActions");
      form.append("campaign_id", id);
      dispatch("axiosGo", [
        form,
        "result.php",
        data => {
          commit("setTotalActions", data);
        }
      ]);
    },
    getTotalAllActions({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getTotalAllActions");
      dispatch("axiosGo", [
        form,
        "result.php",
        data => {
          commit("setTotalAllActions", data);
        }
      ]);
    },
    getTotalIncome({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getTotalIncome");
      dispatch("axiosGo", [
        form,
        "campaign.php",
        data => {
          commit("setTotalIncome", data);
        }
      ]);
    },
    getProgressAction({ commit, dispatch }) {
      var form = new FormData();
      form.append("operation", "getProgressAction");
      dispatch("axiosGo", [
        form,
        "result.php",
        data => {
          commit("setProgressAction", data);
        }
      ]);
    },

    async axiosGo({ commit, dispatch }, param) {
      await axios
        .post("http://localhost/genesys_api/" + param[1], param[0])
        .then(response => {
          if (param[2]) {
            param[2](response.data);
          }
        })
        .catch(err => {
          console.log(err);
          if (param[3]) param[3]();
        });
    },
    toFormData({ commit, dispatch }, param) {
      var form_data = new FormData();
      for (var key in param[0]) {
        form_data.append(key, param[0][key]);
      }
      form_data.append("operation", param[1]);
      return form_data;
    }
  }
});
