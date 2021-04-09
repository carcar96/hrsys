<template>
  <div id="entanls" class="entanls">
    <el-form
      :inline="true"
      :model="searchForm"
      :rules="searchRule"
      :hide-required-asterisk="true"
      ref="searchForm"
      size="medium"
    >
      <el-form-item label="离职企业" prop="leave_enterprise">
        <el-select
          v-model="searchForm.leave_enterprise"
          placeholder="请选择"
          style="width: 150px"
        >
          <el-option label="全部" value="0"> </el-option>
          <el-option
            v-for="item in sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          :shortcuts="shortcuts"
          :clearable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSearchForm('searchForm')"
          >搜索</el-button
        >
        <el-button type="warning" @click="resetSearchForm('searchForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <div class="echart" id="echart-ent-total"></div>
    </el-card>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card reason">
          <div class="echart" id="echart-leave-reason"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card retained">
          <div class="content">
            <h3 class="echart-title">留存排名</h3>
            <div class="table-box">
              <el-table
                :data="retainedTableData"
                border
                size="medium"
                :header-cell-style="{ backgroundColor: '#F7F7F7' }"
                :cell-style="setCellColor"
                @sort-change="sortChange"
                height="100%"
              >
                <el-table-column
                  label="排名"
                  type="index"
                  width="54"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="company" label="企业名称" align="center">
                </el-table-column>
                <el-table-column
                  prop="entry"
                  width="120"
                  label="入职"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="onjob"
                  width="120"
                  label="在职"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="leave"
                  width="120"
                  label="离职"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="percent"
                  width="150"
                  label="留存比"
                  sortable
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div class="tool">
        <span class="echart-title">企业留存情况</span>
        <el-radio-group
          v-model="datesegment"
          size="medium"
          style="margin-left: 30px; margin-right: 50px"
        >
          <el-radio-button label="0">日</el-radio-button>
          <el-radio-button label="1">周</el-radio-button>
          <el-radio-button label="2">月</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="recruittype">
          <el-radio label="0">入职人数</el-radio>
          <el-radio label="1">在职人数</el-radio>
          <el-radio label="2">离职人数</el-radio>
        </el-radio-group>
      </div>
      <div class="echart" id="echart-retained"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sexOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      searchForm: {
        date: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(),
        ],
        leave_enterprise: "0",
      },
      searchRule: {
        date: [
          {
            type: "array",
            required: true,
            message: "请选择日期区间",
            trigger: "change",
            fields: {
              0: { type: "date", required: true, message: "请选择开始日期" },
              1: { type: "date", required: true, message: "请选择结束日期" },
            },
          },
        ],
      },
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
      entTotalData: {
        x: ["凡谷", "天马", "友德", "富士康", "美的", "格力", "超科"],
        y: [
          [62, 67, 60, 52, 43, 54, 65],
          [54, 47, 50, 42, 41, 41, 53],
          [8, 20, 10, 14, 2, 13, 12],
        ],
        legend: ["累计入职", "在职", "离职"],
      },
      leaveReasonData: {
        x: ["薪资低", "环境差", "压力大", "个人原因", "伙食差", "拖欠工资"],
        y: [34, 3, 12, 20, 14, 17],
      },
      retainedTableData: [
        {
          company: "凡谷",
          entry: "100",
          onjob: "100",
          leave: "10",
          percent: "90",
        },
        {
          company: "联想",
          entry: "100",
          onjob: "100",
          leave: "10",
          percent: "60",
        },
        {
          company: "天马",
          entry: "100",
          onjob: "100",
          leave: "10",
          percent: "50",
        },
        {
          company: "凡谷",
          entry: "100",
          onjob: "100",
          leave: "10",
          percent: "40",
        },
        {
          company: "凡谷",
          entry: "100",
          onjob: "100",
          leave: "10",
          percent: "30",
        },
        {
          company: "凡谷",
          entry: "100",
          onjob: "100",
          leave: "10",
          percent: "20",
        },
      ],
      datesegment: "0",
      recruittype: "0",
      lineData: [
        {
          x: [
            "03.01",
            "03.02",
            "03.03",
            "03.04",
            "03.05",
            "03.06",
            "03.07",
            "03.08",
            "03.09",
            "03.10",
          ],
          y: [
            [21, 12, 3, 21, 32, 42, 21, 12, 32, 22],
            [31, 12, 3, 21, 32, 22, 21, 12, 32, 32],
            [11, 12, 3, 21, 32, 52, 21, 12, 32, 42],
            [41, 12, 3, 21, 32, 32, 21, 12, 32, 12],
            [31, 12, 3, 21, 32, 22, 21, 12, 32, 32],
            [11, 12, 3, 21, 32, 52, 21, 12, 32, 42],
          ],
        },
        {
          x: [
            "03.01-07",
            "03.08-14",
            "03.15-22",
            "03.22-29",
            "03.30-04.06",
            "04.07-14",
            "04.15-22",
            "04.23-30",
          ],
          y: [
            [121, 112, 13, 121, 232, 121, 132, 152],
            [131, 112, 13, 121, 132, 121, 132, 132],
            [111, 112, 13, 121, 332, 121, 132, 142],
            [141, 112, 13, 121, 232, 121, 132, 122],
            [131, 112, 13, 121, 132, 121, 132, 132],
            [111, 112, 13, 121, 332, 121, 132, 142],
          ],
        },
        {
          x: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ],
          y: [
            [421, 412, 43, 421, 432, 442, 421, 412, 143, 421, 432, 412],
            [431, 412, 243, 221, 432, 442, 421, 412, 243, 421, 432, 442],
            [411, 412, 43, 321, 432, 442, 421, 412, 343, 421, 432, 452],
            [441, 412, 43, 121, 432, 442, 421, 412, 443, 421, 432, 432],
            [431, 412, 243, 221, 432, 442, 421, 412, 243, 421, 432, 442],
            [411, 412, 43, 321, 432, 442, 421, 412, 343, 421, 432, 452],
          ],
        },
      ],
      chartRetained: null,
    };
  },
  watch: {
    datesegment(newVal) {
      this.updateLineData();
    },
    recruittype(newVal) {
      this.updateLineData();
    },
  },
  mounted() {
    this.initChartEnt("echart-ent-total", this.entTotalData);
    this.initChartReason("echart-leave-reason", {
      title: "离职原因",
      x: this.leaveReasonData.x,
      y: this.leaveReasonData.y,
    });
    this.updateLineData();
  },
  methods: {
    initChartReason(domId, echartData) {
      var option = {
        title: {
          text: echartData.title,
        },
        tooltip: {
          trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          axisPointer: {
            //去掉移动的指示线
            type: "none",
          },
        },
        xAxis: {
          type: "category",
          data: echartData.x,
          axisTick: {
            show: false, //x轴刻度线设置
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: echartData.y,
          },
        ],
      };

      let getchart = this.$echarts.init(document.getElementById(domId));

      getchart.setOption(option);

      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },
    initChartEnt(domId, echartData) {
      let legend = echartData.legend;
      let series = [];
      echartData.y.forEach((item, index) => {
        series.push({
          name: legend[index],
          type: "bar",
          data: item,
        });
      });

      var option = {
        title: {
          text: "企业累计入职/在职/离职",
        },
        legend: {
          data: legend,
        },
        // 提示框组件
        tooltip: {
          trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          axisPointer: {
            //去掉移动的指示线
            type: "none",
          },
        },
        xAxis: {
          type: "category",
          data: echartData.x,
          axisTick: {
            show: false, //x轴刻度线设置
          },
        },
        yAxis: {
          type: "value",
          name: echartData.y.name,
        },
        series: series,
      };

      let getchart = this.$echarts.init(document.getElementById(domId));

      getchart.setOption(option);

      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    sortChange(data) {
      console.log(data);
    },
    updateLineData() {
      let dIdx = Number(this.datesegment);
      let rIdx = Number(this.recruittype);
      this.initChartLine(this.lineData[dIdx].x, this.lineData[dIdx].y[rIdx]);
    },
    initChartLine(xData, yData) {
      if (!this.chartRetained) {
        let getchart = this.$echarts.init(
          document.getElementById("echart-retained")
        );

        var option = {
          //dataZoom-inside 内置型数据区域缩放组件 所谓内置 1平移：在坐标系中滑动拖拽进行数据区域平移。2缩放：PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同;移动端：在移动端触屏上，支持两指滑动缩放。
          dataZoom: [
            {
              type: "inside", //1平移 缩放
              throttle: "50", //设置触发视图刷新的频率。单位为毫秒（ms）。
              minValueSpan: 5, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
              start: 100, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
              end: 100, //数据窗口范围的结束百分比。范围是：0 ~ 100。
              zoomLock: true, //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
            },
          ],
          // 提示框组件
          tooltip: {
            trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            // backgroundColor: "#377CFF", //提示框浮层的背景颜色。
            axisPointer: {
              //去掉移动的指示线
              // type: "none",
            },
          },
          xAxis: {
            type: "category",
            data: xData,
            axisTick: {
              show: false, //x轴刻度线设置
            },
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              type: "line",
              data: yData,
            },
          ],
        };

        getchart.setOption(option);

        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          getchart.resize();
        });

        this.chartRetained = getchart;
      } else {
        var option = this.chartRetained.getOption();
        // 先清空
        option.xAxis[0].data = [];
        option.series[0].data = [];
        this.chartRetained.setOption(option);
        // 再设置
        option.xAxis[0].data = xData;
        option.series[0].data = yData;
        option.dataZoom[0].start = 100;
        option.dataZoom[0].end = 100;
        this.chartRetained.setOption(option);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.entanls {
  padding: 20px;

  .echart-title {
    color: #555;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: bold;
  }

  .box-card {
    margin-top: 20px;

    .echart {
      width: 100%;
      height: 400px;
    }
  }

  .reason {
    margin-right: 10px;
  }

  .retained {
    margin-left: 10px;

    .content {
      padding: 0 10px;

      .table-box {
        height: 351px;
      }
    }
  }

  .tool {
    padding: 0 10px;
  }
}
</style>