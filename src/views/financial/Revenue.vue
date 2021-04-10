<template>
  <div id="revenue" class="revenue">
    <el-form
      :inline="true"
      :model="searchForm"
      :rules="searchRule"
      :hide-required-asterisk="true"
      ref="searchForm"
      size="medium"
    >
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
      <el-form-item label="收入项目" prop="income">
        <el-input
          size="medium"
          placeholder="请输入项目名称"
          v-model="searchForm.income"
        ></el-input>
      </el-form-item>
      <el-form-item label="支出项目" prop="pay">
        <el-input
          size="medium"
          placeholder="请输入项目名称"
          v-model="searchForm.pay"
        ></el-input>
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
    <el-card class="finance-card">
      <div class="content">
        <div class="item">
          <p class="num">
            <span>{{ finance.income }}</span>
          </p>
          <p>收入</p>
        </div>
        <div class="item">
          <p class="num">
            <span>{{ finance.pay }}</span>
          </p>
          <p>支出</p>
        </div>
        <div class="item">
          <p class="num">
            <span>{{ finance.income - finance.pay }}</span>
          </p>
          <p>利润</p>
        </div>
      </div>
    </el-card>
    <div class="revenue-table">
      <h4 class="table-title">收入明细</h4>
      <el-table
        :data="financeTableData"
        border
        show-summary
        size="medium"
        :header-cell-style="{ backgroundColor: '#F7F7F7' }"
        :cell-style="setCellColor"
        :summary-method="revenueSummaries"
        @sort-change="sortChange"
      >
        <el-table-column
          prop="date"
          label="时间"
          width="100"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="project"
          label="收入项目"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="channel"
          width="110"
          label="对接渠道"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="turnover"
          width="110"
          label="营业额"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="wages"
          width="90"
          label="工资"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="returnfee"
          width="110"
          label="渠道返费"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="added_tax"
          width="100"
          label="增值税"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="other_tax"
          width="100"
          label="其他税"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="commercial_insurance"
          width="100"
          label="商业险"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="social_security"
          width="90"
          label="社保"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remain_amount"
          width="110"
          label="剩余金额"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="unit"
          width="120"
          label="单位/数目"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="account_arrival"
          width="110"
          label="到账情况"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="note"
          width="90"
          label="备注"
          sortable
          align="center"
        >
          <template #default="scope">
            <span>{{ scope.row.note || "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="other"
          width="90"
          label="其他"
          sortable
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pay-table">
      <h4 class="table-title">支出明细</h4>
      <el-table
        :data="payTableData"
        border
        show-summary
        size="medium"
        :header-cell-style="{ backgroundColor: '#F7F7F7' }"
        :cell-style="setCellColor"
        :summary-method="paySummaries"
        @sort-change="sortChange"
        style="width: 850px"
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
          prop="project"
          label="支出项目"
          width="150"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          width="120"
          label="金额"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="unit"
          width="200"
          label="单位/数目"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column prop="note" label="备注" sortable align="center">
          <template #default="scope">
            <span>{{ scope.row.note || "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="other_tax"
          width="120"
          label="其他税"
          sortable
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" :xl="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>收入项目占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-income"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12" :xl="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>收入渠道占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-channel"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12" :xl="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>支出项目占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-pay"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        date: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(),
        ],
        income: "",
        pay: "",
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
      finance: {
        income: 545660,
        pay: 34560,
      },
      financeTableData: [
        {
          id: "1",
          date: "2020.12.01",
          project: "凡谷综合",
          channel: "中京",
          turnover: "217950.54",
          wages: "163563",
          returnfee: "20527.47",
          added_tax: "13077",
          other_tax: "0",
          commercial_insurance: "1250",
          social_security: "0",
          remain_amount: "20783.07",
          unit: "0",
          account_arrival: "实到",
          note: "1",
          other: "到中京",
        },
        {
          id: "2",
          date: "2020.12.01",
          project: "凡谷综合",
          channel: "中京",
          turnover: "217950.54",
          wages: "163563",
          returnfee: "20527.47",
          added_tax: "13077",
          other_tax: "0",
          commercial_insurance: "1250",
          social_security: "0",
          remain_amount: "20783.07",
          unit: "0",
          account_arrival: "实到",
          note: "2",
          other: "到中京",
        },
        {
          id: "3",
          date: "2020.12.01",
          project: "华工正源",
          channel: "中京",
          turnover: "217950.54",
          wages: "163563",
          returnfee: "20527.47",
          added_tax: "13077",
          other_tax: "0",
          commercial_insurance: "1250",
          social_security: "0",
          remain_amount: "20783.07",
          unit: "0",
          account_arrival: "实到",
          note: "45735.27费用",
          other: "到中京",
        },
      ],
      payTableData: [
        {
          id: "1",
          date: "2020.12.01",
          project: "凡谷综合",
          amount: "217950.54",
          unit: "HR账号1个",
          note: "含押金1万",
          other_tax: "0",
        },
        {
          id: "2",
          date: "2020.12.01",
          project: "话费充值",
          amount: "17950.54",
          unit:
            "151516555充值200；151616112充值200；1151554554充值200；1515155151充值200",
          note: "充值5个手机号",
          other_tax: "0",
        },
        {
          id: "3",
          date: "2020.12.01",
          project: "公司聚餐",
          amount: "17950.54",
          unit: "海底捞聚餐",
          note: "",
          other_tax: "0",
        },
      ],
      chartPie: {},
      incomeData: [
        { value: 1048, name: "大众" },
        { value: 735, name: "百得" },
        { value: 580, name: "中法" },
      ],
    };
  },
  mounted() {
    this.initChartPie("echart-pie-income", {
      name: "收入项目",
      data: this.incomeData,
    });
    this.initChartPie("echart-pie-channel", {
      name: "收入渠道",
      data: this.incomeData,
    });
    this.initChartPie("echart-pie-pay", {
      name: "支出项目",
      data: this.incomeData,
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
                formatter: "{b} {c}元",
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
    revenueSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        let prop = column.property;
        if (
          [
            "date",
            "note",
            "project",
            "channel",
            "account_arrival",
            "other",
          ].findIndex((item) => item === prop) > -1
        ) {
          sums[index] = "";
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
        } else {
          sums[index] = ""; //N/A
        }
      });

      return sums;
    },
    paySummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        let prop = column.property;
        if (prop == "amount") {
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
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] = "N/A";
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
  },
};
</script>

<style lang="scss" scoped>
.revenue {
  padding: 0 20px;
  .finance-card {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 400px;
    font-size: 14px;

    .content {
      display: flex;
      justify-content: space-around;
      .item {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;

        .num {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 2px;
        }
      }
    }
  }
  .table-title {
    line-height: 40px;
  }
  .pay-table {
    margin-top: 10px;
  }
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