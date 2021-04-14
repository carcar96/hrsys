<template>
  <div id="report-list" class="report-list">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          ref="searchForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              size="medium"
              placeholder="请输入姓名"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="date">
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              size="medium"
              :clearable="false"
              style="width: 240px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
            <el-button type="success" size="medium" @click="handleAddReport"
              >写汇报</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="table-box">
        <el-container>
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
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="提交时间"
                width="120"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="100"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="finish"
                label="今天完成工作"
                width="300"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="unfinish"
                label="未完成工作"
                width="200"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="wx_count"
                label="添加微信数量"
                width="150"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="wx_pic"
                label="添加微信截图"
                width="250"
                sortable
                align="center"
              >
                <template #default="scope">
                  <div v-if="scope.row.wx_pic.length">
                    <el-image
                      class="table-img"
                      :preview-src-list="scope.row.wx_pic"
                      v-for="(item, index) in scope.row.wx_pic"
                      :src="item.url"
                      :key="index"
                    >
                    </el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="120"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeStatus(scope.row.status) }}
                </template>
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
              </el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template #default="scope">
                  <el-button @click="handleEdit(scope.row)" type="text"
                    >查看</el-button
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
    <ReportDialog
      :isShow="showReportDialog"
      :formData="dialogFormData"
      @submit="addReport"
      @save="saveReport"
      @closed="closeReportDialog"
    />
  </div>
</template>

<script>
import ReportDialog from "@/components/dialog/Report.vue";
export default {
  components: {
    ReportDialog,
  },
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "2016-05-03",
          name: "吴宣仪",
          finish: "今天新增意向50个，成功面试30个",
          unfinish: "未完成新增意向要求",
          wx_count: "24",
          status: "1",
          wx_pic: [
            {
              name: "food.jpg",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
          ],
          note: "需要主管协助，和厂方沟通人员入职情况",
        },
        {
          id: "2",
          date: "2016-05-03",
          name: "吴宣仪",
          finish: "今天新增意向50个，成功面试30个",
          unfinish: "未完成新增意向要求",
          wx_count: "14",
          status: "2",
          wx_pic: [
            {
              name: "food.jpg",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
            {
              name: "food.jpg",
              url:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
          ],
          note: "需要主管协助，和厂方沟通人员入职情况",
        },
      ],
      searchForm: {
        name: "",
        date: [
          new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
          new Date(),
        ],
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
      showReportDialog: false,
      dialogFormData: {},
    };
  },
  methods: {
    computeStatus(status) {
      let statusText = "";
      if (status == 1) {
        statusText = "保存草稿";
      } else if (status == 2) {
        statusText = "已发送";
      }

      return statusText;
    },
    submitForm(formName) {
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
    handleAddReport() {
      this.dialogFormData.status = 1; // 默认草稿
      this.showReportDialog = true;
    },
    handleEdit(row) {
      this.dialogFormData = JSON.parse(JSON.stringify(row));
      this.showReportDialog = true;
    },
    addReport(data) {
      console.log("add", data);
    },
    saveReport(data) {
      console.log("save", data);
    },
    closeReportDialog() {
      this.dialogFormData = {};
      this.showReportDialog = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.report-list,
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
}
</style>