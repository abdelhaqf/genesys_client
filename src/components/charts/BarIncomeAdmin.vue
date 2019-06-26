<template>
  <div class="bar-income-user">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"/>
    <pre>

    <!-- {{$store.getters.totalIncome + 'asd'}} -->
    </pre>
    <FormDetail ref="detail" v-if="mySeries[0].data.length">
      <div slot="content">
        <table class="table-info">
          <tr>
            <td>period</td>
            <td>:</td>
            <td>{{this.$store.getters.totalIncome[selectedSeries].month}} {{this.$store.getters.totalIncome[selectedSeries].year}}</td>
          </tr>
          <tr>
            <td>total income</td>
            <td>:</td>
            <td>{{series[0].data[selectedSeries] | rp}}</td>
          </tr>
        </table>
        <table class="table-details">
          <tr>
            <th>date</th>
            <th>user id</th>
            <th>username</th>
            <th>company</th>
            <th>price</th>
          </tr>
          <tr v-for="(item) in monthlyData" :key="item.campaign_id">
            <td>{{item.created_at.substring(0,10)}}</td>
            <td>{{item.user_id}}</td>
            <td>{{getUserName(item.user_id)}}</td>
            <td>{{item.company_name}}</td>
            <td>{{item.final_cost | rp}}</td>
          </tr>
        </table>
      </div>
    </FormDetail>
  </div>
</template>
<script>
import FormDetail from "@/components/FormDetail";
export default {
  name: "barlIncomeUser",
  components: { FormDetail },
  methods: {
    showTable() {
      this.$refs.detail.open();
    },
    getUserName(id) {
      var help = this.$store.getters.users.find(usr => {
        return usr.user_id == id;
      });
      // console.log(help);
      if (help == undefined) return "";
      return help.username;
      // return "a";
    }
  },
  mounted() {
    this.$store.dispatch("getTotalIncome");
    this.$store.dispatch("getUsers");
  },
  computed: {
    monthlyData() {
      var data = this.$store.getters.campaigns;
      data = data.filter(item => {
        // console.log(item.created_at);
        // console.log(new Date(item.created_at).getMonth());
        // console.log(this.month[new Date(item.created_at).getMonth()]);
        // console.log(this.$store.getters.totalIncome[this.selectedSeries].month);
        // console.log(new Date(item.created_at).getYear() + 1900);
        // console.log(
        //   parseInt(this.$store.getters.totalIncome[this.selectedSeries].year)
        // );
        return (
          item.is_paid == "1" &&
          this.month[new Date(item.created_at).getMonth()] ==
            this.$store.getters.totalIncome[this.selectedSeries].month &&
          new Date(item.created_at).getYear() + 1900 ==
            parseInt(this.$store.getters.totalIncome[this.selectedSeries].year)
        );
      });
      return data;
    },
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
          type: "bar",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              this.selectedSeries = config.dataPointIndex;
              this.showTable();
            }
          }
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
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      selectedSeries: 0,
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