<template>
  <div class="bar-income-user">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"/>
    <pre>

    <!-- {{$store.getters.totalIncome + 'asd'}} -->
    </pre>
  </div>
</template>
<script>
export default {
  name: "barlIncomeUser",
  mounted() {
    this.$store.dispatch("getTotalIncome");
  },
  computed: {
    series() {
      this.mySeries = [
        {
          name: "Income",
          data: []
        }
      ];
      for (var i = 0; i < this.$store.getters.totalIncome.length; i++) {
        this.mySeries[0].data.push(
          parseInt(this.$store.getters.totalIncome[i].sum)
        );
      }

      return this.mySeries;
    },
    chartOptions() {
      var help = [];
      for (var i = 0; i < this.$store.getters.totalIncome.length; i++) {
        help.push(
          this.$store.getters.totalIncome[i].month +
            " " +
            this.$store.getters.totalIncome[i].year
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
              style: "currency",
              currency: "IDR",
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
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
              });
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
  .bar-income-user{
    background-color: rgba(azure, 0.6);
  }
.table-info {
  td {
    padding: 0.5em;
  }
  margin-bottom: 1em;
}
.table-details {
  border-collapse: collapse;
  border: 1px dotted grey;

  tr:nth-child(even) {
    background-color: honeydew;
  }
  td,
  th {
    padding: 0.8em;
  }
  th {
    text-align: center;
  }
}
</style>