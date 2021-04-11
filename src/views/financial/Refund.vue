<template>
  <div id="refund" class="refund">
    <el-form
      :inline="true"
      :model="searchForm"
      :hide-required-asterisk="true"
      ref="searchForm"
      size="medium"
    >
      <el-form-item label="求职者身份证号" prop="idcard">
        <el-input
          size="medium"
          placeholder="请输入身份证号"
          v-model="searchForm.idcard"
        ></el-input>
      </el-form-item>
      <el-form-item label="输送项目" prop="project">
        <el-select v-model="searchForm.project" placeholder="请选择">
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
      <el-form-item label="所属渠道" prop="channel">
        <el-select v-model="searchForm.channel" placeholder="请选择">
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
      :data="tableData"
      :summary-method="getSummaries"
      :header-cell-style="{ backgroundColor: '#F7F7F7' }"
      :cell-style="setCellColor"
      :default-sort="{ prop: 'percent', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="54" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="entry_date" label="入职时间" align="center">
      </el-table-column>
      <el-table-column prop="leave_date" label="离职时间" align="center">
        <template #default="scope">
          <span>{{ scope.row.leave_date || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="idcard" label="身份证号" align="center">
        <template #default="scope">
          <span>{{ scope.row.idcard || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="在职/离职" align="center">
        <template #default="scope">
          <span>{{ scope.row.status == 1 ? "在职" : "离职" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subject" label="费用科目" align="center">
        <template #default="scope">
          <span>{{ scope.row.subject || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channel" label="所属渠道" align="center">
      </el-table-column>
      <el-table-column prop="project" label="输送项目" align="center">
      </el-table-column>
      <el-table-column prop="standard" label="费用标准" align="center">
        <template #default="scope">
          <span>{{ scope.row.standard }}/h</span>
        </template>
      </el-table-column>
      <el-table-column prop="hours" label="工时" align="center">
      </el-table-column>
      <el-table-column prop="amount" label="费用金额" align="center">
        <template #default="scope">
          <span>{{ (scope.row.standard * scope.row.hours).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" align="center">
        <template #default="scope">
          <span>{{ scope.row.note || "-" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>所属渠道占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-channel"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>输送项目占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-project"></div>
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
        idcard: "",
        project: "0",
        channel: "0",
      },
      tableData: [
        {
          name: "左占义",
          entry_date: "2020-05-20",
          leave_date: "",
          idcard: "4444444444444",
          status: "1",
          subject: "",
          channel: "轩腾",
          project: "友徳",
          standard: "3.2",
          hours: "68",
          note: "",
        },
        {
          name: "左占义",
          entry_date: "2020-05-20",
          leave_date: "2020-09-08",
          idcard: "4444444444444",
          status: "2",
          subject: "",
          channel: "轩腾",
          project: "友徳",
          standard: "3.5",
          hours: "68",
          note: "",
        },
        {
          name: "左占义",
          entry_date: "2020-05-20",
          leave_date: "",
          idcard: "4444444444444",
          status: "1",
          subject: "",
          channel: "轩腾",
          project: "友徳",
          standard: "4",
          hours: "62",
          note: "",
        },
        {
          name: "左占义",
          entry_date: "2020-05-20",
          leave_date: "",
          idcard: "4444444444444",
          status: "1",
          subject: "",
          channel: "轩腾",
          project: "友徳",
          standard: "3",
          hours: "68",
          note: "备注",
        },
      ],
      chartPie: {},
      channelData: [
        { value: 35, name: "大众行" },
        { value: 40, name: "纵邦" },
        { value: 25, name: "汇睿" },
      ],
      projectData: [
        { value: 1245, name: "华星光电" },
        { value: 430, name: "京东方" },
        { value: 625, name: "富士康" },
      ],
    };
  },
  mounted() {
    this.initChartPie("echart-pie-channel", {
      name: "所属渠道",
      data: this.channelData,
      labelUnit: "%",
    });
    this.initChartPie("echart-pie-project", {
      name: "输送项目",
      data: this.projectData,
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }

        if (column.property == "amount") {
          const values = data.map((item) => Number(item.standard * item.hours));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + value;
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
  },
};
</script>

<style lang="scss" scoped>
.refund {
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