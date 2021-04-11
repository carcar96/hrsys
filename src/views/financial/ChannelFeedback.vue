<template>
  <div id="channelfb" class="channelfb">
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
      <el-form-item label="公司名称" prop="company">
        <el-input
          size="medium"
          placeholder="请输入公司名称"
          v-model="searchForm.company"
        ></el-input>
      </el-form-item>
      <el-form-item label="渠道名称" prop="channel">
        <el-input
          size="medium"
          placeholder="请输入渠道名称"
          v-model="searchForm.channel"
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
      <el-table-column prop="source" label="渠道名称/企业名称" align="center">
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
          <span>{{ scope.row.company[item.id].total || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctotal" label="合计" sortable align="center">
        <template #default="scope">
          <span>{{ computedCompany(scope.row.company) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>企业占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-compay"></div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>渠道占比</span>
            </div>
          </template>
          <div class="echart" id="echart-pie-channel"></div>
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
        company: "",
        channel: "",
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
            1: { total: 0 },
            2: { total: 1212.15 },
            3: { total: 1312 },
            4: { total: 0 },
            5: { total: 1512.52 },
            6: { total: 1512 },
            7: { total: 2512 },
            8: { total: 512.89 },
          },
        },
        {
          source: "宏德",
          company: {
            1: { total: 2112 },
            2: { total: 0 },
            3: { total: 2132 },
            4: { total: 2142.25 },
            5: { total: 252 },
            6: { total: 0 },
            7: { total: 2152.62 },
            8: { total: 4152 },
          },
        },
        {
          source: "佳信",
          company: {
            1: { total: 3113 },
            2: { total: 0 },
            3: { total: 0 },
            4: { total: 3443 },
            5: { total: 12153.26 },
            6: { total: 3153.44 },
            7: { total: 4153 },
            8: { total: 38453 },
          },
        },
        {
          source: "李四",
          company: {
            1: { total: 5214 },
            2: { total: 2224 },
            3: { total: 1234 },
            4: { total: 244.22 },
            5: { total: 56254 },
            6: { total: 32254 },
            7: { total: 52254 },
            8: { total: 3254.99 },
          },
        },
      ],
      chartPie: {},
      companyData: [
        { value: 45, name: "华星光电" },
        { value: 30, name: "京东方" },
        { value: 25, name: "富士康" },
      ],
      channelData: [
        { value: 35, name: "大众行" },
        { value: 40, name: "纵邦" },
        { value: 25, name: "汇睿" },
      ],
    };
  },
  mounted() {
    this.initChartPie("echart-pie-compay", {
      name: "企业",
      data: this.companyData,
      labelUnit: "%",
    });
    this.initChartPie("echart-pie-channel", {
      name: "渠道",
      data: this.channelData,
      labelUnit: "%",
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
    computedCompany(company) {
      let values = [];
      for (let key in company) {
        values.push(Number(company[key].total));
      }

      let total = 0;
      if (!values.every((value) => isNaN(value))) {
        total = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        total = total.toFixed(2);
      } else {
        total = "N/A";
      }

      return total;
    },
    channelSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }

        let values = [];
        if (column.property == "company") {
          values = data.map((item) =>
            Number(item[column.property][column.columnKey].total)
          );
        } else if (column.property == "ctotal") {
          values = data.map((item) => this.computedCompany(item.company));
        }
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
.channelfb {
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