<template>
  <div id="staff" class="staff">
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
          <el-form-item label="招聘部门" prop="department">
            <el-select
              v-model="searchForm.department"
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
          <el-form-item label="小组" prop="group">
            <el-select
              v-model="searchForm.group"
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
          <el-form-item label="成员" prop="member">
            <el-select
              v-model="searchForm.member"
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
          <el-form-item label="渠道部" prop="channel">
            <el-select
              v-model="searchForm.channel"
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
          <el-form-item label="安置部" prop="place">
            <el-select
              v-model="searchForm.place"
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
        <li>
          <el-form-item prop="recruittype">
            <el-radio-group
              v-model="searchForm.recruittype"
              @change="rtypeControlChange"
            >
              <el-radio label="0">意向人数</el-radio>
              <el-radio label="1">面到人数</el-radio>
              <el-radio label="2">面过人数</el-radio>
              <el-radio label="3">入职人数</el-radio>
              <el-radio label="4">流失人数</el-radio>
              <el-radio label="5">在职人数</el-radio>
            </el-radio-group>
          </el-form-item>
        </li>
      </ul>
    </el-form>
    <div class="echart" id="echart-line"></div>
    <el-table
      :data="recruitTableData"
      style="width: 100%"
      border
      show-summary
      :summary-method="recruitSummaries"
      size="medium"
      :header-cell-style="{ backgroundColor: '#F7F7F7' }"
      :cell-style="setCellColor"
      @sort-change="sortChange"
    >
      <el-table-column
        prop="date"
        label="时间"
        width="120"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="department"
        label="招聘部门"
        width="130"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column prop="group" label="小组" sortable align="center">
      </el-table-column>
      <el-table-column
        prop="staff"
        width="80"
        label="成员"
        sortable
        align="center"
      ></el-table-column>
      <el-table-column
        prop="wx"
        width="90"
        label="微信数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="intention"
        width="110"
        label="意向人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="arrive"
        width="110"
        label="面到人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="pass"
        width="110"
        label="面过人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="entry"
        width="110"
        label="入职人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="leave"
        width="110"
        label="流失人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="onjob"
        width="110"
        label="在职人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="assess"
        width="110"
        label="考核目标"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="target_index"
        width="110"
        label="目标指数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="percent"
        width="150"
        label="目标达成百分比"
        sortable
        align="center"
      >
        <template #default="scope">
          <span>{{ scope.row.percent }}%</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="recruitTableData"
      border
      show-summary
      size="medium"
      :header-cell-style="{ backgroundColor: '#F7F7F7' }"
      :cell-style="setCellColor"
      @sort-change="sortChange"
      :style="'margin-top:20px;margin-bottom:20px;width:1121px'"
    >
      <el-table-column
        prop="date"
        label="时间"
        width="120"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column prop="department" label="渠道部" sortable align="center">
      </el-table-column>
      <el-table-column
        prop="arrive"
        width="150"
        label="面到人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="pass"
        width="150"
        label="面过人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="entry"
        width="150"
        label="入职人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="leave"
        width="150"
        label="流失人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="onjob"
        width="150"
        label="在职人数"
        sortable
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-table
      :data="recruitTableData"
      border
      show-summary
      size="medium"
      style="width: 1121px"
      :header-cell-style="{ backgroundColor: '#F7F7F7' }"
      :cell-style="setCellColor"
      @sort-change="sortChange"
    >
      <el-table-column
        prop="date"
        label="时间"
        width="120"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column prop="department" label="安置部" sortable align="center">
      </el-table-column>
      <el-table-column
        prop="arrive"
        width="150"
        label="面到人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="pass"
        width="150"
        label="面过人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="entry"
        width="150"
        label="入职人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="leave"
        width="150"
        label="流失人数"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="onjob"
        width="150"
        label="在职人数"
        sortable
        align="center"
      >
      </el-table-column>
    </el-table>
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
        department: "0",
        group: "0",
        member: "0",
        channel: "0",
        place: "0",
        datesegment: "0",
        recruittype: "0",
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
      chartLine: null,
      recruitTableData: [
        {
          id: "1",
          date: "12-01",
          department: "华中招聘部",
          group: "江夏招聘1组",
          staff: "张伟",
          wx: "33",
          intention: "88",
          arrive: "73",
          pass: "53",
          entry: "50",
          leave: "10",
          onjob: "40",
          assess: "意面",
          target_index: "1000",
          percent: "90",
        },
        {
          id: "1",
          date: "12-01",
          department: "华中招聘部",
          group: "江夏招聘2组",
          staff: "张伟",
          wx: "33",
          intention: "88",
          arrive: "73",
          pass: "53",
          entry: "50",
          leave: "10",
          onjob: "40",
          assess: "到厂",
          target_index: "1000",
          percent: "85",
        },
      ],
    };
  },
  mounted() {
    this.updateLineData();
  },
  watch: {
    "searchForm.datesegment"(newVal) {
      this.updateLineData();
    },
    "searchForm.recruittype"(newVal) {
      this.updateLineData();
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
    updateLineData() {
      let dIdx = Number(this.searchForm.datesegment);
      let rIdx = Number(this.searchForm.recruittype);
      this.initChartLine(this.lineData[dIdx].x, this.lineData[dIdx].y[rIdx]);
    },
    initChartLine(xData, yData) {
      if (!this.chartLine) {
        let getchart = this.$echarts.init(
          document.getElementById("echart-line")
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
          // 节流
          // var timer = null;
          // return (() => {
          //   if (!timer) {
          //     timer = setTimeout(() => {
          getchart.resize();
          //       timer = null;
          //     }, 100);
          //   }
          // })();
        });

        this.chartLine = getchart;
        this.$utils.addStoreEchart(getchart);
      } else {
        var option = this.chartLine.getOption();
        // 先清空
        option.xAxis[0].data = [];
        option.series[0].data = [];
        this.chartLine.setOption(option);
        // 再设置
        option.xAxis[0].data = xData;
        option.series[0].data = yData;
        option.dataZoom[0].start = 100;
        option.dataZoom[0].end = 100;
        this.chartLine.setOption(option);
      }
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    sortChange(data) {
      console.log(data);
    },
    recruitSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (column.property == "percent") {
            sums[index] /= values.length;
            sums[index] += "%";
          }
        } else {
          sums[index] = ""; // N/A
        }
      });
      return sums;
    },
  },
};
</script>

<style lang="scss" scoped>
.staff {
  padding: 0 20px;

  .echart {
    width: 100%;
    height: 400px;
  }
}
</style>