<template>
  <div class="pie-gender-user">
    <apexchart type="donut" width="300" :options="chartOptions" :series="series"/>
    <!-- <button @click="series=[1,2,3]">tes</button> -->
  </div>
</template>
<script>
export default {
  name: "pieGenderUser",
  components: {},
  mounted() {
    this.$store.dispatch(
      "getTotalGenders",
      this.$store.getters.campaign.campaign_id
    );
  },
  computed: {
    series() {
      return this.$store.getters.totalGenders;
      // return [1, 2];
    }
  },
  data() {
    return {
      // series: [44, 55, 123],
      chartOptions: {
        labels: ["pria", "wanita"],
        title: {
          // text: "Gender precentage"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        legend: {
          position: "bottom"
        },
        width: 200,
        chart: {
          toolbar: {
            show: true,
            tools: {
              download: true
            }
          }
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: undefined,
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: undefined,
                  offsetY: 16,
                  formatter: function(val) {
                    return val.toLocaleString("ID", {
                      minimumFractionDigits: 0
                    });
                  }
                },
                total: {
                  show: true,
                  label: "Gender",
                  color: "#373d3f",
                  formatter: function(w) {
                    return w.globals.seriesTotals
                      .reduce((a, b) => {
                        return a + b;
                      }, 0)
                      .toLocaleString("ID", {
                        minimumFractionDigits: 0
                      });
                  }
                }
              }
            }
          }
        }
      }
    };
  }
};
</script>
<style lang='scss' scoped>
</style>