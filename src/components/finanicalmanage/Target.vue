<template>
  <div id="finance-target" class="finance-target">
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
              type="datetimerange"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="员工姓名" prop="staff">
            <el-input
              placeholder="请输入名称"
              v-model="searchForm.staff"
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
            <!-- <el-button type="danger" @click="handleImport">导入</el-button> -->
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
        >
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80" align="center">
          </el-table-column>
          <el-table-column prop="rolename" label="角色名称" align="center">
          </el-table-column>
          <el-table-column
            prop="levelname"
            label="职级"
            width="70"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="department"
            label="所属部门"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="groupname"
            label="所属分组"
            width="90"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="month"
            :label="item + '月目标'"
            width="80"
            align="center"
            v-for="(item, index) in 12"
            :key="index"
          >
            <template #default="scope">
              <span
                >{{ scope.row.targets[index].finish }}/{{
                  scope.row.targets[index].total
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130" align="center">
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
      width="700px"
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
        <el-form-item label="员工姓名" prop="name">
          <el-autocomplete
            v-model="form.name"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelectName"
            style="width: 220px"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="考核目标" prop="target_type">
          <el-select v-model="form.target_type" placeholder="请选择">
            <el-option
              v-for="item in targetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核年份" prop="year">
          <el-date-picker v-model="form.year" type="year" placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-divider v-show="form.year"></el-divider>
        <div class="months">
          <el-form-item
            class="item"
            v-show="form.year"
            :label="index + 1 + '月目标'"
            :prop="'targets.' + index + '.total'"
            :rules="[
              {
                required: true,
                message: '不能为空',
              },
              {
                pattern: /(^[1-9]([0-9]+)?$)|(^(0){1}$)/,
                message: '必须为非负整数',
              },
            ]"
            v-for="(item, index) in form.targets"
            :key="index"
          >
            <el-input v-model="item.total" placeholder="请输入"></el-input>
          </el-form-item>
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
    const item = {
      name: "徐冲冲",
      rolename: "招聘1部组长",
      levelname: "组长",
      department: "招聘1部",
      groupname: "1组",
      target_type: "1",
      year: "2020",
      targets: [
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
        { finish: 90, total: 100 },
      ],
    };
    return {
      targetOptions: [
        {
          value: "1",
          label: "意面",
        },
        {
          value: "2",
          label: "面到",
        },
        {
          value: "3",
          label: "面过",
        },
        {
          value: "4",
          label: "入职",
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
        staff: "",
      },
      searchRule: {
        date: [
          {
            type: "array",
            required: true,
            message: "请选择日期区间",
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
        name: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        target_type: [{ required: true, message: "请选择" }],
        year: [{ required: true, message: "请选择", trigger: "change" }],
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
      this.dialogTitle = "修改员工目标";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.dialogTitle = "配置员工目标";
      this.dialogVisible = true;
      this.form.targets = [
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
        { total: "" },
      ];
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
    querySearchAsync(queryString) {
      console.log(queryString);
      return [];
    },
    handleSelectName(item) {
      console.log(item);
    },
  },
};
</script>


<style lang="scss" scoped>
.finance-target {
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

    .months {
      display: flex;
      flex-wrap: wrap;

      .item:nth-child(2n) {
        margin-left: 20px;
      }
    }
  }
}
</style>