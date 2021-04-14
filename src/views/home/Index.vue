<template>
  <div id="home" class="home">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          ref="searchForm"
        >
          <el-form-item label="展示时间" prop="showTime">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="searchForm.showTime"
              :clearable="false"
              size="medium"
              style="width: 140px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="面试时间" prop="interviewTime">
            <el-date-picker
              v-model="searchForm.interviewTime"
              type="daterange"
              size="medium"
              :clearable="false"
              style="width: 240px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="企业名称" prop="company">
            <el-input
              size="medium"
              placeholder="请输入企业名称"
              v-model="searchForm.company"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              @click="submitForm('searchForm')"
              >搜索</el-button
            >
            <el-button
              type="warning"
              size="medium"
              @click="resetForm('searchForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="table-box">
        <el-container>
          <el-header height="auto;"
            ><h1 class="table-title">2020年12月17日面试企业</h1></el-header
          >
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
              <el-table-column
                label="序号"
                type="index"
                width="54"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="企业名称"
                width="150"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="require"
                label="招聘要求及薪资结构"
                width="400"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                width="150"
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
                prop="date"
                label="面试时间"
                width="200"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <router-link
                    :to="{
                      name: 'EntDetail',
                      params: scope.row,
                    }"
                    >查看企业详情</router-link
                  >
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
export default {
  data() {
    const item = {
      id: "1",
      date: "2016-05-03 09:00 - 10:00",
      name: "华为",
      company: "华为股份有限公司",
      interview: "待定",
      require:
        "底薪2000元+夜班津贴20元/夜班(越520元/月)+月度绩效0-400元/月+认证津贴0-400元/月+加班费1700-2500元/月；主要负责全自动化机台的操作，具备一定的英文基础，无色盲色弱，能适应无尘室车间环境及倒班。吃饭餐补550元/月，体检免费住宿4-6人间空调热水器齐全",
      age: "男女1:1，18-40",
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
    };
  },
  methods: {
    submitForm(formName) {
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
    handleClick(row) {
      console.log(row);
      let bcList = this.$store.state.bcList;
      bcList[1] = row.company;
      this.$store.commit("updateStateByKey", { key: "bcList", value: bcList });
      this.$router.push({ name: "EntDetail" }); // 跳转
    },
    sortChange(data) {
      console.log(data);
    },
  },
};
</script>


<style lang="scss" scoped>
.home,
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

  .table-title {
    font-size: 20px;
    text-align: center;
    line-height: 46px;
    background-color: #f7f7f7;
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>