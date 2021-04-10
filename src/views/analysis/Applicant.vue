<template>
  <div id="applicant" class="applicant">
    <el-form
      :inline="true"
      :model="searchForm"
      :rules="searchRule"
      :hide-required-asterisk="true"
      ref="searchForm"
      size="medium"
    >
      <ul>
        <li>
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
          <el-form-item label="对接员工" prop="dock_staff">
            <el-select
              v-model="searchForm.dock_staff"
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
          <el-form-item label="对接渠道" prop="dock_channel">
            <el-select
              v-model="searchForm.dock_channel"
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
          <el-form-item label="对接盟友" prop="dock_ally">
            <el-select
              v-model="searchForm.dock_ally"
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
        </li>
        <li>
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
          <el-form-item prop="datesegment">
            <el-radio-group
              v-model="searchForm.datesegment"
              @change="dateControlChange"
            >
              <el-radio-button label="0">日</el-radio-button>
              <el-radio-button label="1">周</el-radio-button>
              <el-radio-button label="2">月</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSearchForm('searchForm')"
              >搜索</el-button
            >
            <el-button type="warning" @click="resetSearchForm('searchForm')"
              >重置</el-button
            >
          </el-form-item>
        </li>
      </ul>
    </el-form>
    <div class="echart" id="echart-leave-num"></div>
    <div class="echart" id="echart-leave-ent"></div>
    <div class="echart" id="echart-dock-staff"></div>
    <div class="echart" id="echart-dock-channel"></div>
    <div class="echart" id="echart-dock-ally"></div>
    <div class="echart" id="echart-leave-reason"></div>
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
      searchForm: {
        date: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(),
        ],
        leave_enterprise: "0",
        dock_staff: "0",
        dock_channel: "0",
        dock_ally: "0",
        datesegment: "0",
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
      leaveNumChart: null,
      leaveEntChart: null,
      dockStaffChart: null,
      dockChannelChart: null,
      dockAllyChart: null,
      leaveNumData: [
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
          y: [21, 12, 13, 21, 32, 42, 21, 12, 32, 22],
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
          y: [121, 112, 113, 121, 232, 121, 132, 152],
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
          y: [421, 412, 443, 421, 432, 442, 421, 412, 443, 421, 432, 412],
        },
      ],
      leaveEntData: {
        x: [
          "凡谷",
          "美的",
          "格力",
          "天马",
          "友德",
          "富士康",
          "联想",
          "TCL",
          "华工",
          "OPPO",
          "小熊",
          "苏泊尔",
        ],
        y: [421, 412, 443, 421, 432, 442, 421, 412, 443, 421, 432, 412],
      },
      leaveReasonData: {
        x: ["薪资低", "环境差", "压力大", "个人原因", "伙食差", "拖欠工资"],
        y: [34, 3, 12, 20, 14, 17],
      },
    };
  },
  mounted() {
    this.updateLeaveNumData();
    this.initChartBar("echart-leave-ent", {
      title: "离职企业",
      x: this.leaveEntData.x,
      y: this.leaveEntData.y,
    });
    this.initChartBar("echart-dock-staff", {
      title: "离职对接员工",
      x: this.leaveEntData.x,
      y: this.leaveEntData.y,
    });
    this.initChartBar("echart-dock-channel", {
      title: "离职对接渠道",
      x: this.leaveEntData.x,
      y: this.leaveEntData.y,
    });
    this.initChartBar("echart-dock-ally", {
      title: "离职对接盟友",
      x: this.leaveEntData.x,
      y: this.leaveEntData.y,
    });
    this.initChartBar("echart-leave-reason", {
      title: "离职原因",
      x: this.leaveReasonData.x,
      y: this.leaveReasonData.y,
    });
  },
  watch: {
    "searchForm.datesegment"(newVal) {
      this.updateLeaveNumData();
    },
  },
  methods: {
    dateControlChange(val) {},
    rtypeControlChange(val) {},
    submitSearchForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.searchForm);
          console.log(
            this.$moment(this.searchForm.date[0]).format("YYYY-MM-DD"),
            this.$moment(this.searchForm.date[1]).format("YYYY-MM-DD")
          );
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();
    },
    updateLeaveNumData() {
      let dIdx = Number(this.searchForm.datesegment);
      this.initChartLeaveNum(
        this.leaveNumData[dIdx].x,
        this.leaveNumData[dIdx].y
      );
    },
    initChartLeaveNum(xData, yData) {
      if (!this.leaveNumChart) {
        let getchart = this.$echarts.init(
          document.getElementById("echart-leave-num")
        );

        var option = {
          title: {
            text: "离职人数",
          },
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

        this.leaveNumChart = getchart;
        this.$utils.addStoreEchart(getchart);
      } else {
        var option = this.leaveNumChart.getOption();
        // 先清空
        option.xAxis[0].data = [];
        option.series[0].data = [];
        this.leaveNumChart.setOption(option);
        // 再设置
        option.xAxis[0].data = xData;
        option.series[0].data = yData;
        option.dataZoom[0].start = 100;
        option.dataZoom[0].end = 100;
        this.leaveNumChart.setOption(option);
      }
    },
    initChartBar(domId, echartData) {
      var option = {
        // //dataZoom-inside 内置型数据区域缩放组件 所谓内置 1平移：在坐标系中滑动拖拽进行数据区域平移。2缩放：PC端：鼠标在坐标系范围内滚轮滚动（MAC触控板类同;移动端：在移动端触屏上，支持两指滑动缩放。
        // dataZoom: [
        //   {
        //     type: "inside", //1平移 缩放
        //     throttle: "50", //设置触发视图刷新的频率。单位为毫秒（ms）。
        //     minValueSpan: 10, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
        //     start: 100, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
        //     end: 100, //数据窗口范围的结束百分比。范围是：0 ~ 100。
        //     zoomLock: true, //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
        //   },
        // ],
        title: {
          text: echartData.title,
        },
        // 提示框组件
        tooltip: {
          trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          // backgroundColor: "#377CFF", //提示框浮层的背景颜色。
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

      this.$utils.addStoreEchart(getchart);
    },
  },
};
</script>

<style lang="scss" scoped>
.applicant {
  padding: 0 20px;

  .echart {
    width: 100%;
    height: 400px;
  }
}
</style>