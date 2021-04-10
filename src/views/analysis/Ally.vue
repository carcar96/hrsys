<template>
  <div id="ally" class="ally">
    <el-form
      :inline="true"
      :model="searchForm"
      :rules="searchRule"
      :hide-required-asterisk="true"
      ref="searchForm"
      size="medium"
    >
      <el-form-item label="企业名称" prop="company">
        <el-select
          v-model="searchForm.company"
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
      <el-form-item label="盟友名称" prop="ally">
        <el-select
          v-model="searchForm.ally"
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
          style="width: 360px"
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
    <el-table
      size="medium"
      border
      show-summary
      :data="channelList"
      :summary-method="channelSummaries"
      :header-cell-style="{ backgroundColor: '#F7F7F7' }"
      :cell-style="setCellColor"
      :default-sort="{ prop: 'percent', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column prop="source" label="盟友名称/企业名称" align="center">
      </el-table-column>
      <el-table-column
        prop="company"
        :column-key="item.id"
        :label="item.label"
        sortable
        align="center"
        v-for="(item, i) in companyList"
        :key="i"
      >
        <template #default="scope">
          <span
            >{{ scope.row.company[item.id].retained }}/{{
              scope.row.company[item.id].total
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="ctotal" label="企业合计" sortable align="center">
        <template #default="scope">
          <span>{{ computedTotalCompany(scope.row.company) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="percent" label="留存比" sortable align="center">
        <template #default="scope">
          <span>{{ computedPercent(scope.row.company) }}%</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" :xl="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>入职盟友占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-entry"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12" :xl="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>离职盟友占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-leave"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12" :xl="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>留存率排行</span>
            </div>
          </template>
          <el-table
            :data="retainedTableData"
            border
            size="medium"
            :header-cell-style="{ backgroundColor: '#F7F7F7' }"
            :cell-style="setCellColor"
            :default-sort="{ prop: 'percent', order: 'descending' }"
            @sort-change="sortChange"
            height="360px"
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
              width="75"
              label="入职"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="onjob"
              width="75"
              label="在职"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="leave"
              width="75"
              label="离职"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="percent"
              width="90"
              label="留存比"
              sortable
              align="center"
            >
              <template #default="scope">
                <span>{{ scope.row.percent }}%</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
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
        company: "0",
        ally: "0",
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
      companyList: [
        {
          label: "友德",
          id: "1",
        },
        {
          label: "华工",
          id: "2",
        },
        {
          label: "联想",
          id: "3",
        },
        {
          label: "天马",
          id: "4",
        },
        {
          label: "凡谷",
          id: "5",
        },
        {
          label: "东方骏驰",
          id: "6",
        },
        {
          label: "富晶",
          id: "7",
        },
        {
          label: "德威斯",
          id: "8",
        },
      ],
      channelList: [
        {
          source: "张三",
          company: {
            1: { total: 11, retained: 9 },
            2: { total: 21, retained: 13 },
            3: { total: 31, retained: 19 },
            4: { total: 41, retained: 35 },
            5: { total: 51, retained: 44 },
            6: { total: 51, retained: 44 },
            7: { total: 51, retained: 44 },
            8: { total: 51, retained: 44 },
          },
          percent: 77,
        },
        {
          source: "宏德",
          company: {
            1: { total: 12, retained: 9 },
            2: { total: 22, retained: 15 },
            3: { total: 32, retained: 16 },
            4: { total: 42, retained: 35 },
            5: { total: 52, retained: 44 },
            6: { total: 52, retained: 44 },
            7: { total: 52, retained: 44 },
            8: { total: 52, retained: 44 },
          },
          percent: 74,
        },
        {
          source: "佳信",
          company: {
            1: { total: 13, retained: 12 },
            2: { total: 23, retained: 21 },
            3: { total: 33, retained: 29 },
            4: { total: 43, retained: 38 },
            5: { total: 53, retained: 49 },
            6: { total: 53, retained: 49 },
            7: { total: 53, retained: 49 },
            8: { total: 53, retained: 49 },
          },
          percent: 90,
        },
        {
          source: "李四",
          company: {
            1: { total: 14, retained: 11 },
            2: { total: 24, retained: 13 },
            3: { total: 34, retained: 16 },
            4: { total: 44, retained: 35 },
            5: { total: 54, retained: 44 },
            6: { total: 54, retained: 44 },
            7: { total: 54, retained: 44 },
            8: { total: 54, retained: 44 },
          },
          percent: 70,
        },
      ],
      chartPie: {},
      entryData: [
        { value: 1048, name: "大众" },
        { value: 735, name: "百得" },
        { value: 580, name: "中法" },
      ],
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
    };
  },
  mounted() {
    this.initChartPie("echart-pie-entry", {
      name: "入职盟友",
      data: this.entryData,
    });
    this.initChartPie("echart-pie-leave", {
      name: "离职盟友",
      data: this.entryData,
    });
  },
  methods: {
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
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    sortChange(data) {
      console.log(data);
    },
    computedTotalCompany(company) {
      let data = this.computedCompany(company);
      return data.retained + "/" + data.total;
    },
    computedPercent(company) {
      let data = this.computedCompany(company);
      return ((data.retained / data.total) * 100).toFixed(2);
    },
    computedCompany(company) {
      let totalValues = [];
      let retainedValues = [];
      for (let key in company) {
        totalValues.push(Number(company[key].total));
        retainedValues.push(Number(company[key].retained));
      }

      let total = 0;
      if (!totalValues.every((value) => isNaN(value))) {
        total = totalValues.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      } else {
        total = "N/A";
      }

      let retained = 0;
      if (!retainedValues.every((value) => isNaN(value))) {
        retained = retainedValues.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      } else {
        retained = "N/A";
      }

      return { retained, total };
    },
    channelSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "盟友总计";
          return;
        }
        if (column.property == "company") {
          const totalValues = data.map((item) =>
            Number(item[column.property][column.columnKey].total)
          );
          const retainedValues = data.map((item) =>
            Number(item[column.property][column.columnKey].retained)
          );

          let total = 0;
          if (!totalValues.every((value) => isNaN(value))) {
            total = totalValues.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            total = "N/A";
          }

          let retained = 0;
          if (!retainedValues.every((value) => isNaN(value))) {
            retained = retainedValues.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            retained = "N/A";
          }

          sums[index] = retained + "/" + total;
        }

        if (column.property == "ctotal" || column.property == "percent") {
          const totalValues = data.map(
            (item) => this.computedCompany(item.company).total
          );
          const retainedValues = data.map(
            (item) => this.computedCompany(item.company).retained
          );

          let total = 0;
          if (!totalValues.every((value) => isNaN(value))) {
            total = totalValues.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            total = "N/A";
          }

          let retained = 0;
          if (!retainedValues.every((value) => isNaN(value))) {
            retained = retainedValues.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            retained = "N/A";
          }

          sums[index] =
            column.property == "ctotal"
              ? retained + "/" + total
              : ((retained / total) * 100).toFixed(2) + "%";
        }
      });
      return sums;
    },
    initChartPie(domId, pData) {
      if (!this.chartPie[domId]) {
        let getchart = this.$echarts.init(document.getElementById(domId));

        var option = {
          // 提示框组件
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              name: pData.name,
              type: "pie",
              radius: "50%",
              data: pData.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              label: {
                formatter: "{a} {c}",
              },
            },
          ],
        };
        getchart.setOption(option);

        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          getchart.resize();
        });

        this.chartPie[domId] = getchart;
        this.$utils.addStoreEchart(getchart);
      } else {
        var option = this.chartPie[domId].getOption();
        // 先清空
        option.series[0].data = [];
        this.chartPie[domId].setOption(option);
        // 再设置
        option.series[0].data = pData.data;
        this.chartPie[domId].setOption(option);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ally {
  padding: 0 20px;
  .box-card {
    margin-top: 30px;
  }
  .el-space {
    margin-top: 20px;
  }

  .echart {
    width: 100%;
    height: 360px;
  }
}
</style>