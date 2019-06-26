<template>
  <div class="pie-service-user">
    <apexchart type="donut" height="250" :options="chartOptions" :series="series"/>
    <!-- <button @click="series=[1,2,3]">tes</button> -->
  </div>
</template>
<script>
export default {
  name: "pieServiceUser",
  components: {},
  mounted() {
    this.$store.dispatch("getTotalSMM");
    this.$store.dispatch("getTotalPPC");
  },
  computed: {
    series() {
      if (this.$store.getters.totalSMM || this.$store.getters.totalPPC)
        return [this.$store.getters.totalSMM, this.$store.getters.totalPPC];
      else return [0, 0];
    }
  },
  data() {
    return {
      chartOptions: {
        legend: {
          position: "bottom"
        },
        width: 200,
        labels: ["sm marketing", "pay per click"],
        title: {
          // text: "Service precentage"
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
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: undefined,
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: undefined,
                  offsetY: 16,
                  formatter: function(val) {
                    return val + " campaign(s)";
                  }
                },
                total: {
                  show: true,
                  label: "Service Type",
                  color: "#373d3f",
                  formatter: function(w) {
                    return (
                      w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0) + "campaign(s)"
                    );
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
.pie-service-user {
  padding: 2em;
}
</style>