<template>
  <div id="finance-refund" class="finance-refund">
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
          <el-form-item label="项目" prop="project">
            <el-select
              v-model="searchForm.project"
              placeholder="请选择"
              style="width: 140px"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option
                v-for="item in projectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工姓名" prop="name">
            <el-input
              placeholder="请输入姓名"
              v-model="searchForm.name"
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
          <el-table-column prop="name" width="100" label="姓名" align="center">
          </el-table-column>
          <el-table-column
            prop="entry_date"
            label="入职时间"
            width="110"
            sortable
            align="center"
          >
            <template #default="scope">
              <span>{{
                $moment(scope.row.entry_date).format("YYYY-MM-DD")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="leave_date"
            label="离职时间"
            width="110"
            sortable
            align="center"
          >
            <template #default="scope">
              <span>{{
                scope.row.leave_date
                  ? $moment(scope.row.leave_date).format("YYYY-MM-DD")
                  : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="idcard"
            width="125"
            label="身份证号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="在职/离职"
            align="center"
            width="100"
          >
            <template #default="scope">
              <span>{{ scope.row.status == 1 ? "在职" : "离职" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="subject"
            label="费用科目"
            align="center"
            width="120"
          >
            <template #default="scope">
              <span>{{ scope.row.subject || "" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="channel"
            label="所属渠道"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="project"
            label="输送项目"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="standard"
            label="费用标准"
            align="center"
            width="100"
          >
            <template #default="scope">
              <span>{{ scope.row.standard }}/h</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hours"
            label="工时"
            sortable
            align="center"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="费用金额"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="note" label="备注" align="center">
            <template #default="scope">
              <span>{{ scope.row.note || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entry_date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.entry_date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离职时间" prop="leave_date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.leave_date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input
            v-model="form.idcard"
            placeholder="请输入身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="在职/离职" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用科目" prop="subject">
          <el-input
            v-model="form.other"
            placeholder="请输入费用科目"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属渠道" prop="channel">
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
        <el-form-item label="输送项目" prop="project">
          <el-select v-model="form.project" placeholder="请选择">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用标准" prop="standard">
          <el-input
            v-model="form.standard"
            placeholder="请输入费用标准"
          ></el-input>
        </el-form-item>
        <el-form-item label="工时" prop="hours">
          <el-input v-model="form.hours" placeholder="请输入工时"></el-input>
        </el-form-item>
        <el-form-item label="费用金额" prop="amount">
          <el-input
            v-model="form.amount"
            placeholder="请输入费用金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="50"
            show-word-limit
            v-model="form.note"
            placeholder="请输入备注"
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
      name: "张三封",
      entry_date: 1615291166182,
      leave_date: "",
      idcard: "440825197405051956",
      status: "1",
      subject: "凡谷综合",
      channel: "中京",
      project: "中京",
      standard: 3,
      hours: 68,
      amount: 204,
      note: "",
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
      searchForm: {
        date: [new Date(), new Date()],
        project: "0",
        name: "",
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
        name: [{ required: true, message: "姓名不能为空" }],
        entry_date: [{ required: true, message: "入职时间不能为空" }],
        channel: [{ required: true, message: "所属渠道不能为空" }],
        project: [
          {
            required: true,
            message: "输送项目不能为空",
          },
        ],
        idcard: [
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式不对",
          },
        ],
        status: [{ required: true, message: "状态不能为空" }],
        standard: [
          { required: true, message: "费用标准不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        hours: [
          {
            required: true,
            message: "工时不能为空",
          },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1})?$/,
            message: "必须为数字，最多1位小数",
          },
        ],
        amount: [
          { required: true, message: "金额不能为空" },
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
        if (["amount"].findIndex((item) => item === prop) > -1) {
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
      info.entry_date = this.$moment(info.entry_date).format("YYYY-MM-DD");
      info.leave_date = info.leave_date
        ? this.$moment(info.leave_date).format("YYYY-MM-DD")
        : "";
      this.form = info;
      this.dialogTitle = "修改项目返费";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.dialogTitle = "增加项目返费";
      this.dialogVisible = true;
    },
    handleImport() {},
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
    updatePic(files) {
      console.log(files);
      this.form.pic = files;
    },
    closed(formName) {
      this.form = {};
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style lang="scss" scoped>
.finance-refund {
  height: 100%;

  .el-container {
    height: 100%;
  }
  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }
  .table-img {
    width: 100px;

    & + .table-img {
      margin-left: 4px;
    }
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