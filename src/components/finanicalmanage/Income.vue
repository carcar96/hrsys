<template>
  <div id="finance-check" class="finance-check">
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
          <el-form-item label="收入项目" prop="project">
            <el-input
              placeholder="请输入项目名称"
              v-model="searchForm.project"
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
          <el-table-column
            prop="date"
            label="时间"
            sortable
            width="95"
            align="center"
          >
            <template #default="scope">
              <span>{{ $moment(scope.row.date).format("YYYY.MM.DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="project" label="收入项目" align="center">
          </el-table-column>
          <el-table-column prop="channel" label="对接渠道" align="center">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="营业额"
            width="100"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="wage"
            width="95"
            label="工资"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="refund"
            label="渠道返费"
            sortable
            width="105"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="added_tax"
            label="增值税"
            width="90"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="other_tax"
            label="其他税"
            width="90"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="commercial_insurance"
            label="商业险"
            width="90"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="social_security"
            label="社保"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remain_amount"
            label="剩余金额"
            sortable
            width="105"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位/数目"
            width="105"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="situation" label="到账情况" align="center">
          </el-table-column>
          <el-table-column prop="note" label="备注" align="center">
            <template #default="scope">
              {{ scope.row.note || "-" }}
            </template>
          </el-table-column>
          <el-table-column prop="other" label="其他" align="center">
          </el-table-column>
          <el-table-column
            prop="update_date"
            label="编辑时间"
            sortable
            width="105"
            align="center"
          >
            <template #default="scope">
              <span>{{
                $moment(scope.row.update_date).format("YYYY.MM.DD")
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
        <el-form-item label="收入项目" prop="project">
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
        <el-form-item label="对接渠道" prop="channel">
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
        <el-form-item label="营业额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入营业额"></el-input>
        </el-form-item>
        <el-form-item label="支出工资" prop="wage">
          <el-input v-model="form.wage" placeholder="请输入支出工资"></el-input>
        </el-form-item>
        <el-form-item label="渠道返费" prop="refund">
          <el-input
            v-model="form.refund"
            placeholder="请输入渠道返费"
          ></el-input>
        </el-form-item>
        <el-form-item label="增值税" prop="added_tax">
          <el-input
            v-model="form.added_tax"
            placeholder="请输入增值税"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他税" prop="added_tax">
          <el-input
            v-model="form.other_tax"
            placeholder="请输入其他税"
          ></el-input>
        </el-form-item>
        <el-form-item label="商业险" prop="commercial_insurance">
          <el-input
            v-model="form.commercial_insurance"
            placeholder="请输入商业险"
          ></el-input>
        </el-form-item>
        <el-form-item label="社保金额" prop="commercial_insurance">
          <el-input
            v-model="form.social_security"
            placeholder="请输入社保金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="剩余金额" prop="remain_amount">
          <el-input
            v-model="form.remain_amount"
            placeholder="请输入剩余金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="单位/数目" prop="unit">
          <el-input
            v-model="form.unit"
            placeholder="请输入单位/数目"
          ></el-input>
        </el-form-item>
        <el-form-item label="到账情况" prop="situation">
          <el-input
            v-model="form.situation"
            placeholder="请输入到账情况"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="other">
          <el-input v-model="form.other" placeholder="请输入其他"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注"></el-input>
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
      date: 1615291166182,
      project: "凡谷综合",
      channel: "中京",
      amount: "217950.54",
      wage: "163563",
      refund: "20527.47",
      added_tax: "13077",
      other_tax: "0",
      commercial_insurance: "1200",
      social_security: "0",
      remain_amount: "20783.07",
      unit: "0",
      situation: "实到",
      note: "",
      other: "到中京",
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
        project: "",
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
        date: [{ required: true, message: "时间不能为空" }],
        project: [
          {
            required: true,
            message: "收入项目不能为空",
          },
        ],
        channel: [
          {
            required: true,
            message: "对接渠道不能为空",
          },
        ],
        amount: [
          { required: true, message: "营业额不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        wage: [
          { required: true, message: "支出工资不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        refund: [
          { required: true, message: "渠道返费不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        added_tax: [
          { required: true, message: "增值税不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        other_tax: [
          { required: true, message: "其他税不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        commercial_insurance: [
          { required: true, message: "商业险不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        social_security: [
          { required: true, message: "社保金额不能为空" },
          {
            pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        remain_amount: [
          { required: true, message: "剩余金额不能为空" },
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
        if (
          [
            "amount",
            "wage",
            "refund",
            "added_tax",
            "other_tax",
            "commercial_insurance",
            "social_security",
            "remain_amount",
          ].findIndex((item) => item === prop) > -1
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
    closed(formName) {
      this.form = {};
      this.$refs[formName].resetFields();
    },
    handleImport() {},
  },
};
</script>


<style lang="scss" scoped>
.finance-check {
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