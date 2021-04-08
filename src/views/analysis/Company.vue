<template>
  <div id="conals" class="coanls">
    <div class="cards">
      <el-card class="finance-card i-card">
        <template #header>
          <div class="card-header">
            <el-button
              size="small"
              class="button"
              :class="financeIdx == 1 ? 'actived' : ''"
              type="text"
              @click="financeIdx = 1"
              >收入数据</el-button
            >
            <el-button
              size="small"
              class="button"
              :class="financeIdx == 2 ? 'actived' : ''"
              type="text"
              @click="financeIdx = 2"
              >支出数据</el-button
            >
          </div>
        </template>
        <div class="card-content">
          <ul>
            <li class="t-items">
              <div class="last-month item">
                <p class="num">
                  {{
                    financeIdx == 1 ? revenue.lastMonth : expenditure.lastMonth
                  }}
                </p>
                <p>{{ financeIdx == 1 ? "上月收入" : "上月支出" }}</p>
              </div>
              <div class="cur-month item">
                <p class="num">
                  {{
                    financeIdx == 1 ? revenue.curMonth : expenditure.curMonth
                  }}
                </p>
                <p>{{ financeIdx == 1 ? "本月收入" : "本月支出" }}</p>
              </div>
            </li>
            <li class="b-items">
              <div class="inner">
                <div class="last-quarter item">
                  <p class="num">
                    {{
                      financeIdx == 1
                        ? revenue.lastQuarter
                        : expenditure.lastQuarter
                    }}
                  </p>
                  <p>{{ financeIdx == 1 ? "上季度收入" : "上季度支出" }}</p>
                </div>
                <div class="cur-quarter item">
                  <p class="num">
                    {{
                      financeIdx == 1
                        ? revenue.curQuarter
                        : expenditure.curQuarter
                    }}
                  </p>
                  <p>{{ financeIdx == 1 ? "本季度收入" : "本季度支出" }}</p>
                </div>
              </div>
              <div class="inner">
                <div class="last-year item">
                  <p class="num">
                    {{
                      financeIdx == 1 ? revenue.lastYear : expenditure.lastYear
                    }}
                  </p>
                  <p>{{ financeIdx == 1 ? "去年收入" : "去年支出" }}</p>
                </div>
                <div class="cur-year item">
                  <p class="num">
                    {{
                      financeIdx == 1 ? revenue.curYear : expenditure.curYear
                    }}
                  </p>
                  <p>{{ financeIdx == 1 ? "本年收入" : "本年支出" }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-card>
      <el-card class="recruit-card i-card">
        <template #header>
          <div class="card-header">
            <span>招聘数据</span>
            <el-radio-group
              v-model="recruitIdx"
              @change="recruitChange"
              size="small"
            >
              <el-radio-button label="1">月</el-radio-button>
              <el-radio-button label="2">季</el-radio-button>
              <el-radio-button label="3">年</el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <div class="card-content">
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.arrive }}</span>
              <span v-show="recruitIdx == 2">{{ recruit.quarter.arrive }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.arrive }}</span>
            </p>
            <p>到厂人数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{
                recruit.month.interview
              }}</span>
              <span v-show="recruitIdx == 2">{{
                recruit.quarter.interview
              }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.interview }}</span>
            </p>
            <p>面试人数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.pass }}</span>
              <span v-show="recruitIdx == 2">{{ recruit.quarter.pass }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.pass }}</span>
            </p>
            <p>面过人数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.entry }}</span>
              <span v-show="recruitIdx == 2">{{ recruit.quarter.entry }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.entry }}</span>
            </p>
            <p>入职人数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.onjob }}</span>
              <span v-show="recruitIdx == 2">{{ recruit.quarter.onjob }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.onjob }}</span>
            </p>
            <p>在职人数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.leave }}</span>
              <span v-show="recruitIdx == 2">{{ recruit.quarter.leave }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.leave }}</span>
            </p>
            <p>离职人数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{
                recruit.month.addsource
              }}</span>
              <span v-show="recruitIdx == 2">{{
                recruit.quarter.addsource
              }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.addsource }}</span>
            </p>
            <p>资源新增条数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.sources }}</span>
              <span v-show="recruitIdx == 2">{{
                recruit.quarter.sources
              }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.sources }}</span>
            </p>
            <p>资源总条数</p>
          </div>
          <div class="item">
            <p class="num">
              <span v-show="recruitIdx == 1">{{ recruit.month.wx }}</span>
              <span v-show="recruitIdx == 2">{{ recruit.quarter.wx }}</span>
              <span v-show="recruitIdx == 3">{{ recruit.year.wx }}</span>
            </p>
            <p>微信数</p>
          </div>
        </div>
      </el-card>
    </div>
    <div class="echarts">
      <div class="finance chart-item">
        <div class="tool">
          <el-radio-group v-model="barIdx" @change="barChange" size="small">
            <el-radio-button :label="0">月</el-radio-button>
            <el-radio-button :label="1">季</el-radio-button>
            <el-radio-button :label="2">年</el-radio-button>
          </el-radio-group>
        </div>
        <div class="echart" id="echart-bar"></div>
      </div>
      <div class="recruit chart-item">
        <div class="tool">
          <el-radio-group v-model="lineIdx" @change="lineChange" size="small">
            <el-radio :label="0">意向人数</el-radio>
            <el-radio :label="1">面过人数</el-radio>
            <el-radio :label="2">入职人数</el-radio>
            <el-radio :label="3">离职人数</el-radio>
          </el-radio-group>
        </div>
        <div class="echart" id="echart-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      revenue: {
        lastMonth: 3955555,
        curMonth: 1955555,
        lastQuarter: 1955555,
        curQuarter: 1955555,
        lastYear: 1955555,
        curYear: 1955555,
      },
      expenditure: {
        lastMonth: 2955555,
        curMonth: 1955555,
        lastQuarter: 1955555,
        curQuarter: 1955555,
        lastYear: 1955555,
        curYear: 1955555,
      },
      recruit: {
        month: {
          arrive: 88,
          interview: 188,
          pass: 98,
          entry: 28,
          onjob: 8,
          leave: 128,
          addsource: 128,
          sources: 128,
          wx: 128,
        },
        quarter: {
          arrive: 188,
          interview: 1188,
          pass: 198,
          entry: 128,
          onjob: 18,
          leave: 1128,
          addsource: 1128,
          sources: 1128,
          wx: 1128,
        },
        year: {
          arrive: 288,
          interview: 2188,
          pass: 298,
          entry: 228,
          onjob: 28,
          leave: 2128,
          addsource: 2128,
          sources: 2128,
          wx: 2128,
        },
      },
      financeIdx: 1,
      recruitIdx: 1,
      barIdx: 0,
      financeData: [
        {
          x: [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
          ],
          y: [33, 30, 132, 80, 134, 55, 33, 30, 132, 80, 134, 55],
        },
        {
          x: [
            "2019.01~03",
            "2019.04~06",
            "2019.07~09",
            "2019.10~12",
            "2020.01~03",
            "2020.04~06",
            "2020.07~09",
            "2020.10~12",
            "2021.01~03",
          ],
          y: [33, 30, 132, 80, 134, 55, 33, 30, 132, 80, 134],
        },
        {
          x: ["2019", "2020", "2021"],
          y: [33, 30, 132],
        },
      ],
      lineIdx: 0,
      recruitData: [
        {
          x: [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
          ],
          y: [33, 30, 132, 80, 134, 55, 33, 30, 132, 80, 134, 55],
        },
        {
          x: [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
          ],
          y: [133, 130, 1132, 180, 1134, 155, 133, 130, 1132, 180, 1134, 155],
        },
        {
          x: [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
          ],
          y: [233, 330, 132, 80, 134, 55, 233, 330, 132, 80, 134, 55],
        },
        {
          x: [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
          ],
          y: [233, 430, 132, 80, 134, 255, 233, 430, 132, 80, 134, 255],
        },
      ],
    };
  },
  mounted() {
    this.updateBarData();
    this.updateLineData();
  },
  watch: {
    barIdx(newVal) {
      this.updateBarData();
    },
    lineIdx(newVal) {
      this.updateLineData();
    },
  },
  methods: {
    updateBarData() {
      let bIdx = Number(this.barIdx);
      this.initChartBar(this.financeData[bIdx].x, this.financeData[bIdx].y);
    },
    updateLineData() {
      let rIdx = Number(this.lineIdx);
      this.initChartLine(this.recruitData[rIdx].x, this.recruitData[rIdx].y);
    },
    recruitChange(val) {},
    initChartBar(xData, yData) {
      let getchart = this.$echarts.init(document.getElementById("echart-bar"));
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
          backgroundColor: "#377CFF", //提示框浮层的背景颜色。
          axisPointer: {
            //去掉移动的指示线
            type: "none",
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
          name: "营业收入",
        },
        series: [
          {
            type: "bar",
            data: yData,
          },
        ],
      };

      getchart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },
    initChartLine(xData, yData) {
      let getchart = this.$echarts.init(document.getElementById("echart-line"));
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
          backgroundColor: "#377CFF", //提示框浮层的背景颜色。
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
    },
    barChange(val) {
      console.log(val);
    },
    lineChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.coanls {
  .cards {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 20px;

    .i-card {
      margin-bottom: 20px;
      width: 47%;
      margin-right: 3%;
      min-width: 480px;
    }

    button {
      font-size: 14px;
    }

    .item {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;

      .num {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 2px;
      }

      & + .item {
        margin-left: 30px;
      }
    }

    .finance-card {
      .actived {
        color: red;
      }

      .card-content {
        .t-items {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .b-items {
          display: flex;
          align-items: center;
          justify-content: space-around;

          .inner {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .recruit-card {
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .card-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
  .echarts {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px;

    .chart-item {
      min-width: 480px;
      width: 47%;
      margin-right: 3%;
      margin-top: 20px;

      .echart {
        width: 100%;
        height: 400px;
      }
    }

    .finance {
      .tool {
        text-align: center;
      }
    }

    .recruit {
      .tool {
        text-align: center;
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
</style>