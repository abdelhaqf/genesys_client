<template>
  <div class="bar-action-user">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"/>
    <pre>

    <!-- {{$store.getters.totalIncome + 'asd'}} -->
    </pre>
  </div>
</template>
<script>
export default {
  name: "barActionAdmin",
  mounted() {
    this.$store.dispatch("getProgressAction");
  },
  computed: {
    series() {
      this.mySeries = [
        {
          name: "view",
          data: []
        },
        {
          name: "click",
          data: []
        },
        {
          name: "like",
          data: []
        }
      ];
      for (var i = 0; i < this.$store.getters.progressAction.length; i++) {
        this.mySeries[0].data.push(
          parseInt(this.$store.getters.progressAction[i].view)
        );
        this.mySeries[1].data.push(
          parseInt(this.$store.getters.progressAction[i].click)
        );
        this.mySeries[2].data.push(
          parseInt(this.$store.getters.progressAction[i].like)
        );
      }

      return this.mySeries;
    },
    chartOptions() {
      var help = [];
      for (var i = 0; i < this.$store.getters.progressAction.length; i++) {
        help.push(
          this.$store.getters.progressAction[i].month +
            " " +
            this.$store.getters.progressAction[i].year
        );
      }

      return {
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val.toLocaleString("ID", {
              // style: "accounting",
              // currency: "IDR",
              minimumFractionDigits: 0
            });
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: help,
          position: "top",
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          // crosshairs: {
          //   fill: {
          //     type: "gradient",
          //     gradient: {
          //       colorFrom: "#D8E3F0",
          //       colorTo: "#BED1E6",
          //       stops: [0, 100],
          //       opacityFrom: 0.4,
          //       opacityTo: 0.5
          //     }
          //   }
          // },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val) {
              return val.toLocaleString("ID", {
                // style: "currency",
                // currency: "IDR",
                minimumFractionDigits: 0
              });
            }
          }
        },
        title: {
          text: "Monthly Actions",
          floating: true,
          offsetY: 300,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };
    }
  },
  data() {
    return {
      mySeries: [
        {
          name: "Income",
          data: []
        }
      ],
      myChartOptions: {
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val + "";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          position: "top",
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val) {
              return val + "";
            }
          }
        },
        title: {
          text: "Monthly Income",
          floating: true,
          offsetY: 320,
          align: "center",
          style: {
            color: "#444"
          }
        }
      }
    };
  }
};
</script>
<style lang='scss' scoped>
  .bar-action-user{
    background-color: rgba(azure, 0.6);
  }
</style>