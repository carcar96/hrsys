<template>
  <div id="finance-channel" class="finance-channel">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          size="medium"
          ref="searchForm"
        >
          <el-form-item label="时间" prop="date">
            <el-date-picker
              v-model="searchForm.date"
              type="monthrange"
              :clearable="false"
              style="width: 240px"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :shortcuts="shortcuts"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="企业名称" prop="company">
            <el-input
              placeholder="请输入企业名称"
              v-model="searchForm.company"
            ></el-input>
          </el-form-item>
          <el-form-item label="渠道名称" prop="channel">
            <el-input
              placeholder="请输入渠道名称"
              v-model="searchForm.channel"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSearchForm('searchForm')"
              >搜索</el-button
            >
            <el-button type="warning" @click="resetForm('searchForm')"
              >重置</el-button
            >
            <el-button type="success" @click="handleAdd">增加</el-button>
            <el-button type="danger" @click="handleImport">导入</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table
          height="100%"
          size="medium"
          border
          show-summary
          :data="channelList"
          :header-cell-style="{ backgroundColor: '#F7F7F7' }"
          :cell-style="setCellColor"
          @sort-change="sortChange"
          :summary-method="channelSummaries"
        >
          <el-table-column
            prop="channel"
            label="渠道名称/企业名称"
            align="center"
            width="150"
          >
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
              <span>{{ scope.row.company[item.id] || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ctotal" label="合计" sortable align="center">
            <template #default="scope">
              <span>{{ computedCompany(scope.row.company).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="update_date"
            label="编辑时间"
            sortable
            align="center"
            width="150"
          >
            <template #default="scope">
              <span>{{
                $moment(scope.row.update_date).format("YYYY-MM-DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="scope">
              <el-space spacer="/">
                <el-button
                  @click="handleEdit(scope.row, scope.$index)"
                  type="text"
                  >编辑</el-button
                >
                <el-button
                  @click="handleDelete(scope.row, scope.$index)"
                  type="text"
                  >删除</el-button
                >
              </el-space>
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
    <!-- 模态框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      @closed="closed('form')"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="auto"
        size="small"
        class="form"
      >
        <el-form-item label="时间" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="渠道名称" prop="channel">
          <el-select v-model="form.channel" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 遍历 -->
        <div
          class="company-inner"
          v-for="(item, index) in form.list"
          :key="index"
        >
          <el-form-item
            label="对接企业"
            :prop="'list.' + index + '.company'"
            :rules="{
              required: true,
              message: '对接企业不能为空',
            }"
          >
            <el-select v-model="item.company" placeholder="请选择">
              <el-option
                v-for="item in projectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button
              style="margin-left: 10px"
              type="danger"
              @click="delCompany(index)"
              v-show="index < form.list.length - 1"
              >删除</el-button
            >
          </el-form-item>
          <el-form-item
            label="渠道费用"
            :prop="'list.' + index + '.amount'"
            :rules="[
              {
                required: true,
                message: '渠道费用不能为空',
              },
              {
                pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                message: '请输入金额，最多 2 位小数',
              },
            ]"
          >
            <el-input
              v-model="item.amount"
              placeholder="请输入渠道费用"
            ></el-input>
            <el-button
              style="margin-left: 10px"
              type="primary"
              @click="addCompany"
              v-show="form.list.length - 1 == index"
              >增加对接企业</el-button
            >
          </el-form-item>
          <el-divider v-show="form.list.length - 1 != index"></el-divider>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      channelOptions: [
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
        date: [new Date(), new Date()],
        company: "",
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
          text: "本月",
          value: [new Date(), new Date()],
        },
        {
          text: "今年至今",
          value: (() => {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            return [start, end];
          })(),
        },
        {
          text: "最近六个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
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
          date: 1618309268028,
          channel: "张三",
          company: {
            1: 2111,
            2: 212.3,
            3: 231.33,
            4: 414.9,
            5: 251,
            6: 0,
            7: 351,
            8: 531.2,
          },
          update_date: 1618309268028,
        },
        {
          date: 1618309268028,
          channel: "宏德",
          company: {
            1: 213,
            2: 0,
            3: 2134,
            4: 2144,
            5: 2154,
            6: 2454,
            7: 2124.8,
            8: 2254,
          },
          update_date: 1618309268028,
        },
        {
          date: 1615309268028,
          channel: "佳信",
          company: {
            1: 3223,
            2: 3221,
            3: 0,
            4: 3245,
            5: 1255.2,
            6: 3435,
            7: 3225.6,
            8: 0,
          },
          update_date: 1615309268028,
        },
        {
          date: 1618009268028,
          channel: "李四",
          company: {
            1: 1123,
            2: 0,
            3: 2235.32,
            4: 2246.52,
            5: 2265.12,
            6: 2236.72,
            7: 2275.42,
            8: 0,
          },
          update_date: 1618009268028,
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
      dialogVisible: false,
      dialogTitle: "",
      form: {},
      rules: {
        date: [{ required: true, message: "时间不能为空" }],
        channel: [
          {
            required: true,
            message: "渠道名称不能为空",
          },
        ],
      },
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
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
    computedCompany(company) {
      let values = [];
      for (let key in company) {
        values.push(Number(company[key]));
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
        let prop = column.property;
        if (prop === "update_date") {
          sums[index] = "";
          return;
        }

        if (prop === "company") {
          console.log(prop);
          const values = data.map((item) =>
            Number(item[column.property][column.columnKey])
          );

          let total = 0;
          if (!values.every((value) => isNaN(value))) {
            total = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + value;
              } else {
                return prev;
              }
            }, 0);
            total = total.toFixed(2);
          } else {
            total = "N/A";
          }

          sums[index] = total;
        } else if (column.property === "ctotal") {
          const values = data.map((item) => this.computedCompany(item.company));
          let total = 0;
          if (!values.every((value) => isNaN(value))) {
            total = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + value;
              } else {
                return prev;
              }
            }, 0);
            total = total.toFixed(2);
          } else {
            total = "N/A";
          }

          sums[index] = total;
        }
      });
      return sums;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(row, index) {
      console.log(index, row);
      let list = [];
      for (let key in row.company) {
        list.push({
          company: key,
          amount: row.company[key],
        });
      }
      let editData = {
        date: this.$moment(row.date).format("YYYY-MM"),
        channel: row.channel,
        list: list,
      };

      this.form = editData;
      this.dialogTitle = "修改渠道费用";
      this.dialogVisible = true;
    },
    handleAdd() {
      let editData = {
        date: new Date(),
        list: [{ company: "", amount: "" }],
      };

      this.form = editData;
      this.dialogTitle = "增加渠道费用";
      this.dialogVisible = true;
    },
    addCompany() {
      this.form.list.push({
        company: "",
        amount: "",
      });
    },
    delCompany(index) {
      this.form.list.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.searchForm);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    closed(formName) {
      this.form = {};
      this.$refs[formName].resetFields();
    },
    handleImport() {},
  },
};
</script>


<style lang="scss" scoped>
.finance-channel {
  height: 100%;

  .el-container {
    height: 100%;
  }
  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .form {
    padding: 0 20px;
    .el-input,
    .el-select {
      width: 220px;
    }
  }
}
</style>