<template>
  <div id="rpcenter" class="rpcenter">
    <el-container>
      <el-header height="auto;">
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
          <el-form-item label="部门" prop="department">
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
          <el-form-item label="员工" prop="staff">
            <el-select
              v-model="searchForm.staff"
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
          <el-form-item label="数据" prop="dtype">
            <el-select
              v-model="searchForm.dtype"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option label="全部" value="0"> </el-option>
              <el-option
                v-for="item in dtypeOptions"
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
      </el-header>
      <el-main class="table-box">
        <el-container>
          <el-main>
            <el-table
              :data="tData"
              :span-method="objectSpanMethod"
              :header-cell-style="{ backgroundColor: '#F7F7F7' }"
              :cell-style="setCellColor"
              border
              style="width: 100%"
              height="100%"
            >
              <el-table-column prop="department" label="部门" align="center">
              </el-table-column>
              <el-table-column prop="group" label="小组" align="center">
              </el-table-column>
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="dtype" label="数据">
                <template #default="scope">
                  <span>{{ getTypeName(scope.row.dtype) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                :column-key="i.toString()"
                :label="item + '号'"
                v-for="(item, i) in dateList"
                :key="i"
              >
                <template #default="scope">
                  <span>{{ scope.row.num[Number(i)] }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="总计">
                <template #default="scope">
                  <span :style="scope.$index % 6 === 0 ? '' : 'color: red'">{{
                    computedTotal(scope.row.num)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="percent" label="转化率">
                <template #default="scope">
                  <span>{{ computedPercent(scope.$index, scope.row) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto;">
            <el-pagination
              class="table-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              :hide-on-single-page="hideOnSinglePage"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { sexOptions, rpDtypeOptions } from "@/assets/js/dropdown.js";
export default {
  data() {
    return {
      sexOptions: sexOptions,
      dtypeOptions: rpDtypeOptions,
      searchForm: {
        date: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(),
        ],
        department: "0",
        group: "0",
        staff: "0",
        dtype: "0",
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
      dateList: [1, 2, 3, 4, 5, 6, 7],
      tData: [
        {
          department: "招聘1部",
          group: "一组",
          name: "赵三",
          dtype: "1",
          num: [25, 45, 35, 26, 57, 58, 65],
        },
        {
          department: "招聘1部",
          group: "一组",
          name: "赵三",
          dtype: "2",
          num: [24, 43, 33, 24, 55, 52, 64],
        },
        {
          department: "招聘1部",
          group: "一组",
          name: "赵三",
          dtype: "3",
          num: [23, 42, 32, 23, 55, 53, 62],
        },
        {
          department: "招聘1部",
          group: "一组",
          name: "赵三",
          dtype: "4",
          num: [22, 40, 31, 22, 53, 51, 61],
        },
        {
          department: "招聘1部",
          group: "一组",
          name: "赵三",
          dtype: "5",
          num: [21, 40, 30, 21, 52, 51, 60],
        },
        {
          department: "招聘1部",
          group: "一组",
          name: "赵三",
          dtype: "6",
          num: [4, 5, 3, 6, 5, 5, 6],
        },
        {
          department: "招聘2部",
          group: "一组",
          name: "李四",
          dtype: "1",
          num: [24, 45, 35, 26, 57, 57, 65],
        },
        {
          department: "招聘2部",
          group: "一组",
          name: "李四",
          dtype: "2",
          num: [23, 43, 33, 24, 55, 52, 64],
        },
        {
          department: "招聘2部",
          group: "一组",
          name: "李四",
          dtype: "3",
          num: [23, 42, 32, 23, 55, 53, 62],
        },
        {
          department: "招聘2部",
          group: "一组",
          name: "李四",
          dtype: "4",
          num: [22, 40, 31, 22, 53, 51, 61],
        },
        {
          department: "招聘2部",
          group: "一组",
          name: "李四",
          dtype: "5",
          num: [21, 40, 30, 21, 52, 51, 60],
        },
        {
          department: "招聘2部",
          group: "一组",
          name: "李四",
          dtype: "6",
          num: [4, 5, 3, 6, 5, 5, 6],
        },
        {
          department: "招聘2部",
          group: "二组",
          name: "王五",
          dtype: "1",
          num: [28, 45, 35, 26, 57, 67, 65],
        },
        {
          department: "招聘2部",
          group: "二组",
          name: "王五",
          dtype: "2",
          num: [24, 43, 33, 24, 55, 56, 64],
        },
        {
          department: "招聘2部",
          group: "二组",
          name: "王五",
          dtype: "3",
          num: [23, 42, 32, 23, 55, 53, 62],
        },
        {
          department: "招聘2部",
          group: "二组",
          name: "王五",
          dtype: "4",
          num: [22, 40, 31, 22, 53, 51, 61],
        },
        {
          department: "招聘2部",
          group: "二组",
          name: "王五",
          dtype: "5",
          num: [21, 40, 30, 21, 52, 51, 60],
        },
        {
          department: "招聘2部",
          group: "二组",
          name: "王五",
          dtype: "6",
          num: [4, 5, 3, 6, 5, 5, 6],
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
    };
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
    getTypeName(type) {
      let item = this.dtypeOptions.find((item) => item.value == type);
      return item.label;
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }

      if (columnIndex > 1) {
        if (parseInt(rowIndex / 6) % 2 !== 0) {
          return "background-color: #FFF7E4";
        } else {
          return "background-color: #EFFDFF";
        }
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sortChange(data) {
      console.log(data);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 3) {
        if (rowIndex % 6 === 0) {
          return {
            rowspan: 6,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    computedTotal(arr) {
      let total = 0;
      if (!arr.every((value) => isNaN(value))) {
        total = arr.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + value;
          } else {
            return prev;
          }
        }, 0);
      } else {
        total = "N/A";
      }

      return total;
    },
    computedPercent(index, data) {
      if (index % 6 === 0 || (index + 1) % 6 === 0) {
        return "-";
      } else {
        let numerator = this.computedTotal(data.num);
        let denominator = this.computedTotal(this.tData[index - 1].num);

        return ((numerator / denominator) * 100).toFixed(2) + "%";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rpcenter {
  height: 100%;

  .el-container {
    height: 100%;
  }

  .table-box {
    padding-top: 0;
    padding-bottom: 0;

    .el-container,
    .el-header,
    .el-main,
    .el-footer {
      padding: 0;
    }

    .table-pagination {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>