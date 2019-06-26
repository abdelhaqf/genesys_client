<template>
  <div class="radial-action-user">
    <apexchart type="radialBar" width="250" :options="chartOptions" :series="series"/>
  </div>
</template>
<script>
export default {
  name: "radialActionUser",
  mounted() {
    this.$store.dispatch("getTotalActions", this.$store.getters.campaign);
  },
  computed: {
    series() {
      // console.log(this.$store.getters.totalActions);
      if (!this.$store.getters.totalActions.view) return [0, 0, 0];
      var tView = parseInt(this.$store.getters.campaign.target_view);
      tView = tView == 0 ? 1 : tView;
      var tClick = parseInt(this.$store.getters.campaign.target_click);
      tClick = tClick == 0 ? 1 : tClick;
      var tLike = parseInt(this.$store.getters.campaign.target_like);
      tLike = tLike == 0 ? 1 : tLike;

      var view = Math.ceil(
        (this.$store.getters.totalActions.view * 100) / tView
      );
      var click = Math.ceil(
        (this.$store.getters.totalActions.click * 100) / tClick
      );
      var like = Math.ceil(
        (this.$store.getters.totalActions.like * 100) / tLike
      );
      return [view, click, like];
    }
  },
  data() {
    return {
      // series: [120, 55, 67, 83],
      chartOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "18px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "Actions",
                formatter: function(w) {
                  return "%";
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  // console.log(w);
                  // return w[0] + "%";
                  // return w.globals.seriesTotals.reduce((a, b) => {
                  //   return a + b;
                  // }, 0);
                }
              }
            }
          }
        },
        labels: ["view", "click", "like"]
      }
    };
  }
};
</script>
<style lang='scss' scoped>
</style>