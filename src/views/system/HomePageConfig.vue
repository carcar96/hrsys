<template>
  <div id="home-config" class="home-config">
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
          <el-form-item label="展示时间" prop="showTime">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="searchForm.showTime"
              :clearable="false"
              style="width: 140px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="面试时间" prop="interviewTime">
            <el-date-picker
              v-model="searchForm.interviewTime"
              type="daterange"
              :clearable="false"
              style="width: 240px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="企业名称" prop="company">
            <el-input
              placeholder="请输入企业名称"
              v-model="searchForm.company"
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
          :header-cell-style="{ backgroundColor: '#F7F7F7' }"
          :cell-style="setCellColor"
          @sort-change="sortChange"
        >
          <el-table-column
            label="序号"
            type="index"
            width="54"
            align="center"
          ></el-table-column>
          <el-table-column label="排序" prop="weight" width="50" align="center">
          </el-table-column>
          <el-table-column
            prop="show_date"
            label="展示时间"
            width="120"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="company"
            label="企业名称"
            width="200"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="require"
            label="招聘要求及薪资结构"
            width="300"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="130"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="interview"
            label="是否面试"
            width="120"
            sortable
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="interview_date"
            label="面试时间"
            width="120"
            sortable
            align="center"
          >
            <template #default="scope">
              {{ scope.row.interview_date }}
              {{
                $moment(scope.row.interview_datetime[0]).format("HH:mm") +
                " - " +
                $moment(scope.row.interview_datetime[1]).format("HH:mm")
              }}
            </template>
          </el-table-column>
          <el-table-column prop="note" label="备注" sortable align="center">
          </el-table-column>
          <el-table-column
            prop="is_show"
            width="100"
            label="展示"
            align="center"
          >
            <template #default="scope">
              <el-switch v-model="scope.row.is_show" active-color="#13ce66">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="scope">
              <el-space spacer="/">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  type="text"
                  >编辑</el-button
                >
                <el-button
                  @click="handleDelete(scope.$index, scope.row)"
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
        label-width="100px"
        size="small"
        class="form"
      >
        <el-form-item label="企业名称" prop="company">
          <el-input
            v-model="form.company"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="展示时间" prop="show_date">
          <el-date-picker
            type="date"
            placeholder="请选择展示日期"
            v-model="form.show_date"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="排序权重" prop="weight">
          <el-input
            v-model="form.weight"
            placeholder="请输入排序权重"
          ></el-input>
        </el-form-item>
        <el-form-item label="招聘要求及薪资结构" prop="require">
          <el-input
            type="textarea"
            :rows="5"
            v-model="form.require"
            placeholder="请输入招聘要求及薪资结构"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="form.age"
            placeholder="请输入年龄"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="是否面试" prop="interview">
          <el-input
            v-model="form.interview"
            placeholder="请输入是否面试"
          ></el-input>
        </el-form-item>
        <el-form-item label="面试日期" prop="interview_date">
          <el-date-picker
            type="date"
            placeholder="请选择面试日期"
            v-model="form.interview_date"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="面试时间段" prop="interview_datetime">
          <el-time-picker
            is-range
            format="HH:mm"
            :editable="false"
            v-model="form.interview_datetime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width: 222px"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input
            type="textarea"
            :rows="3"
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
      is_show: true,
      weight: 9,
      show_date: "2016-05-03",
      name: "华为",
      company: "华为股份有限公司",
      interview: "待定",
      require:
        "底薪2000元+夜班津贴20元/夜班(越520元/月)+月度绩效0-400元/月+认证津贴0-400元/月+加班费1700-2500元/月；主要负责全自动化机台的操作，具备一定的英文基础，无色盲色弱，能适应无尘室车间环境及倒班。吃饭餐补550元/月，体检免费住宿4-6人间空调热水器齐全",
      age: "男女1:1，18-40",
      interview_date: "2016-06-03",
      interview_datetime: [1618238862606, 1618242462606],
      note:
        "提醒求职者带上行李，笔，身份证原件及复印件四件面试地点：华星光电短信备注：大众行",
    };
    return {
      tableData: Array(20).fill(item),
      searchForm: {
        showTime: new Date(),
        interviewTime: [
          new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
          new Date(),
        ],
        company: "",
      },
      searchRule: {
        showTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        interviewTime: [
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
      form: {
        show_date: new Date(),
        interview_date: new Date(new Date().getTime() + 3600 * 1000 * 24),
        interview_datetime: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDay(),
            9,
            0
          ),
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDay(),
            10,
            0
          ),
        ],
      },
      rules: {
        company: [
          { required: true, message: "企业名称不能为空", trigger: "blur" },
        ],
        show_date: [
          {
            type: "date",
            required: true,
            message: "请选择展示时间",
            trigger: "change",
          },
        ],
        weight: [
          {
            pattern: /^\+?[1-9][0-9]*$/,
            message: "必须为数字",
            trigger: "blur",
          },
        ],
        require: [
          {
            required: true,
            message: "招聘要求及薪资结构不能为空",
            trigger: "blur",
          },
        ],
        interview_date: [
          {
            type: "date",
            required: true,
            message: "请选择面试日期",
            trigger: "change",
          },
        ],
        interview_datetime: [
          {
            type: "array",
            required: true,
            message: "请选择面试时间段",
            trigger: "change",
            fields: {
              0: { type: "date", required: true, message: "请选择开始时间" },
              1: { type: "date", required: true, message: "请选择结束时间" },
            },
          },
        ],
      },
      dialogVisible: false,
      dialogTitle: "",
    };
  },
  methods: {
    submitSearchForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.searchForm);
          console.log(
            this.$moment(this.searchForm.showTime).format("YYYY-MM-DD"),
            this.$moment(this.searchForm.interviewTime[0]).format("YYYY-MM-DD"),
            this.$moment(this.searchForm.interviewTime[1]).format("YYYY-MM-DD")
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
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "企业增加";
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确认删除该企业？", "提示", {
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
    handleEdit(index, row) {
      console.log(index, row);
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      this.dialogTitle = "企业修改";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.form);
          console.log(
            this.$moment(this.form.show_date).format("YYYY-MM-DD"),
            this.$moment(this.form.interview_datetime[0]).format("HH-mm"),
            this.$moment(this.form.interview_datetime[1]).format("HH:mm")
          );
          this.$refs[formName].resetFields();
          // this.dialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    closed(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style lang="scss" scoped>
.home-config {
  height: 100%;

  .el-container {
    height: 100%;
  }

  .el-main {
    padding-top: 0;
    padding-bottom: 0;
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .form {
    padding: 0 20px;
    .el-input {
      width: 222px;
    }
    .el-textarea {
      width: 400px;
    }
  }
}
</style>