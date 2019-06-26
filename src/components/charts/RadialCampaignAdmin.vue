<template>
  <div class="radial-progress-user">
    <apexchart type="radialBar" height="290" :options="chartOptions" :series="series"/>
  </div>
</template>
<script>
export default {
  name: "radialProgressUser",
  mounted() {
    this.$store.dispatch("getCountIsPaid");
    this.$store.dispatch("getCountFinished");
  },
  computed: {
    series() {
      if (this.$store.getters.countFinished && this.$store.getters.countIsPaid)
        return [
          parseInt(
            (this.$store.getters.countFinished /
              this.$store.getters.countIsPaid) *
              100
          )
        ];
      else return [0];
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 280,
          type: "radialBar"
        },
        colors: ["#20E647"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "70%",
              background: "#293450"
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: "#fff",
                fontSize: "13px"
              },
              value: {
                color: "#fff",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Progress"]
      }
    };
  }
};
</script>
<style lang='scss' scoped>
</style>