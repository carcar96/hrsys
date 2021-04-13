<template>
  <div id="finance-income" class="finance-income">
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
              type="daterange"
              :clearable="false"
              style="width: 240px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="在职企业" prop="company">
            <el-input
              placeholder="请输入企业名称"
              v-model="searchForm.company"
            ></el-input>
          </el-form-item>
          <el-form-item label="人员归属" prop="ownership">
            <el-input
              placeholder="请输入名称"
              v-model="searchForm.ownership"
            ></el-input>
          </el-form-item>
          <el-form-item label="对接盟友" prop="ally">
            <el-input
              placeholder="请输入盟友名称"
              v-model="searchForm.ally"
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
          :data="tableData"
          style="width: 100%"
          height="100%"
          border
          size="medium"
          :header-cell-style="{ backgroundColor: '#F3F3F3' }"
          :cell-style="setCellColor"
          @sort-change="sortChange"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="序号" type="index" width="54" align="center">
          </el-table-column>
          <el-table-column prop="company" label="在职企业" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150" align="center">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系方式"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="entry_date"
            label="入职日期"
            sortable
            align="center"
            width="150"
          >
            <template #default="scope">
              <span>{{
                $moment(scope.row.entry_date).format("YYYY/MM/DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="leave_date"
            label="离职日期"
            sortable
            align="center"
            width="150"
          >
            <template #default="scope">
              <span>{{
                scope.row.leave_date
                  ? $moment(scope.row.leave_date).format("YYYY/MM/DD")
                  : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ownership"
            label="人员归属"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="ally"
            label="对接盟友"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="refund"
            label="返费金额"
            sortable
            align="center"
            width="150"
          >
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
        size="medium"
        class="form"
      >
        <el-form-item label="在职企业" prop="company">
          <el-select v-model="form.company" placeholder="请选择">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input
            v-model="form.contact"
            placeholder="请输入手机号"
          ></el-input>
          <el-button
            type="primary"
            @click="handleSearch"
            style="margin-left: 10px"
            >搜索</el-button
          >
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="入职日期" prop="entry_date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.entry_date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离职日期" prop="leave_date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.leave_date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="人员归属" prop="ownership">
          <el-select v-model="form.ownership" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对接盟友" prop="ally">
          <el-select v-model="form.ally" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="返费金额" prop="refund">
          <el-input
            v-model="form.refund"
            placeholder="请输入返费金额"
          ></el-input>
        </el-form-item>
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
    const item = {
      company: "中京",
      name: "徐冲",
      contact: "18022429894",
      entry_date: 1615291166182,
      leave_date: "",
      ownership: "刘章豪",
      ally: "汇睿",
      refund: "500",
      update_date: 1618298166182,
    };
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
      tableData: Array(20).fill(item),
      searchForm: {
        date: [
          new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
          new Date(),
        ],
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
      currentPage: 4,
      hideOnSinglePage: false,
      dialogVisible: false,
      dialogTitle: "",
      form: {},
      rules: {
        company: [
          {
            required: true,
            message: "在职企业不能为空",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
          },
        ],
        contact: [
          { required: true, message: "联系方式不能为空" },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: "手机号格式不对",
          },
        ],
        entry_date: [{ required: true, message: "入职日期不能为空" }],
        refund: [
          { required: true, message: "返费金额不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        let prop = column.property;
        if (["refund"].findIndex((item) => item === prop) > -1) {
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
      let info = JSON.parse(JSON.stringify(row));
      info.date = this.$moment(info.date).format("YYYY-MM-DD");
      this.form = info;
      this.dialogTitle = "修改收入";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.dialogTitle = "增加收入";
      this.dialogVisible = true;
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
    handleSearch() {
      console.log("手机号搜索自动填充数据");
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
.finance-income {
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