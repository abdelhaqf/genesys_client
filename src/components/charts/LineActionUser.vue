<template>
  <div class="line-action-user">
    <apexchart type="line" :options="chartOptions" :series="series"/>
  </div>
</template>
<script>
export default {
  name: "lineActionUser",
  mounted() {},
  computed: {
    series() {
      var temp = [
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
      for (var i = 0; i < this.$store.getters.results.length; i++) {
        temp[0].data.push(
          parseInt(this.$store.getters.results[i].current_view)
        );
        temp[1].data.push(
          parseInt(this.$store.getters.results[i].current_click)
        );
        temp[2].data.push(
          parseInt(this.$store.getters.results[i].current_like)
        );
      }
      this.mySeries = temp;

      return this.mySeries;
    },
    chartOptions() {
      var temp = [];
      var maxValue = 0;
      for (var i = 0; i < this.$store.getters.results.length; i++) {
        temp.push(this.$store.getters.results[i].created_at.substring(0, 10));
        if (parseInt(this.$store.getters.results[i].current_view) > maxValue)
          maxValue = parseInt(this.$store.getters.results[i].current_view);
        if (parseInt(this.$store.getters.results[i].current_click) > maxValue)
          maxValue = parseInt(this.$store.getters.results[i].current_click);
        if (parseInt(this.$store.getters.results[i].current_like) > maxValue)
          maxValue = parseInt(this.$store.getters.results[i].current_like);
        // console.log(maxValue);
        maxValue = parseInt(maxValue);
      }
      return {
        chart: {
          type: "line",
          width: "170%",

          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: true
          }
        },

        // colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val.toLocaleString("ID", {
              // style: "accounting",
              // currency: "IDR",
              minimumFractionDigits: 0
            });
          }
        },
        stroke: {
          curve: "smooth"
        },
        title: {
          text: "Action graph",
          align: "left"
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 6
        },
        xaxis: {
          categories: temp,
          title: {
            text: "Time"
          }
        },

        yaxis: {
          title: {
            text: "Action"
          },
          labels: {
            show: true,
            formatter: function(val) {
              return val.toLocaleString("ID", {
                // style: "currency",
                // currency: "IDR",
                minimumFractionDigits: 0
              });
            }
          },
          min: 0,
          max: parseInt(maxValue + maxValue * 0.2)
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          floating: true,
          offsetY: -25,
          offsetX: -20
        }
      };
    }
  },
  data() {
    return {
      mySeries: [
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
      ]
    };
  }
};
</script>
<style lang='scss' scoped>
</style>