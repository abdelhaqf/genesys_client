import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue-apexcharts";
import Snotify from "vue-snotify";
import VueScrollReveal from "vue-scroll-reveal";
import AllIosIcon from "vue-ionicons/dist/ionicons-ios.js";
import AllLogoIcon from "vue-ionicons/dist/ionicons-logo.js";
import "vue-ionicons/ionicons.scss";
import "vue-snotify/styles/material.scss";
import Storage from "vue-ls";
import StarRating from "vue-star-rating";

Vue.config.productionTip = false;
Vue.filter("rp", function(value) {
  const formatter = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});
Vue.filter("num", function(value) {
  const formatter = new Intl.NumberFormat("ID", {
    // style: "currency",
    // currency: "IDR",
    // currencyDisplay: "symbol",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.use(Storage);
Vue.use(AllIosIcon);
Vue.use(AllLogoIcon);
Vue.use(VueScrollReveal, {
  class: "v-scroll-reveal", // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 800,
  scale: 1,
  distance: "10px",
  mobile: false
});
Vue.use(Snotify);
Vue.use(VueApexCharts);
Vue.use(StarRating);
Vue.component("apexchart", VueApexCharts);
Vue.component("star-rating", StarRating);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
