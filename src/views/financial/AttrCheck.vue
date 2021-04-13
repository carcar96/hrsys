<template>
  <div id="attrcheck" class="attrcheck">
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
      <el-form-item label="收入项目" prop="income_project">
        <el-input
          size="medium"
          placeholder="请输入项目名称"
          v-model="searchForm.income_project"
        ></el-input>
      </el-form-item>
      <el-form-item label="人员归属" prop="ownership">
        <el-input
          size="medium"
          placeholder="请输入姓名"
          v-model="searchForm.ownership"
        ></el-input>
      </el-form-item>
      <el-form-item label="盟友名称" prop="ally">
        <el-input
          size="medium"
          placeholder="请输入盟友名称"
          v-model="searchForm.ally"
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
    <el-table
      :data="tableData"
      border
      show-summary
      size="medium"
      :header-cell-style="{ backgroundColor: '#F7F7F7' }"
      :cell-style="setCellColor"
      :summary-method="getSummaries"
      @sort-change="sortChange"
      style="width: 1245px"
    >
      <el-table-column label="序号" type="index" width="54" align="center">
      </el-table-column>
      <el-table-column
        prop="company"
        label="在职企业"
        width="200"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        width="120"
        label="姓名"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="contact"
        width="120"
        label="联系方式"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="entry_date"
        width="120"
        label="入职日期"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="leave_date"
        width="120"
        label="离职日期"
        sortable
        align="center"
      >
        <template #default="scope">
          <span>{{ scope.row.leave_date || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ally"
        width="150"
        label="对接盟友"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="refund"
        width="120"
        label="返费金额"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="amount"
        width="120"
        label="支出金额"
        sortable
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="difference"
        width="120"
        label="差额利润"
        sortable
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>营收企业占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-income"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>人员归属占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-ownership"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>对接盟友占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-ally"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>利润差额占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-difference"></div>
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
        income_project: "",
        ownership: "",
        ally: "",
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
      tableData: [
        {
          id: "1",
          company: "凡谷综合",
          name: "徐冲",
          contact: "18022429894",
          entry_date: "2020/8/5",
          leave_date: "",
          ownership: "刘章豪",
          ally: "中京",
          refund: "13077",
          amount: "500",
          difference: "800",
        },
        {
          id: "2",
          company: "凡谷综合",
          name: "徐冲",
          contact: "18022429894",
          entry_date: "2020/8/5",
          leave_date: "",
          ownership: "刘章豪",
          ally: "中京",
          refund: "13077",
          amount: "500",
          difference: "800",
        },
        {
          id: "3",
          company: "凡谷综合",
          name: "徐冲",
          contact: "18022429894",
          entry_date: "2020/8/5",
          leave_date: "2020/12/15",
          ownership: "刘章豪",
          ally: "中京",
          refund: "13077",
          amount: "500",
          difference: "800",
        },
      ],
      chartPie: {},
      incomeData: [
        { value: 45, name: "华星光电" },
        { value: 30, name: "京东方" },
        { value: 25, name: "富士康" },
      ],
      ownershipData: [
        { value: 25, name: "张伟" },
        { value: 47, name: "李凯" },
        { value: 28, name: "李四" },
      ],
      allyData: [
        { value: 35, name: "大众行" },
        { value: 40, name: "纵邦" },
        { value: 25, name: "汇睿" },
      ],
      differenceData: [
        { value: 1048, name: "大众" },
        { value: 835, name: "百得" },
        { value: 680, name: "中法" },
      ],
    };
  },
  mounted() {
    this.initChartPie("echart-pie-income", {
      name: "营收企业",
      data: this.incomeData,
      labelUnit: "%",
    });
    this.initChartPie("echart-pie-ownership", {
      name: "人员归属",
      data: this.ownershipData,
      labelUnit: "%",
    });
    this.initChartPie("echart-pie-ally", {
      name: "对接盟友",
      data: this.allyData,
      labelUnit: "%",
    });
    this.initChartPie("echart-pie-difference", {
      name: "利润差额",
      data: this.differenceData,
      labelUnit: "元",
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
                formatter: "{b} {c}" + pData.labelUnit,
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        let prop = column.property;
        if (
          ["refund", "amount", "difference"].findIndex(
            (item) => item === prop
          ) > -1
        ) {
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
.attrcheck {
  padding: 0 20px;

  .box-card {
    margin-top: 20px;
  }

  .echart {
    width: 100%;
    height: 360px;
  }
}
</style>