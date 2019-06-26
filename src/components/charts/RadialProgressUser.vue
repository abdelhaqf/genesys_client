<template>
  <div class="radial-progress-user">
    <apexchart type="radialBar" width="240" :options="chartOptions2" :series="series"/>
    <!-- {{series}} -->
  </div>
</template>
<script>
export default {
  name: "radialProgressUser",
  mounted() {
    this.$store.dispatch("getTotalActions", this.$store.getters.campaign);
  },
  computed: {
    series() {
      // console.log(this.$store.getters.totalActions);
      // console.log("abude");
      // console.log(this.$store.getters.totalActions[0]);
      if (!this.$store.getters.totalActions.view) {
        // console.log("hula");
        return [0];
      }
      var tView = parseInt(this.$store.getters.campaign.target_view);
      tView = tView == 0 ? 1 : tView;
      var tClick = parseInt(this.$store.getters.campaign.target_click);
      tClick = tClick == 0 ? 1 : tClick;
      var tLike = parseInt(this.$store.getters.campaign.target_like);
      tLike = tLike == 0 ? 1 : tLike;

      // var tView = 1;
      // var tClick = 1;
      // var tLike = 1;

      var view = Math.ceil(
        (this.$store.getters.totalActions.view * 100) / tView
      );
      var click = Math.ceil(
        (this.$store.getters.totalActions.click * 100) / tClick
      );
      var like = Math.ceil(
        (this.$store.getters.totalActions.like * 100) / tLike
      );

      return [parseInt((view + click + like) / 3)];
      // return [30];
      // console.log("a");
      // console.log(parseInt(view + click + like));
      // return [40];
    },
    chartOptions2() {
      return {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "12px"
              },
              value: {
                formatter: function(val) {
                  return parseInt(val) + "%";
                },
                color: "#111",
                fontSize: "24px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Campaign Progress"]
      };
    }
  },
  data() {
    return {
      // series: [120, 55, 67, 83],
      // chartOptions:
    };
  }
};
</script>
<style lang='scss' scoped>
</style>