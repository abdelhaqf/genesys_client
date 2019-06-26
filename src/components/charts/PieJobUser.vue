<template>
  <div class="pie-job-user">
    <apexchart type="donut" width="300" :options="chartOptions" :series="series"/>
  </div>
</template>
<script>
export default {
  name: "pieJobUser",
  components: {},
  mounted() {
    this.$store.dispatch(
      "getTotalJobs",
      this.$store.getters.campaign.campaign_id
    );
  },
  computed: {
    series() {
      return this.$store.getters.totalJobs;
    }
  },
  data() {
    return {
      chartOptions: {
        labels: ["pegawai", "karyawan", "pengusaha"],
        title: {
          // text: "Job precentage"
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
                  label: "Job",
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